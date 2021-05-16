import React, { useContext, useEffect, useState } from "react";
import { Button,Modal } from 'react-bootstrap';
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom";
import { Addtask, Deletetask, Gettask ,Updatetask } from "./api";
import TaskContext from "./taskcontext";





export default function Task()
{   
    let history = useHistory();
    let task = useContext(TaskContext);
    let {id} = useParams();
    const[tasklist,updatetasklist] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [editmodalShow, seteditModalShow] = React.useState(false);
    let [today,updatetoday] = useState(false);
    let arr = id.split("-");
    let monthname = arr[1];
    arr[1] =convertToNum(monthname);
    let calenderlink = "/calender/"+arr[2];
   // console.log(calenderlink)
    useEffect( async()=>{
      task.updateuserdata([...arr]); 
      let obj = {
        date : +arr[0],
        month: arr[1]
      }
      let response = await Gettask(arr[2],obj)
      console.log(response.data);
      updatetasklist([...response.data]);
      let date = new Date();
      let currentdate = date.getDate();
      let currentmonth = date.getMonth();
     // console.log(currentdate,currentmonth,+arr[0],arr[1]);
      if(currentmonth>arr[1])
      {
          document.getElementById("addbutton").style.visibility="hidden";
          console.log("button" ,document.getElementById("addbutton"));
      }
      else
      {
        if(currentmonth==arr[1]&&currentdate>+arr[0])
        {
          document.getElementById("addbutton").style.visibility="hidden";
        }
        if(currentmonth==arr[1]&&currentdate==arr[0])
        {
         updatetoday(true);
        // console.log("today",today);
         
        }
      }
    },[])
    useEffect( async()=>{
      task.updateuserdata([...arr]); 
      let obj = {
        date : +arr[0],
        month: arr[1]
      }
      let response = await Gettask(arr[2],obj)
      updatetasklist([...response.data]);
      
    },[modalShow,editmodalShow])
    return<> 
    <div class="container-fluid bg-primary">
        <div class="row  taskheader">
          
          <div class="col-1">
          <button class="btn btn-warning" onClick={()=>{history.push(calenderlink)}}><i class="fas fa-arrow-circle-left fa-1x"></i></button>
            </div>
          <div class="col-10 ">
           <span>To do list on {`${arr[0]}-${monthname}`}</span>
           </div>
           <div class="col-1">
          <button class="btn btn-warning" onClick={ ()=>{
             window.localStorage.removeItem("app_token1");
             history.push("/")
         }}>Logout</button>
            </div>
        </div>
        <button class="addbutton btn btn-primary" id="addbutton" onClick={() => setModalShow(true)}><i class="fas fa-plus-circle fa-2x"></i></button>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
        today={today}
      />
        
    </div>
    <div class="taskbackground">
    <table class="table task">
    <thead>
    <tr class="task">
      <th class="task time" scope="col">Time</th>
      <th class="task name" scope="col">Task Name</th>
      <th class="task des" scope="col">Description</th>
      <th class="task time" scope="col">Status</th>
      <th class="task action" scope="col">Action</th>
    </tr> 
  </thead>
  <tbody>{
    tasklist.map((i)=>{

    return <tr class="task ">
      <td class="task taskdata">{i.TaskTime}</td>
      <td class="task taskdata">{i.Taskname}</td>
      <td class="task taskdata">{i.Taskdescription}</td>
      {
      i.Completed==false?<td class="task taskdata"style={{color:`black`}}>waiting</td>:<td class="task taskdata"style={{color:`Green`}}>done</td>
       }
      <td class="task taskdata"><button class="btn btn-danger bigger" onClick={
        async()=>{
          await Deletetask(i._id);
          let obj = {
            date : +arr[0],
            month: arr[1]
          }
          let response = await Gettask(arr[2],obj)
          updatetasklist([...response.data]);
        }
      }><i class="far fa-calendar-times"></i></button><button class="btn btn-primary bigger" onClick={
        ()=>{seteditModalShow(true)}
      }><i class="far fa-edit"></i><MyVerticallyCenteredEditModal
      show={editmodalShow}
      onHide={() => seteditModalShow(false)}
      data={i}
      today={today}
    /></button></td>
    </tr>
    })}
  </tbody>
</table>
</div>
</>
}

