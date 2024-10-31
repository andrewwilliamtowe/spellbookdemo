import { useState, useEffect } from "react";

const useFetch = (url) =>{
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{ //runs only once at the beginning
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal})
        .then(response =>{
            if(!response.ok){
                throw Error("Could not fetch data")
            }
            return response.json();
        })
        .then(data =>{
            setData(data)
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
    },[url])  
    return {data, isPending, error}; 


}

export default useFetch;