import { orderBy,collection,query, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {db} from '../firebase';
const DisplayBlog = () =>
{
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
     
        const blogref=collection(db,"blog");
        const q=query(blogref,orderBy("title","desc","username","createdat"))
        
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
        <div>
            {blogs.length === 0 ? (<p>No blogs found</p>) : (blogs.map
                ((blog)=><div className="blog-cont" key={blog.id}>
                    <div className="section1">
                        <p>{blog.title}</p>
                        <p>{blog.createdby}</p>
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