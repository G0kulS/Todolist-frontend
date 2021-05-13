import React, { useState } from "react";
import Background from "./img/photo-1611988615248-5d4f0b9ac31e.jpg";
import "./App.css";
import { Link } from "react-router-dom";
import { Sentemail } from "./api";



export default function Forgetpassword()
{    
    const[message,updatemessage] = useState("");
    const[email,updateemail] = useState('');
    const[success,updatesuccess] = useState(false);
    return <div style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5"
      }}
     class="container-fluid row">
        <div class="col-5">
            <div class="login">
          <form>
          <div class="container-fluid row ">
          <div class="col-12">
          
           </div>
          </div>
          <div class="container-fluid row">
              <div class="col-12">
          <label for="exampleFormControlInput1" class="form-label label">Enter your registered Email address to get password reset link</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} required onChange={
            (e)=>{updateemail(e.target.value)}
          }/>
          </div></div><br/>
          <div class="container-fluid row ">
          <div class="col-12">
          {success==true?<span style={{color:"green"}}>{message}</span>:<span style={{color:"red"}}>{message}</span>}
           </div>
          </div><br/>
          <div class="container-fluid row ">
          <div class="col-12">
          <button type="button" class="btn btn-primary" onClick={
            async()=>{
              let res = await Sentemail({email:email});
              updatemessage(res.data.message);
              updatesuccess(res.data.sent);
              updateemail("");
            }
          }>Send Mail</button>
           </div>
          </div>
          </form>
        </div>
        </div>
        </div>
}