import instance from "./base";

export async function getProblem(queryString, roomTier){
    try{
        const data = await instance.get(`/problem/${roomTier}${queryString}`);
        return data
    }catch(err){
        return Promise.reject(err);
    }
}