import React, { useState } from "react";
import Background from "./img/To-do-List.jpg";
import "./App.css";
import { useHistory } from "react-router";
import { RegisterUser } from "./api";




export default function Registry()
{   
    let history = useHistory();
    const[type,updatetype] = useState("password");
    const[message,updatemessage] = useState("");
    const[name,updatename] = useState("");
    const[email,updateemail] = useState("");
    const[password,updatepassword] = useState("");
    const[cpassword,updatecpassword] = useState("");
    const[color,updatecolor] = useState("Red");
    return <div style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5"
      }}
     class="container-fluid row">
        <div class="offset-5 col-4">
            <div class="register">
          <form onSubmit ={
           async   (e)=>{
                  e.preventDefault();
                  if(password===cpassword)
                  {
                  let obj = {
                      Name : name,
                      email :email,
                      password:password  
                  }
                  let response = await RegisterUser(obj);
                  if(response.data.message==="Registered")
                  {
                      updatecolor("green");
                      updatemessage(response.data.message);
                      updatename("");
                      updatepassword("");
                      updateemail("");
                      updatecpassword("");
                      history.push("/");
                  }
                  else
                  {
                    updatemessage(response.data.message);
                    updatename("");
                    updatepassword("");
                    updateemail("");
                    updatecpassword("");
                  }
                  }
                  else
                  {
                      updatemessage("Password must be identical")
                  }
              }
          }>
          <div class="container-fluid row">
          <div class="col-12">
          <label for="name" class="form-label label">Name</label>
          <input type="text" class="form-control" id="name" placeholder="name" value={name} required onChange={
              (e)=>{
                  updatename(e.target.value);
                  
              }
          }/>
          </div></div><br/>
          <div class="container-fluid row">
              <div class="col-12">
          <label for="exampleFormControlInput1" class="form-label label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} required onChange={
              (e)=>{updateemail(e.target.value)}
          }/>
          </div></div><br/>
          <div class="container-fluid row ">
              <div class="col-12">
              <label for="password" class="form-label label">Password</label>
               <input type={type} class="form-control" id="password" required value={password} onChange={(e)=>{updatepassword(e.target.value)}} minLength="8"/>
              </div>
              </div><br/>
          <div class="container-fluid row ">
              <div class="col-12">
              <label for="password" class="form-label label">Confirm Password</label>
               <input type={type} class="form-control" id="password" required value={cpassword} onChange={(e)=>{updatecpassword(e.target.value)}} minLength="8"/>
              </div><br/>
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
               }/>
               <label for="showpassword">&nbsp; Show Password</label><br/>
              </div>
          </div><br/>
          <div class="container-fluid row ">
          <div class="col-12" style={{color:`${color}`}}>
           {message}
           </div>
          </div><br/>
          <div class="container-fluid row ">
          <div class="col-12">
          <button type="submit" class="btn btn-primary">Register</button>
           </div>
          </div>
         
          </form>
        </div>
        </div>
        </div>
}