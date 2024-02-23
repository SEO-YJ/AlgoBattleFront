import axios from "axios";
import instance from "./base";

export async function signIn(bojNickname){
    try{
        const data = await instance.post(`/users/${bojNickname}`);
        return data
    }catch(err){
        return Promise.reject(err);
    }
}