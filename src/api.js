import axios from "axios"; 

export function RegisterUser(data)
{
    return axios.post("https://gokulfsserver.herokuapp.com/register",data);
}
export function loginuser(data)
{
    return axios.post("https://gokulfsserver.herokuapp.com/login",data);
}
export function Getsingletask(id)
{
    return axios.post(`https://gokulfsserver.herokuapp.com/getsingletask/${id}`);
}
export function Sentemail(data)
{
    return axios.post("https://gokulfsserver.herokuapp.com/email",data);
}
export function Updatesingletask(id,data)
{
    return axios.post(`https://gokulfsserver.herokuapp.com/updatesingletask/${id}`,data);
}
export function Resetpwd(id,data)
{
    return axios.post(`https://gokulfsserver.herokuapp.com/resetpassword/${id}`,data);
}
export function Addtask(data)
{
    return axios.post(`https://gokulfsserver.herokuapp.com/task`,data,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Gettask(id,data)
{
    return axios.post(`https://gokulfsserver.herokuapp.com/gettask/${id}`,data,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Updatetask(id,data)
{
    return axios.post(`https://gokulfsserver.herokuapp.com/taskupdate/${id}`,data,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Getalltask(id)
{
    return axios.get(`https://gokulfsserver.herokuapp.com/getalltask/${id}`,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}
export function Deletetask(id)
{
    return axios.delete(`https://gokulfsserver.herokuapp.com/deletetask/${id}`,{
        headers:{ authorization:window.localStorage.getItem("app_token1")}
    });
}