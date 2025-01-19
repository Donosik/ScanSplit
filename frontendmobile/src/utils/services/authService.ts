import {axiosBasic} from "../axios/axios.ts";

export interface registerDTO{
    login: string;
    password: string;
    name:string;
    lastname: string;
    phoneNumber: string;
    email: string;
}
export async function register(register: registerDTO): Promise<void>
{
    const response=await axiosBasic.post("/auth/register",register)
    return response.data;
}

export interface loginDTO{
    login: string;
    password: string;
}
export async function login(login:loginDTO)
{
    const response=await axiosBasic.post("/auth/login",login)
    return response.data;
}
