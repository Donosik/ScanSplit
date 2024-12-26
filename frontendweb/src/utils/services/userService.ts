import {axiosWithAuth} from "../axios/axios.ts";

export async function deleteMe()
{
    const response = await axiosWithAuth.delete("/user")
    return response.data;
}

export async function getMe()
{
    const response = await axiosWithAuth.get("/user");
    return response.data
}

export interface userDTO
{
    id: number;
    login: string;
    name: string;
    lastname: string;
    phoneNumber: string;
    email: string;
}

export async function updateMe(user: userDTO)
{
    const response = await axiosWithAuth.put("/user", {user});
    return response.data;
}

export async function updatePassword(password: string)
{
    const response=await axiosWithAuth.patch("/user",{password:password});
    return response.data;
}

