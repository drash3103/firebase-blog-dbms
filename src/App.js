// // import React from 'react'
// // import Nav from './components/Nav'
// // import EditBlog from './components/EditBlog';
// // // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import DisplayBlog from './components/DisplayBlog'
// // import firebase from './firebase';

// // import {
// //   BrowserRouter as Router,
// //   Switch,
// //   Route,
// //   Link,
// //   Routes,
// //   withRouter
// // } from "react-router-dom";
// // // import {withRouter} from 'react-router';
// // // import { Route,Routes } from 'react-router-dom';

// // function App() 
// //   {
// //   return (
// //    <>
// //    <div>
// //      <Router>
// //        <Nav/>
// //      <Routes>
// //           <Route path="/EditBlog" component={withRouter(EditBlog)}>
// //           </Route>
// //         </Routes>
// //      </Router>
   
// //    </div>
// //    {/* <Router> 
// //       <Nav/>
// //       <Routes>
// //         <Route exact path="/EditBlog" component={EditBlog} /> */}
// //         {/* <Route path="/" component={Login} />
// //         <Route path="/" component={Signup} /> */}
// //         {/* <Route path="/display/:id" component={<DisplayBlog/>} /> */}
// //         {/* Add other routes as needed */}
// //       {/* </Routes>
// //     </Router> */}
// //     <DisplayBlog/>
// //    {/* <Routes>
// //     <Route path="/EditBlog" element={<EditBlog/>}/>
// //   </Routes> */}
// //    </>
// //   )
  
// // }

// // export default App;



// // App.js

// import React from 'react';
// import { BrowserRouter, Route, Switch,Routes } from 'react-router-dom';
// import Nav from './components/Nav'
// import EditBlog from './components/EditBlog';
// import DisplayBlog from './components/DisplayBlog';
// // import DisplayBlog from './DisplayBlog';

// function App() {
//   return (
// <>
// <Nav/>
//       <Routes>
//         <Route  exact path="/Editblog" component={<DisplayBlog/>} />
//       </Routes>
// </>
    
    
  
   
//   ); 
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import EditBlog from './components/EditBlog';
import DisplayBlog from './components/DisplayBlog';
import Login from './components/Login';
import './App.css';
import Signup from './components/Signup';


const App = () => {
  return (
    <>
     <Router>
      <Nav/>
      <Routes>
        <Route path="/postblog" element={<EditBlog/>} />
        <Route path="/display" element={<DisplayBlog/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
      </Routes>
    </Router>
    
    </>
   
  );
};

export default App;



