import axios, {AxiosError, CreateAxiosDefaults} from "axios";

const baseConfig: CreateAxiosDefaults = {
    baseURL: "http://localhost:5136/",
    withCredentials: true,
}

export const axiosWithAuth = axios.create(baseConfig)
export const axiosBasic = axios.create(baseConfig)

axiosWithAuth.interceptors.request.use(
    function (config)
    {
        const jwt = sessionStorage.getItem("token");
        if (jwt)
        {
            config.headers.Authorization = `Bearer ${jwt}`
        }
        return config
    },
    function (error)
    {
        return Promise.reject(error)
    }
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function positiveHandler(response)
{
    return response
}

interface customError
{
    message: string
    status: number
}

function errorHandler(error:AxiosError<string>)
{
    if (error.response)
    {
        const customError: customError = {
            status: error.response.status,
            message: error.response.data,
        }
        return Promise.reject(customError)
    }
    const customError: customError = {
        status: 500,
        message: "Server is currently unavailable"
    }
    return Promise.reject(customError)
}

axiosBasic.interceptors.response.use(
    positiveHandler,
    errorHandler
)

axiosWithAuth.interceptors.response.use(
    positiveHandler,
    errorHandler
)
