import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('mario')
    const history = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault()
        const blog = {title, body, author}
        console.log(blog)
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then((response) => {
            console.log(response)
            console.log(response.json)
            console.log('new blog added')
            history.push('/')
        }).catch((err) => {
            console.log(err)
        })
    }

    return ( 
        <div className = "create" >
            <h2>Add a new Blog</h2>
            <form onSubmit={handleCreate}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                />
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <button>Add Blog</button>
            </form>
        </div>
            
     );
}
 
export default Create;