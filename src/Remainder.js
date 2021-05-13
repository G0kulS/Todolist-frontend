import React, { useEffect, useState } from "react"; 
import { useHistory, useParams } from "react-router";
import { Deletetask, Getsingletask, Updatesingletask } from "./api";

export default function Remainder()
{   
   const {id} = useParams();
   const history = useHistory();
   const [taskname,updatetaskname] = useState("");
   const [taskdes,updatetaskdes] = useState("");
   const [taskstatus,updatetaskstatus] = useState(false);
   const [tt,updatett] = useState("");
    useEffect(async()=>{
      let result = await Getsingletask(id);
      console.log(result.data);
      if(result.data.available==true)
      {
      if(result.data.Completed==true)
      {
        history.push("/taskdone");
      }
      else
      {
        updatetaskname(result.data.Taskname);
        updatetaskdes(result.data.Taskdescription);
        updatett(result.data.TaskTime);
        updatetaskstatus(result.data.Completed);
      }
    }else
    {
      history.push("/")
    }
    },[])
   return <div class="reset">
    <div class="container-fluid">
        <div class="row">
          <div class='offset-3 col-7'>
            <div class="textdes">
           <span class="design-text">   Taskname : </span> {taskname} <br/><br/>
            <span class="design-text">  Taskdescription:</span> {taskdes} <br/><br/>
            <span class="design-text">   Tasktime :</span> {tt}<br/><br/>
            {taskstatus==false?<><span class="design-text">Status :</span><span>Yet to Complete</span></>:<><span class="design-text">Status :</span><span style={{color:"Green"}}>Task Completed</span></>}
            <br/><br/>
            <div className="container-fluid row ">
              <div class="col-6">
            <button class="btn btn-danger" onClick={async()=>{
              await Deletetask(id);
              history.push("/");
            }}>Cancel Event</button></div><div className="col-6"><button class="btn btn-success" onClick={
              async()=>{
                 await Updatesingletask(id,{Completed:true})
                 history.push("/taskdone");
              }
            }>Task done</button> 
              </div>
              </div>
              </div>
          </div>
        </div>
        </div>    
     </div> 
}