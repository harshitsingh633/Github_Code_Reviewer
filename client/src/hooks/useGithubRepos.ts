import { useEffect, useState } from "react";
import { getRepositories, type Repository } from "../api/axios";



export function useGithubRepos () {
    const [repos , setRepos] = useState<Repository[]>([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");

    useEffect(() => {
        async function loadRepo(){
            try{
                const data = await getRepositories();
                setRepos(data);
            }catch(err){
                setError("Unable to load Repositories");
            }finally{
                setLoading(false);
            }
        }
        loadRepo();
    },[]);
    return {
        repos,
        loading,
        error
    }
}