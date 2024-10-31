import { useEffect, useState} from 'react'; 
import SpellList from './SpellList.js';
const SpellPage = () => {
    const Schools = ['All', 'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation']
    const Spell_List = ['All', 'Arcane', 'Divine', 'Primal', 'Psychic']
    const Attack_Save = ['Either', 'Attack', "Str", "Dex", "Con", "Wis", 'Int', "Cha"]
    const Levels = [{name:'All', number:-1},{name:'Cantrip', number:0}, {name:'1st', number:1}, {name:'2nd', number:2}, {name:'3rd', number:3}, {name:'4th', number:4}, {name:'5th', number:5}, {name:'6th', number:6}, {name:'7th', number:7}, {name:'8th', number:8}, {name:'9th', number:9}]

    const [spells, setSpells] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    ////////////////////

    const [name, setName] = useState('')
    const [level, setLevel] = useState('All')
    const [school, setSchool] = useState('All')
    const [spell_list, setSpellList] = useState('All')
    const [attack_save, setAttackSave] = useState('Either');
   
    const sortData = (data) => {
        return data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      };

      useEffect(() => {
        Search();
     },[name, level, school, spell_list, attack_save]);


     const createQuery=()=>{
        let base_line_query = "http://localhost:8000/spells";
        let query = base_line_query;
        let paramaters = [];
        if(name){
            paramaters.push(`name=${name}`);
        }
        if(level!=='All'){
            let level_num = Levels.find((x)=>x.name===level).number;
            paramaters.push(`level=${level_num}`);
        }
        if(school!=='All'){
            paramaters.push(`school=${school}`);
        }
        if(spell_list!=='All'){
            paramaters.push(`spell_list=${spell_list}`);
        }
        if(attack_save!=='Either'){
            paramaters.push(`attack_save=${attack_save}`);
        }
        if(paramaters.length>0){
            query += "?";
            query += paramaters.join("&");
        }
        console.log(query)

        return query;
     }

     const Search = () => {
        const abortCont = new AbortController();
        fetch(createQuery(), {signal: abortCont.signal})
        .then(response =>{
            if(!response.ok){
                throw Error("Could not fetch data")
            }
            return response.json();
        })
        .then(data =>{
            setSpells(sortData(data))
            setIsPending(false)
            setError(null);
        })
        .catch(err =>{
            if(err.name === "AbortError"){
                console.log("fetch aborted")
            }else{
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        })
        return ()=> abortCont.abort();
     }

    return ( 
        <div className="home">

            <label>Spell Name:</label>
            <input 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <label>Spell Level:</label>
            <select
                value={level}
                onChange={(e)=>setLevel(e.target.value)}
            >
                {
                Levels.map( (x) => 
                    <option key={x.number}>{x.name}</option> )
            }
            </select>
            <label>Spell School:</label>
            <select
                value={school}
                onChange={(e)=>setSchool(e.target.value)}
            >{
                Schools.map( (x) => 
                    <option key={x}>{x}</option> )
            }</select>
            <label>Spell List:</label>
            <select
                value={spell_list}
                onChange={(e)=>setSpellList(e.target.value)}
            >{
                Spell_List.map( (x) => 
                    <option key={x}>{x}</option> )
            }</select>
            <label>Attack|Save</label>
            <select
                value={attack_save}
                onChange={(e)=>setAttackSave(e.target.value)}
            >{
                Attack_Save.map( (x) => 
                    <option key={x}>{x}</option> )
            }</select>

            {error && <div>{error}</div>}
            {isPending&& <div> Loading ...</div>}
            {spells &&
            <div> 
                <SpellList spells={spells}/>
            </div>}
        </div> 
     );
}
 
export default SpellPage;