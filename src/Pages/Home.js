import { useState} from 'react'; 
import { ListTablesCommand, CreateTableCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import data from '../data/db.json'
import dynamo_client from '../Common/DynamoClient';

const Home = () => {

   
    const [user_message, setUserMessage] = useState(null);
    const [next_button, setNextButton] = useState(false);
    const createTables = () => {
       const command = new ListTablesCommand({});
       let table_list = [];
       let all_successful = true;
       dynamo_client.send(command).then((response) => {
            table_list = response.TableNames;
            if(table_list.length===0){
                setUserMessage("There are no tables")
            }else{
                setUserMessage("Found Tables:" + table_list.join(", "))
            }
            if(!table_list.includes("SpellList")){
                console.log("Creating SpellList Table")
                dynamo_client.send(createTable("SpellList")).then((response) => {
                    console.log("SpellList Table Created")
                    
                }).catch((error) => {
                    console.log(error)
                    all_successful = false;
                });
            }
            if(!table_list.includes("ClassList")){
                console.log("Creating ClassList Table")
                dynamo_client.send(createTable("ClassList")).then((response) => {
                    console.log("ClassList Table Created")
                }).catch((error) => {
                    console.log(error)
                    all_successful = false;
                });
            }
            setNextButton(all_successful);
        }).catch((error) => {
            setUserMessage(error.message);
        });
    }

    const putInData = () => {
        data.spells.forEach(element => {
            console.log("Element: " + JSON.stringify(element))
            let item= {
                id: {N: element.id+""},
                name: {S: element.name},
                level: {N: element.level+""},
                school: {S: element.school},
                description :{S: element.description},
                range: {S: element.range},
                duration: {S: element.duration},
                casting_time: {S: element.casting_time},
            }
            if(element.ritual){
                item.ritual= {S: element.ritual.toString()}
            }
            if(element.attack_save){
                item.attack_save= {S: element.attack_save}
            }
            if(element.material_component){
                item.material_component= {S: element.material_component}
            }
            if(element.spell_list){
                item.spell_list ={L: element.spell_list.map(spell_list => {return {S: spell_list}})};
            }
            if(element.components){
                item.components ={L: element.components.map(component => {return {S: component}})};
            }
            console.log("Item: "+JSON.stringify(item))
            dynamo_client.send(new PutItemCommand({
                TableName: "SpellList",
                Item:item,
                
            })).then((response)=>{
                console.log(response)
            
            }).catch((error) => {
                console.log(error)
                setUserMessage(error.message);
            })
        }); 
     }

    const createTable=(table_name)=>{
        return new CreateTableCommand({
            TableName: table_name,
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "N"
                }
            ],
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        })
    }
    return ( 
        <div className="home">
            <h1>Home</h1>
            <p>Welcome to the home page</p>
            {!next_button&&<button onClick={createTables} className="btn">Click me to Create Table</button>}
            {next_button&&<button onClick={putInData} className="btn">Click me to Put Data in</button>}
            {user_message && <p>{user_message}</p>}
        </div>
     );
}
 
export default Home;