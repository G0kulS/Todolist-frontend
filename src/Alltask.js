import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Getalltask } from "./api";

export default function Alltask()
{   
    const history = useHistory();
    const [tasklist,updatetasklist] = useState([]); 
    const {id} = useParams();
    const calenderlink = `/calender/${id}`;
    useEffect( async()=>{
     let temp = await Getalltask(id);
     console.log(temp);
     updatetasklist([...temp.data]);
    },[])
    return <div class="container-fluid">
        <div class="row bg-primary taskheader">
           
            <div class="col-1">
             <button class="btn btn-warning" onClick={
                     ()=>{
                         history.push(calenderlink);
                     }
             }><i class="fas fa-arrow-circle-left fa-1x"></i></button>                        
            </div>
            <div class="col-10">
                List of all task
            </div>
            <div class="col-1">
            <button class="btn btn-warning" onClick={()=>{
             window.localStorage.removeItem("app_token1");
             history.push("/")
         }}>Logout</button>                     
            </div>
            </div>
            <div class="row col-12">
            <table class="table task">
    <thead>
    <tr class="task">
      <th class="task action" scope="col">Date</th>
      <th class="task time" scope="col">Time</th>
      <th class="task name" scope="col">Task Name</th>
      <th class="task des" scope="col">Description</th>
      <th class="task time" scope="col">Status</th>
      
    </tr> 
  </thead>
  <tbody>{
    tasklist.map((i)=>{

    return <tr class="task ">
      <td class="task taskdata">{i.Taskdate}-{convertToMonth(i.Taskmonth)}</td>
      <td class="task taskdata">{i.TaskTime}</td>
      <td class="task taskdata">{i.Taskname}</td>
      <td class="task taskdata">{i.Taskdescription}</td>
      {
      i.Completed==false?<td class="task taskdata"style={{color:`red`}}><i class="fas fa-hourglass-half"></i></td>:<td class="task taskdata"style={{color:`Green`}}><i class="far fa-check-circle"></i></td>
      }</tr>})}
  </tbody>
      </table>
        </div>
        </div>
        
}

function convertToMonth(num)
{
  switch(num)
  {
      case 1 : 
      {
          return "January";
      }
      case 2 : 
      {
          return "Febuary";
      }
      case 3 :
      {
          return "March"
      }
      case 4 :
      {
          return "April"
      }
      case 5 :
      {
            return "May"
      }
      case 6 :
        {
            return "June"
        }
      case 7:
        {
            return "July"
        }
        case 8:
        {
            return "August"
        } 
        case 9:
        {
            return "September"
        } 
        case 10:
        {
            return "October"
        } 
        case 11:
        {
            return "November"
        } 
        case 12:
        {
            return "December"
        } 
  }
}