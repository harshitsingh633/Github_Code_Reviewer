import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials : true
})

export interface Repository{
    id : number;
    name : string;
    full_name : string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    private: boolean;
}

export const getRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await api.get<Repository[]>(`/auth/getrepos`);

    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

export default api;