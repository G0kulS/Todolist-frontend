import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Background from "./img/2016-printable-mockup-gr-1000px-single-CHANCE1.jpg";
import { createPopper } from '@popperjs/core';

export default function Calender()
{   
    let {id} = useParams();
    let history = useHistory();
    let date = new Date();
    let [currentmonth,updatecurrentmonth] = useState(0);
    let[firstline,updatefirstline] = useState([]);
    let[nextline,updatenextline] = useState([]);
    let[month,updatemonth] = useState("");
    let[data,updatedata] = useState("");
    useEffect(()=>{
     let firstday = new Date(date.getFullYear(),date.getMonth(),1).toString().split(" ")[0];
     let lastday = new Date(date.getFullYear(),date.getMonth()+1,0).toString().split(" ")[2];   
     updatefirstline([...makeFirstLine(findStartDay(firstday))]);
     updatenextline([...makeNextLine(findStartDay(firstday),+lastday)]);
     updatecurrentmonth(date.getMonth()+1);
     updatemonth(convertToMonth(date.getMonth()+1))
    },[])
    
   
    return <>
     <div style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
       
      }}>
     <div class="container-fluid " >
     <div class="row">
     <div class="offset-1 col-1 sidebutton"><span class="alignbutton"><button class="btn" onClick={
         ()=>{
          if(currentmonth>=2)
          {   
            let temp = currentmonth - 1; 
            updatecurrentmonth(temp);
            updatemonth(convertToMonth(temp));
            let firstday = new Date(date.getFullYear(),temp-1,1).toString().split(" ")[0];
            let lastday = new Date(date.getFullYear(),temp,0).toString().split(" ")[2];   
            updatefirstline([...makeFirstLine(findStartDay(firstday))]);
            updatenextline([...makeNextLine(findStartDay(firstday),+lastday)]);
          }
         }
     }><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
     <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
   </svg></button></span></div>
     <div class="col-8 header"><span class="monthname">{month}</span></div>   
     <div class="col-1 sidebutton"><span class="alignbutton"><button class="btn" onClick={
         ()=>{
          if(currentmonth<=11)
          {   
          let temp = currentmonth + 1; 
          updatecurrentmonth(temp);
          updatemonth(convertToMonth(temp));
          let firstday = new Date(date.getFullYear(),temp-1,1).toString().split(" ")[0];
          let lastday = new Date(date.getFullYear(),temp,0).toString().split(" ")[2];   
          updatefirstline([...makeFirstLine(findStartDay(firstday))]);
          updatenextline([...makeNextLine(findStartDay(firstday),+lastday)]);
          }
         }
         
     }><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
     <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
   </svg></button></span></div>
     <div class="col-1 sidebutton"><button class="btn btn-primary logout" onClick={
         ()=>{
             window.localStorage.removeItem("app_token1");
             history.push("/")
         }
     }>Logout</button></div>
    </div>
    </div>    
    <div class="container-fluid row">
    <div class="col-1 icon-content">
        <button type="button" class="btn btn-primary tooltipbtn" data-bs-toggle="tooltip" data-bs-placement="right" title="List of all task" onClick={()=>{
            history.push(`/alltask/${id}`);
        }}>
  <i class="fas fa-list-ul fa-2x"></i>
</button>  <br/>
<button type="button" class="btn btn-primary tooltipbtn" data-bs-toggle="tooltip" data-bs-placement="right" title="Completed Task" onClick={()=>{
            history.push(`/c-task/${id}`);
        }}>
<i class="fas fa-calendar-check fa-2x"></i>
</button> <br/>
<button type="button" class="btn btn-primary tooltipbtn" data-bs-toggle="tooltip" data-bs-placement="right" title="Task yet to complete"onClick={()=>{
            history.push(`/p-task/${id}`);
        }}>
<i class="fas fa-calendar-day fa-2x"></i>
</button>
            </div>
        <div class="col-11">
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Sun</th>
        <th scope="col">Mon</th>
        <th scope="col">Tue</th>
        <th scope="col">Wed</th>
        <th scope="col">Thu</th>
        <th scope="col">Fri</th>
        <th scope="col">Sat</th>
      </tr>
    </thead>
    <tbody>
     {  <tr>{ 
        firstline.map((i)=>{
            if(i==" ")
            {
         return<td>{i}</td>
        }
         else
          {
            let trid = "cell"+i;   
         return <td id={trid} onClick={
            ()=>{
               let link = "/task/"+i+"-"+month+"-"+id;
               history.push(link);
            }
            }onMouseOver={
                ()=>{
                   document.getElementById(trid).innerHTML = "+ Task";
                }
               
             }
             onMouseOut={
                ()=>{
                    document.getElementById(trid).innerHTML = i; 
                }         
            }>{i}</td>
          }})}</tr>
     }
     {
         nextline.map((i)=>{
             return <tr>{i.map((j)=>{
                 let temp = j ; 
                 let trid = "cell"+j;
                 return <td id={trid} onClick={
                     ()=>{
                        let link = "/task/"+temp+"-"+month+"-"+id;
                        history.push(link);
                     }
                 } onMouseOver={
                    ()=>{
                       document.getElementById(trid).innerHTML = "+ Task";
                    }
                   
                 }
                 onMouseOut={
                    ()=>{
                        document.getElementById(trid).innerHTML = temp; 
                    }         
                }>{j}</td> 
             })}</tr>
         })
     }
    </tbody>
  </table>
  </div>
  </div>
  </div>
  </>
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
function findStartDay(day)
{  
    switch(day)
    {
        case "Sun": return 0 ; 
        case "Mon": return 1 ; 
        case "Tue": return 2 ; 
        case "Wed": return 3 ; 
        case "Thu": return 4 ; 
        case "Fri": return 5 ; 
        case "Sat": return 6 ; 
    }
}

function makeFirstLine(day)
{
  let arr = [];
  let i = 1 
  for(; i <=day;i++)
  {
      arr.push(" ");
  }
  for(let j = 1 ; i<=7;i++,j++)
  {
      arr.push(j)
  }
  return arr;
}
function makeNextLine(day,length)
{
  let filleddays = 7 - day; 
  let arr = [] ; 
  let remainingdays = length -filleddays;
  let start = filleddays+1;

  if(remainingdays%7==0)
  {
      remainingdays/=7;
  }
  else
  {
      remainingdays= Math.floor(remainingdays/7);
      remainingdays++;
  }
  for(let i = 0 ; i<remainingdays;i++)
  {
      let temp = [];
      for(let j =0 ;j<7 && start<=length;j++,start++)
      {   
          
          temp.push(start)
      }
      arr.push(temp);
  } 
  return arr;
}