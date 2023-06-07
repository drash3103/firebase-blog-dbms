// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// const Nav = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         // Logout successful
//       })
//       .catch((error) => {
//         console.log('Error signing out:', error);
//       });
//   };

//   return (
//     <nav
//       style={{
//         backgroundColor: 'grey',
//         padding: '20px',
//         position: 'sticky',
//         top: '0',
//         zIndex: '100',
//       }}
//     >
//       <ul
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           listStyle: 'none',
//         }}
//       >
//         <li>
//           <Link
//             to="/Home"
//             style={{
//               color: 'white',
//               textDecoration: 'none',
//               padding: '0px 20px',
//               fontSize: '20px',
//               fontWeight: 'bold',
//             }}
//           >
//             Home
//           </Link>
//         </li>
//         <li style={{ marginLeft: 'auto', marginRight: 'auto' }}>
//           <Link
//             to="/postblog"
//             style={{
//               color: 'white',
//               textDecoration: 'none',
//               padding: '0px 20px',
//               fontSize: '20px',
//               fontWeight: 'bold',
//             }}
//           >
//             Post Blog
//           </Link>
//           <Link
//             to="/display"
//             style={{
//               color: 'white',
//               textDecoration: 'none',
//               marginLeft: '10px',
//               padding: '0px 20px',
//               fontSize: '20px',
//               fontWeight: 'bold',
//             }}
//           >
//             Display Blogs
//           </Link>
//         </li>
//         <li>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             {isLoggedIn ? (
//               <>
//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     color: 'white',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     cursor: 'pointer',
//                     padding: '0px 20px',
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   style={{
//                     color: 'white',
//                     textDecoration: 'none',
//                     marginRight: '10px',
//                     padding: '0px 20px',
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   style={{
//                     color: 'white',
//                     textDecoration: 'none',
//                     padding: '0px 20px',
//                     display: isLoggedIn ? 'none' : 'block',
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Signup
//                 </Link>
//               </>
//             )}
//           </div>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Nav;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  return (
    <nav
      style={{
        position: 'sticky',
        zIndex: '100',
        backgroundColor: 'lilac',
        padding: '20px',
        top: '0',
        zIndex: '100',
        fontFamily: 'Arial',
        width: '100%',
        backgroundColor:'white',
      }}
    >
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          listStyle: 'none',
          margin: '0',
        }}
      >
        <li>
          <Link
            to="/Home"
            style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '20px',
              marginLeft: '20px',
            }}
          >
            Home
          </Link>
          <Link
            to="/postblog"
            style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '20px',
              marginLeft: '20px',
            }}
          >
            Post Blog
          </Link>
          <Link
            to="/display"
            style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '20px',
              marginLeft: '20px',
            }}
          >
            Display Blogs
          </Link>
        </li>
        <li>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  style={{
                    color: 'white',
                    backgroundColor: '#4F46E5',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 20px',
                    fontSize: '15px',
                    borderRadius: '15px',
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    marginRight: '10px',
                    fontSize: '20px',
                    marginLeft: '20px',
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    fontSize: '20px',
                  }}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

