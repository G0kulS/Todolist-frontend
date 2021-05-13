import React, { useState } from "react";
import Background from "./img/1489353.jpg";
import "./App.css";
import { Link, useHistory } from "react-router-dom";
import { loginuser } from "./api";



export default function Login()
{    
    let history = useHistory();
    const[type,updatetype] = useState("password");
    const[email,updateemail] = useState("");
    const[password,updatepassword] = useState("");
    const[message,updatemessage] = useState("");

    return <div style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5"
      }}
     class="container-fluid row">
        <div class="col-4">
            <div class="login">
          <form onSubmit={
              async(e)=>{
                  e.preventDefault();
                  let obj = {email,password}
                  let response = await loginuser(obj)
                  if(response.data.message==="Allowed")
                  {
                      updateemail("")
                      updatepassword("");
                      window.localStorage.setItem("app_token1",response.data.token);
                      let temp = "/calender/"+response.data.userid;
                      history.push(temp);
                  }
                  else
                  {
                    updateemail("")
                    updatepassword("");  
                    updatemessage(response.data.message);
                  }
              }
          }>
          <div class="container-fluid row">
              <div class="col-12">
          <label for="exampleFormControlInput1" class="form-label label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required value={email} onChange={
              (e)=>{updateemail(e.target.value)}
          }/>
          </div></div><br/>
          <div class="container-fluid row ">
              <div class="col-12">
              <label for="password" class="form-label label">Password</label>
               <input type={type} class="form-control" id="password" required value={password} onChange={(e)=>{updatepassword(e.target.value)}}/>
              </div>
              <div class="co1-12">
               <input type="checkbox" id="showpassword" name="showpassword" value="password" onChange={
                   ()=>{
                     if(type=="password")
                     {
                         updatetype("text")
                     }
                     else
                     {
                        updatetype("password")
                     }
                   }
               } />
               <label for="showpassword">&nbsp; Show Password</label><br/>
              </div>
          </div><br/>
          <div class="container-fluid row ">
              <div class="col-12">
          <Link to ="/forgetpassword"><span>Forget Password</span></Link>&nbsp;&nbsp;<Link to="/reg"><span>Register</span></Link></div>
          </div>
          <div class="container-fluid row ">
          <div class="col-12" style={{color:"red"}}>
          {message}
           </div>
          </div><br/>
          <div class="container-fluid row ">
          <div class="col-12">
          <button type="submit" class="btn btn-primary">Login</button>
           </div>
          </div>
          </form>
        </div>
        </div>
        </div>
}