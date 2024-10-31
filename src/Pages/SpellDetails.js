import { useParams} from "react-router-dom";
import useFetch from "../Common/useFetch.js";

const BlogDetails = () => {
  const {id}  = useParams();

  const {data: spell, isPending, error} =useFetch("http://localhost:8000/spells/"+id);

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
            <p>Spell List { spell.spell_list.toString() }</p>
            <p>Spell Component { spell.components.toString() }</p>
            {spell.material_component&&<p>Material Component: { spell.material_component }</p>}
            {spell.greater_verbal_component&&<p>Greater Verbal Component: { spell.greater_verbal_component }</p>}
            <div>{ spell.description }</div>
            </article>
        )}
    </div>
  );
}
 
export default BlogDetails;