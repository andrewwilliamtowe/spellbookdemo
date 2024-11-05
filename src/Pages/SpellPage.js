import { useEffect, useState} from 'react'; 
import SpellList from './SpellList.js';
import dynamo_client from '../Common/DynamoClient.js';
import { ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import formatElementFromDynamoDB from '../Common/CommonMethods.js';

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
   
    const formatDataFromDynamoDB = (data) => {
        return data.map((element) => {
            return formatElementFromDynamoDB(element);
        });
    };

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
        let query = "SELECT * FROM \"SpellList\""
        let paramaters = [];
        if(name!==''){
            paramaters.push(`name = '${name}'`);
        }
        if(level!=='All'){
            let level_num = Levels.find((x)=>x.name===level).number;
            paramaters.push(`level = ${level_num}`);
        }
        if(school!=='All'){
            paramaters.push(`school='${school}'`);
        }
        // if(spell_list!=='All'){
        //     paramaters.push(`spell_list contains('${spell_list}')`);
        // }
        if(attack_save!=='Either'){
            paramaters.push(`attack_save='${(attack_save.toLowerCase())}'`);
        }
        if(paramaters.length>0){
            query += " WHERE ";
            query += paramaters.join(" and ");
        }
        console.log(query)

        return query;
    }

     const Search = () => {
        dynamo_client.send(new ExecuteStatementCommand({
            Statement: createQuery()
        })).then((response)=>{
            console.log(response)
            setSpells(sortData(formatDataFromDynamoDB(response.Items)))
            setIsPending(false)
            setError(null);
        }).catch((error)=>{
            console.log(error)
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        })
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
            {/* <label>Spell List:</label>
            <select
                value={spell_list}
                onChange={(e)=>setSpellList(e.target.value)}
            >{
                Spell_List.map( (x) => 
                    <option key={x}>{x}</option> )
            }</select> */}
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