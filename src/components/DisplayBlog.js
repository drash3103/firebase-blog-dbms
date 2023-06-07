// import React, { useState, useEffect } from 'react';
// import { collection, query, orderBy, onSnapshot, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, serverTimestamp } from 'firebase/firestore';

// const DisplayBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [comment, setComment] = useState('');
//   const [blogComments, setBlogComments] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const firestore = getFirestore();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         navigate('/login');
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [auth, navigate]);

//   const handleCommentSubmit = async (event, blogId) => {
//     event.preventDefault();

//     if (comment.trim() === '') {
//       return;
//     }

//     const newComment = {
//       text: comment,
//       userId: auth.currentUser.uid,
//       timestamp: serverTimestamp(),
//     };

//     try {
//       const commentsRef = collection(db, `blogs/${blogId}/comments`);
//       const docRef = await addDoc(commentsRef, newComment);
//       const addedComment = { id: docRef.id, ...newComment };
//       setBlogComments((prevComments) => ({
//         ...prevComments,
//         [blogId]: [...(prevComments[blogId] || []), addedComment],
//       }));
//       setComment('');
//     } catch (error) {
//       console.log('Error adding comment:', error);
//     }
//   };

//   const handleCommentDelete = async (blogId, commentId) => {
//     try {
//       const commentRef = doc(db, `blogs/${blogId}/comments/${commentId}`);
//       await deleteDoc(commentRef);
//       setBlogComments((prevComments) => {
//         const updatedComments = { ...prevComments };
//         const updatedBlogComments = (updatedComments[blogId] || []).filter((comment) => comment.id !== commentId);
//         return {
//           ...updatedComments,
//           [blogId]: updatedBlogComments,
//         };
//       });
//       alert('Comment deleted successfully');
//     } catch (error) {
//       alert('Error deleting comment');
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const fetchComments = async (blogId) => {
//     const commentsRef = collection(db, `blogs/${blogId}/comments`);
//     const snapshot = await getDocs(commentsRef);
//     const comments = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       text: doc.data().text,
//       userId: doc.data().userId,
//     }));
//     setBlogComments((prevComments) => ({ ...prevComments, [blogId]: comments }));
//   };

//   useEffect(() => {
//     const blogRef = collection(db, 'blogs');
//     const q = query(blogRef, orderBy('title', 'desc', 'username', 'setImgUrl', 'createdat'));

//     onSnapshot(q, (snapshot) => {
//       const allBlogs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setBlogs(allBlogs);
//     });
//   }, []);

//   useEffect(() => {
//     blogs.forEach((blog) => {
//       fetchComments(blog.id);
//     });
//   }, [blogs]);

//   const filteredBlogs = blogs.filter((blog) =>
//     blog.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleBlogDelete = async (blogId) => {
//     try {
//       const blogRef = doc(db, 'blogs', blogId);
//       await deleteDoc(blogRef);
//       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
//       setBlogComments((prevComments) => {
//         const updatedComments = { ...prevComments };
//         delete updatedComments[blogId];
//         return updatedComments;
//       });
//       alert('Blog deleted successfully');
//     } catch (error) {
//       alert('Error deleting blog');
//       console.error('Error deleting blog:', error);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
//       <input
//         type="text"
//         placeholder="Search by title"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{
//           marginBottom: '10px',
//           padding: '8px',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           backgroundColor: '#f5f5f5',
//         }}
//       />

//       {filteredBlogs.length === 0 ? (
//         <p>No blogs found</p>
//       ) : (
//         <>
//           {filteredBlogs.map((blog) => (
//             <div
//               key={blog.id}
//               style={{ width: '80%', backgroundColor: '#f9f9f9', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}
//             >
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{blog.title}</h2>
//                 <p style={{ fontSize: '14px', color: '#888' }}>Created by - {blog.createdby}</p>
//               </div>
//               <hr />
//               <div style={{ display: 'flex', marginTop: '20px' }}>
//                 <div style={{ flex: '1', marginRight: '20px' }}>
//                   <img
//                     style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
//                     src={blog.img}
//                     alt="Blog"
//                   />
//                 </div>
//                 <div style={{ flex: '2' }}>
//                   <p>{blog.desc}</p>
//                 </div>
//               </div>
//               <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>Posted on - {blog.createdat}</div>
//               <div style={{ marginTop: '20px' }}>
//                 {isLoggedIn ? (
//                   <form onSubmit={(e) => handleCommentSubmit(e, blog.id)}>
//                     <div style={{ display: 'flex' }}>
//                       <input
//                         type="text"
//                         placeholder="Add a comment"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
//                       />
//                       <button
//                         type="submit"
//                         style={{
//                           padding: '10px 20px',
//                           backgroundColor: '#555',
//                           color: '#fff',
//                           border: 'none',
//                           borderRadius: '5px',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <p>Login to add comments</p>
//                 )}
//                 <p>comments</p>
//                 <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
//                   {blogComments[blog.id] &&
//                     blogComments[blog.id].map((comment) => (
//                       <li key={comment.id} style={{ marginBottom: '5px', fontSize: '14px', color: '#333' }}>
//                         {comment.userId === auth.currentUser.uid ? 'You' : comment.userId}: {comment.text}
//                         {comment.userId === auth.currentUser.uid && (
//                           <button
//                             type="button"
//                             onClick={() => handleCommentDelete(blog.id, comment.id)}
//                             style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//               {blog.createdby === auth.currentUser.uid && (
//                 <button
//                   type="button"
//                   onClick={() => handleBlogDelete(blog.id)}
//                   style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
//                 >
//                   Delete Blog
//                 </button>
//               )}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default DisplayBlog;


import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const DisplayBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState('');
  const [blogComments, setBlogComments] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  const handleCommentSubmit = async (event, blogId) => {
    event.preventDefault();

    if (comment.trim() === '') {
      return;
    }

    const newComment = {
      text: comment,
      userId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };

    try {
      const commentsRef = collection(db, `blogs/${blogId}/comments`);
      const docRef = await addDoc(commentsRef, newComment);
      const addedComment = { id: docRef.id, ...newComment };
      setBlogComments((prevComments) => ({
        ...prevComments,
        [blogId]: [...(prevComments[blogId] || []), addedComment],
      }));
      setComment('');
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

  const handleCommentDelete = async (blogId, commentId) => {
    try {
      const commentRef = doc(db, `blogs/${blogId}/comments/${commentId}`);
      await deleteDoc(commentRef);
      setBlogComments((prevComments) => {
        const updatedComments = { ...prevComments };
        const updatedBlogComments = (updatedComments[blogId] || []).filter((comment) => comment.id !== commentId);
        return {
          ...updatedComments,
          [blogId]: updatedBlogComments,
        };
      });
      alert('Comment deleted successfully');
    } catch (error) {
      alert('Error deleting comment');
      console.error('Error deleting comment:', error);
    }
  };

  const fetchComments = async (blogId) => {
    const commentsRef = collection(db, `blogs/${blogId}/comments`);
    const snapshot = await getDocs(commentsRef);
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      userId: doc.data().userId,
    }));
    setBlogComments((prevComments) => ({ ...prevComments, [blogId]: comments }));
  };

  useEffect(() => {
    const blogRef = collection(db, 'blogs');
    const q = query(blogRef, orderBy('title', 'desc', 'username', 'setImgUrl', 'createdat'));

    onSnapshot(q, (snapshot) => {
      const allBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(allBlogs);
    });
  }, []);

  useEffect(() => {
    blogs.forEach((blog) => {
      fetchComments(blog.id);
    });
  }, [blogs]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlogDelete = async (blogId) => {
    try {
      const blogRef = doc(db, 'blogs', blogId);
      await deleteDoc(blogRef);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      setBlogComments((prevComments) => {
        const updatedComments = { ...prevComments };
        delete updatedComments[blogId];
        return updatedComments;
      });
      alert('Blog deleted successfully');
    } catch (error) {
      alert('Error deleting blog');
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        // backgroundColor: 'lilac',
        // background: 'linear-gradient(to bottom, #D3CCE3, #e9e4f0)',
        minHeight: '100vh',
        padding: '20px',
        background: 'rgb(245,226,252)',
        background: 'linear-gradient(23deg, rgba(245,226,252,0.7301514355742297) 0%, rgba(251,245,220,1) 80%, rgba(251,251,251,0.8758096988795518) 100%)'
        // backgroundColor:'white'
      }}
    >
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '30px',
          padding: '8px',
          border: '1px solid #ccc',
          textAlign:'center',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
      />

      {filteredBlogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <>
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              style={{ width: '90%', padding: '20px', marginBottom: '30px', borderRadius: '15px' , border:'8px solid white'}}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '10px' }}>{blog.title}</h2>
                <p style={{ fontSize: '14px', color: '#888' }}>Created by - {blog.createdby}</p>
              </div>
              <hr />
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                    src={blog.img}
                    alt="Blog"
                  />
                </div>
                <div style={{ flex: '2' }}>
                  <p>{blog.desc}</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>Posted on - {blog.createdat}</div>
              <div style={{ marginTop: '20px' }}>
                {isLoggedIn ? (
                  <form onSubmit={(e) => handleCommentSubmit(e, blog.id)}>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
                      />
                      <button
                        type="submit"
                        style={{
                          padding: '10px 20px',
                          backgroundColor:'white',
                          color: 'black',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>Login to add comments</p>
                )}
                <p>comments</p>
                <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                  {blogComments[blog.id] &&
                    blogComments[blog.id].map((comment) => (
                      <li key={comment.id} style={{ marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                        {comment.userId === auth.currentUser.uid ? 'You' : comment.userId}: {comment.text}
                        {comment.userId === auth.currentUser.uid && (
                          <button
                            type="button"
                            onClick={() => handleCommentDelete(blog.id, comment.id)}
                            style={{ marginLeft: '10px', backgroundColor: '#ff9999', color: 'white', borderRadius: '5px' }}
                          >
                            Delete
                          </button>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
              {blog.createdby === auth.currentUser.uid && (
                <button
                  type="button"
                  onClick={() => handleBlogDelete(blog.id)}
                  style={{ marginTop: '10px', backgroundColor: '#ff9999', color: 'white', borderRadius: '5px',marginLeft:'70rem', fontSize:'15px' }}
                >
                  Delete Blog
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayBlog;
