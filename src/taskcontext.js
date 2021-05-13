import React, { useState }  from "react";

const TaskContext = React.createContext();

export default TaskContext;

export const TaskDetails =   ({children}) => {
    let [userdata,updateuserdata]= useState([]);

   
    return <TaskContext.Provider value = {{userdata,updateuserdata}}>{children}</TaskContext.Provider>
}