function MyVerticallyCenteredModal(props) {
  let task = useContext(TaskContext);
  const[tname,updatetname] = useState("");
  const[tdes,updatetdes] = useState("");
  const[tt,updatett] = useState(""); 
  const[message,updatemessage] = useState("Press Esc to exit without saving");
  return (<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={
         async (e)=>{
              e.preventDefault();
              //console.log(props.today);
              if(props.today==true)
              {
                let date = new Date();
                let currenthour = date.getHours();
                let currentmin = date.getMinutes();
                //console.log(tt);
                let array = tt.split(":");
                console.log(+array[0],currenthour);
                if(+array[0]>=currenthour)
                 {
                    if(+array[0]>currenthour)
                    {
                      let obj = 
                      {
                        Taskname :tname,
                        Taskdescription:tdes,
                        TaskTime:tt,
                        Taskmonth: task.userdata[1],
                        Taskdate : +task.userdata[0],
                        Userid : task.userdata[2],
                        Completed: false
                      }
                     
                      await Addtask(obj);
                      updatetname("");
                      updatett("");
                      updatetdes("");
                      props.onHide();
                    }
                 else
                 { 
                   if(currenthour==array[0]&&array[1]>=currentmin+20)
                   {
                    let obj = 
                    {
                      Taskname :tname,
                      Taskdescription:tdes,
                      TaskTime:tt,
                      Taskmonth: task.userdata[1],
                      Taskdate : +task.userdata[0],
                      Userid : task.userdata[2],
                      Completed: false
                    }
                   
                    await Addtask(obj);
                    updatetname("");
                    updatett("");
                    updatetdes("");
                    props.onHide();
                   }
                   else
                   {
                   updatemessage("Please register atleast a 20-mins before");
                   updatett("");}
                 }
              }else{
                updatemessage("Please register atleast a 20-mins before");
                   updatett("");
          }}
          else
          {
            let obj = 
                {
                  Taskname :tname,
                  Taskdescription:tdes,
                  TaskTime:tt,
                  Taskmonth: task.userdata[1],
                  Taskdate : +task.userdata[0],
                  Userid : task.userdata[2],
                  Completed: false
                }
               
                await Addtask(obj);
                updatetname("");
                updatett("");
                updatetdes("");
                props.onHide();
          }
        }}>
        <div class="container-fluid row col-12">
     <label for="taskname" class="form-label">Task Name</label>
      <input type="text" class="form-control" id="taskname" required value={tname} onChange={
        (e)=>{updatetname(e.target.value)}
      } />
     </div><br/>
     <div class="container-fluid row col-12">
     <label for="description" class="form-label">Description</label>
     <textarea class="form-control" id="description" rows="2" required value={tdes} onChange={(e)=>{updatetdes(e.target.value)}}></textarea>
     </div><br/>
     <div class="container-fluid row  col-4">
     <label for="time" class="form-label">Time-(HH:mm-AM/PM)</label>
     <input type="time" class="form-control form-sm" min="00:00" max="23:59" id="time" required value={tt} onChange={
       (e)=>{updatett(e.target.value)}
     } />
     </div><br/>
     <div class="container-fluid row  col-12">
     <span style={{color:"blue"}}> {message}</span>
     </div><br/>
        <Modal.Footer>
        <button class="btn btn-primary" type="submit">Submit</button></Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function MyVerticallyCenteredEditModal(props) {
  
  const[tname,updatetname] = useState(props.data.Taskname);
  const[tdes,updatetdes] = useState(props.data.Taskdescription);
  const[tt,updatett] = useState(props.data.TaskTime); 
  const[message,updatemessage] = useState("Press Esc to exit without saving");
  return (<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Task 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <form onSubmit={
         async (e)=>{
              e.preventDefault();
              if(props.today==true)
              {
                let date = new Date();
                let currenthour = date.getHours();
                let currentmin = date.getMinutes();
                //console.log(tt);
                let array = tt.split(":");
                
                if(+array[0]>=currenthour)
                 {
                    if(+array[0]>currenthour)
                    {
                      let obj = 
                      {
                        Taskname :tname,
                        Taskdescription:tdes,
                        TaskTime:tt,
                        Completed:false
                      }
                      
                     let response =  await Updatetask(props.data._id,obj);
                     console.log(response.data);
                      updatetname("");
                      updatett("");
                      updatetdes("");
                      updatemessage("");
                      props.onHide();
                      window.location.reload(false);
                    }
                 else
                 { 
                   if(currenthour==array[0]&&array[1]>=currentmin+20)
                   {
                    let obj = 
                    {
                      Taskname :tname,
                      Taskdescription:tdes,
                      TaskTime:tt,
                      Completed:false
                    }
                    
                   let response =  await Updatetask(props.data._id,obj);
                   console.log(response.data);
                    updatetname("");
                    updatett("");
                    updatetdes("");
                    updatemessage("");
                    props.onHide();
                    window.location.reload(false);
                   }
                   else
                   {
                   updatemessage("Please register atleast a 20-mins before");
                   updatett("");}
                 }
              }
              else{
                updatemessage("Please register atleast a 20-mins before");
                updatett("");
          }}
          else
          {
            let obj = 
            {
              Taskname :tname,
              Taskdescription:tdes,
              TaskTime:tt,
              Completed:false
            }
            
           let response =  await Updatetask(props.data._id,obj);
           console.log(response.data);
            updatetname("");
            updatett("");
            updatetdes("");
            updatemessage("");
            props.onHide();
            window.location.reload(false);
          }
        }}>
        <div class="container-fluid row col-12">
     <label for="taskname" class="form-label">Task Name</label>
      <input type="text" class="form-control" id="taskname" required value={tname} onChange={
        (e)=>{updatetname(e.target.value)}
      } />
     </div><br/>
     <div class="container-fluid row col-12">
     <label for="description" class="form-label">Description</label>
     <textarea class="form-control" id="description" rows="2" required value={tdes} onChange={(e)=>{updatetdes(e.target.value)}}></textarea>
     </div><br/>
     <div class="container-fluid row  col-4">
     <label for="time" class="form-label">Time-(HH:mm-AM/PM)</label>
     <input type="time" class="form-control form-sm" min="00:00" max="23:59" id="time" required value={tt} onChange={
       (e)=>{updatett(e.target.value)}
     } />
     </div><br/>
     <div class="container-fluid row  col-12">
     <span style={{color:"blue"}}> {message}</span>
     </div><br/>
        <Modal.Footer>
       
        <button class="btn btn-primary" type="submit">save</button>
        </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
function convertToNum(Month)
{
  switch(Month)
  {
      case "January" : 
      {
          return 0;
      }
      case "Febuary" : 
      {
          return 1 ;
      }
      case "March" :
      {
          return 2
      }
      case "April" :
      {
          return 3
      }
      case "May" :
      {
          return 4
      }
      case "June" :
        {
            return 5
        }
      case "July":
        {
            return 6
        }
        case "August":
        {
            return 7
        } 
        case "September":
        {
            return 8
        } 
        case "October":
        {
            return 9
        } 
        case "November":
        {
            return 10
        } 
        case "December":
        {
            return 11
        } 
  }
}