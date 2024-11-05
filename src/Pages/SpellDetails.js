import { useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import { ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import dynamo_client from '../Common/DynamoClient.js';
import formatElementFromDynamoDB from '../Common/CommonMethods.js';

const SpellDetails = () => {
  const {id}  = useParams();
  const [spell, setSpell] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{ 
     let query = "SELECT * FROM \"SpellList\" where id =" + id
          dynamo_client.send(new ExecuteStatementCommand({
          Statement: query
      })).then((response)=>{
          console.log(response)
          setSpell(formatElementFromDynamoDB(response.Items[0]))
          setIsPending(false)
          setError(null);
      }).catch((error)=>{
          console.log(error)
          console.log(error.message)
          setError(error.message)
          setIsPending(false)
      })
  },[id])  

  return (
    <div className="blog-details">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { spell && (
            <article>
              <h2>{ spell.name }</h2>
              <p>Level { spell.level }</p>
              <p>School { spell.school }</p>
              <p>Casting Time { spell.casting_time }</p>
              <p>Duration { spell.duration }</p>
              <p>Range { spell.range }</p>
              {spell.spell_list &&<p>Spell List { spell.spell_list.join(", ") }</p>}
              {spell.components &&<p>Spell Component { spell.components.join(", ") }</p>}
              {spell.material_component&&<p>Material Component: { spell.material_component }</p>}
              {spell.greater_verbal_component&&<p>Greater Verbal Component: { spell.greater_verbal_component }</p>}
              {spell.ritual && <p>Ritual: { spell.ritual.toString() }</p>}
              {spell.attack_save&&<p>Attack|Save: { spell.attack_save }</p>}
              <p> Description: </p>
              <div>{ spell.description }</div>
            </article>
        )}
    </div>
  );
}
 
export default SpellDetails;