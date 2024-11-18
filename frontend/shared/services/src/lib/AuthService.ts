import { mainBackendApi } from './MainBackendApi';

export async function login(login:string,password:string)
{
const response=await mainBackendApi.post("Auth/login",{login:login,password:password});
}
