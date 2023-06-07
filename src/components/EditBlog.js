

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function EditBlog() {
  const [createdby, setCreatedby] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImgUrl] = useState('');
  const [createdat, setCreatedat] = useState(Timestamp.now().toDate().toString());

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'blogs'), {
        createdby: user.uid, // Store the userId of the logged-in user
        title,
        desc,
        img,
        createdat
      });

      alert('Success');
      navigate('/display');
    } catch (error) {
      alert(error.message);
    }

    setCreatedby('');
    setTitle('');
    setDesc('');
    setImgUrl('');
    setCreatedat('');
  };

  return (
    <div style={{ height:'60vh',background: 'rgb(245,226,252)',
    background: 'linear-gradient(23deg, rgba(245,226,252,0.7301514355742297) 0%, rgba(251,245,220,1) 80%, rgba(251,251,251,0.8758096988795518) 100%)'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
      <div style={{fontSize:"40px", fontWeight:"bold",marginBottom:'25px', color:'black',marginTop:'20px'}}>
      Edit Blog
      </div>
      <p style={{marginBottom:'1rem'}}>Add a new blog</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <label>Enter your name</label> */}
        <input
          name="username"
          placeholder="ENTER YOUR NAME"
          type="text"
          onChange={(e) => {
            setCreatedby(e.target.value);
          }}
          style={{ marginBottom: '10px', padding: '5px', width:'300px', height:"40px" }}
        />

        {/* <label>Enter Title</label> */}
        <input
          name="title"
          placeholder="ENTER TITLE"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{ marginBottom: '10px', padding: '5px', width:'300px', height:"40px" }}
        />

        {/* <label>Enter description</label> */}
        <textarea
          placeholder="enter description"
          type="text"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          style={{ marginBottom: '10px', padding: '5px' ,width:'300px', height:"40px"}}
        />

        {/* <label>Paste image link</label> */}
        <input
          name="img"
          placeholder="PASTE IMAGE URL"
          type="text"
          onChange={(e) => {
            setImgUrl(e.target.value);
          }}
          style={{ marginBottom: '10px', padding: '5px', width:'300px', height:"40px" }}
        />

        <div style={{ marginTop: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              // backgroundColor: '#ccc',
              border: '5px solid white',
              color: 'black',
              // border: 'none',
              borderRadius: '18px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    </div>
    
  );
}

export default EditBlog;
