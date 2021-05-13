import axios from "axios"; 

export function RegisterUser(data)
{
    return axios.post("http://localhost:4000/register",data);
}
export function loginuser(data)
{
    return axios.post("http://localhost:4000/login",data);
}
export function Getsingletask(id)
{
    return axios.post(`http://localhost:4000/getsingletask/${id}`);
}
export function Sentemail(data)
{
    return axios.post("http://localhost:4000/email",data);
}
export function Updatesingletask(id,data)
{
    return axios.post(`http://localhost:4000/updatesingletask/${id}`,data);
}
export function Resetpwd(id,data)
{
    return axios.post(`http://localhost:4000/resetpassword/${id}`,data);
}
export function Addtask(data)
{
    return axios.post(`http://localhost:4000/task`,data,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Gettask(id,data)
{
    return axios.post(`http://localhost:4000/gettask/${id}`,data,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Updatetask(id,data)
{
    return axios.post(`http://localhost:4000/taskupdate/${id}`,data,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Getalltask(id)
{
    return axios.get(`http://localhost:4000/getalltask/${id}`,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Deletetask(id)
{
    return axios.delete(`http://localhost:4000/deletetask/${id}`,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}