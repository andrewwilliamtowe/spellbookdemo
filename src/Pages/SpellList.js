import { Link } from "react-router-dom";
const SpellList = ({spells}) => {
    
    return ( 
        <div className="spell-list">
            {spells.map((spell) => (
                <div className="spell-preview" key={spell.id}  style={{ display: 'flex', flexDirection: 'row' }}>
                    <Link to={`/spells/${spell.id}`}>
                        <h2>{spell.name}</h2>
                    </Link>
                    <p>Level: {spell.level}</p>
                    <p>School: {spell.school}</p>
                </div>
            ))}
        </div>
     );
    }
 
export default SpellList;