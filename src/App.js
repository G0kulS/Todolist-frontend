import logo from './logo.svg';
import './App.css';
import Calender from './calender';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Task from './task';
import Login from './login';
import Registry from './register';
import Forgetpassword from './forgetpassword';
import { TaskDetails } from './taskcontext';
import { Resetpassword } from './Resetpassword';
import Remainder from './Remainder';
import taskdone from './taskdone';
import Taskdone from './taskdone';
import Alltask from './Alltask';
import Completedtask from './Completedtask';
import Pendingtask from './Pendingtask';


function App() {
  return (
    <div >
       <TaskDetails>
        <Router>
        <Switch>
       <Route path="/" exact>
       <Login></Login>
       </Route>
       <Route path="/reg" exact>
       <Registry></Registry>
       </Route>
       <Route path="/task/:id">
         <Task></Task>
       </Route>
       <Route path="/forgetpassword">
         <Forgetpassword></Forgetpassword>
       </Route>
       <Route path="/calender/:id" exact>
       <Calender></Calender>
       </Route>
       <Route path="/resetpassword/:id" exact>
       <Resetpassword></Resetpassword></Route>
       <Route path="/remainder/:id" exact>
        <Remainder></Remainder>
       </Route>
       <Route path="/taskdone" exact>
        <Taskdone></Taskdone>
       </Route>
       <Route path="/alltask/:id" exact>
        <Alltask></Alltask>
       </Route>
       <Route path="/c-task/:id" exact>
        <Completedtask></Completedtask>
       </Route>
       <Route path="/p-task/:id" exact>
        <Pendingtask></Pendingtask>
       </Route>
       </Switch>
      </Router>
      </TaskDetails>
    </div>
  );
}

export default App;
