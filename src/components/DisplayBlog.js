import { orderBy,collection,query, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {db} from '../firebase';
import { Route,Routes } from 'react-router-dom';
const DisplayBlog = () =>
{
    const [blogs, setBlogs] = useState([]);
    //to view effects/changes as soon as they are made   
    useEffect(() => {
     
        const blogref=collection(db,"blogs");
        const q=query(blogref,orderBy("title","desc","username","setImgUrl","createdat"))
        
        onSnapshot(q,(snapshot)=>
        {
             console.log(snapshot)
            const allBlogs = snapshot.docs.map((docs) => ({
                id: docs.id,
                ...docs.data()
            }))
            setBlogs(allBlogs)
           
     
        })
      
    },[])
    return(
        <div className='eb'>
            {blogs.length === 0 ? (<p>No blogs found</p>) : (blogs.map
                ((blog)=><div className="blog-cont" key={blog.id}>
                    <div className="section1">
                        <p>{blog.title}</p>
                        <p>Created by- {blog.createdby}</p>
                    </div>
                    <div className="section2">
                        <p><img src={blog.img}></img></p>
                        <p>{blog.desc}</p>
                    </div>
                    <div className="section3">
                        <p>Posted on- {blog.createdat}</p>
                    </div>
                </div>
                
                ))}
        </div>
    )
};

export default DisplayBlog;


// import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";

// Initialize Firebase



//   return (
//     <div>
//       {blogs.length === 0 ? (
//         <p>No blogs found</p>
//       ) : (
//         <ul>
//           {blogs.map((blog) => (
//             <li key={blog.id}>{blog.title}</li>
//             // Adjust the display as per your blog data structure
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DisplayBlog;