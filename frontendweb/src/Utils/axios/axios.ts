import axios, {CreateAxiosDefaults} from "axios";

const baseConfig: CreateAxiosDefaults={
    baseURL: "http://localhost:5136/",
    withCredentials: true,
}

export const axiosWithAuth = axios.create(baseConfig)
export const axiosBasic=axios.create(baseConfig)

axiosWithAuth.interceptors.request.use(
    function (config)
    {
        const jwt=sessionStorage.getItem("token");
        if(jwt)
        {
            config.headers.Authorization=`Bearer ${jwt}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
