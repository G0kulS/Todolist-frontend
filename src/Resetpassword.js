import React, { useState } from "react"; 
import { useHistory, useParams } from "react-router";
import {Resetpwd} from "./api";

export function Resetpassword()
{ 
  const {id} = useParams();
  const history = useHistory();
  const[password,udpatepassword] = useState("");
  const[cpassword,udpatecpassword] = useState("");
  const[type,updatetype] = useState("password");
  const[message,updatemessage] = useState("");
    return  <div class="reset">
            <div class="container-fluid">
         <div class="row">
             <div class="offset-4 col-4">
                <form class="resetpass" onSubmit={
                   async (e)=>{
                        e.preventDefault();
                        let obj = {password};
                        let result = await Resetpwd(id,obj);
                        if(password===cpassword)
                        {
                        if(result.data.message=="password updated")
                        {
                            updatemessage(result.data.message);
                            udpatepassword("");
                            udpatecpassword("");
                            setTimeout(()=>{history.push("/")}, 3000);
                            
                        }}
                        else
                        {
                            udpatepassword("");
                            udpatecpassword("");
                            updatemessage("Password must be identical");
                        }
                    }
                }>
             <div class="mb-3 row">
              <label for="inputPassword" class=" col-form-label">Password</label> <br/>
                
             <input type={type} class="form-control" id="inputPassword" value={password} onChange={
                 (e)=>{
                     udpatepassword(e.target.value);
                 }
             } required minLength="8" />
             
                 </div>
                 <div class="mb-3 row">
              <label for="inputPassword" class=" col-form-label">Confirm Password</label><br/>
                
      <input type={type} class="form-control" id="inputPassword" value={cpassword} onChange={
          (e)=>{
              udpatecpassword(e.target.value);
          }
      } required minLength="8"/>
    </div>
                 
                 <div>
                 <input type="checkbox" id="showpassword" name="showpassword" onChange={
                     (e)=>{
                         if(type=="password")
                         {
                           updatetype("text");
                         }
                         else
                         {
                             updatetype("password");
                         }

                     }
                 }/>
                 < label for="vehicle1">&nbsp;Show Password</label><br/>
                 </div>
                 <div style={{color:"green"}}>
                     {message}
                 </div><br/>
                 <div> <button class="btn btn-primary" type="submit">Save</button>
                     </div>
                 </form>
             </div>
             </div>
    </div>
    </div>
}