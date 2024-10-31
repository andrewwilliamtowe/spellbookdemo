import {Link} from 'react-router-dom'
const Navbar = () => {
    // const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    return (
        <nav className="navbar">
            <h1>Navigation</h1>
            <div className="links">
                <Link to="/">Home</Link>
            </div>
            <div className="links">
                <Link to="/spellpage">Spells</Link>
            </div>
            <div className="links">
                <Link to="/classes">Classes</Link>
            </div>
            <button  >
                Toggle Sidebar
            </button>
        </nav>
    );
}
 
export default Navbar;