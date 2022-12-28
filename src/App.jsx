
// // import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore, collection, addDoc,
//   getDocs, doc, onSnapshot, query,
//   serverTimestamp, orderBy, deleteDoc, updateDoc
// } from "firebase/firestore";

// import "./App.css";

// // Configuration of app
// const firebaseConfig = {
//   apiKey: "AIzaSyAgE4vW13-yqGnnfnutng3g2tYaTo18UQg",
//   authDomain: "fir-firestore-db-154ab.firebaseapp.com",
//   projectId: "fir-firestore-db-154ab",
//   storageBucket: "fir-firestore-db-154ab.appspot.com",
//   messagingSenderId: "262657503417",
//   appId: "1:262657503417:web:549906d8e1445ef68ceb68"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);


// function App() {

//   //state variables or stateful components

//   const [postText, setPostText] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [isEditing, setIsEditing] = useState(false);
//   const [editing, setEditing] = useState({
//     editingId: null,
//     editingText: ""
//   })


//   useEffect(() => {

//     // this is to get data only once. Afterwards, it is not used/stopped.
//     const getData = async () => {
//       const querySnapshot = await getDocs(collection(db, "posts"));
//       querySnapshot.forEach((doc) => {

//         // setPosts([...posts, doc.data()])  this method or below mentioned 2 liner code
//         setPosts((prev) => {

//           let newArray = [...prev, doc.data()];
//           return newArray;

//         });

//       });
//     }
//     // getData();

//     // this is to get real time data
//     let unsubscribe = null;
//     const getRealTimeData = async () => {

//       const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));
//       unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const posts = [];
//         querySnapshot.forEach((doc) => {
//           // posts.unshift(doc.data());
//           // posts.push(doc.data());

//           // Either This Method
//           // posts.push({...doc.data(), id: doc.id});

//           // Or This Method
//           let data = doc.data();
//           data.id = doc.id;
//           posts.push(data);
//         });
//         setPosts(posts);
//       });
//     }

//     getRealTimeData();

//     // Cleanup function / After leaving work or having a break, work is also stopped/aborted
//     return () => {
//       unsubscribe();
//     }
//   }, []);

//   // when typed on keyboard and post button is clicked, this function runs and send data to firebase firestore "posts" collection
//   const savePost = async (e) => {
//     e.preventDefault();

//     try {
//       const docRef = await addDoc(collection(db, "posts"), {
//         text: postText,
//         // createdOn: new Date().getTime(),
//         createdOn: serverTimestamp(),
//       });
//     }
//     catch (e) {
//     }

//   };

//   const deletePost = async (postId) => {
//     await deleteDoc(doc(db, "posts", postId));
//   }

//   // const updatePost = async (postId, updatedText) => {

//   //   await updateDoc(doc(db, "posts", postId), {
//   //     text: updatedText
//   //   });
//   // }
//   const updatePost = async (e) => {
//     e.preventDefault();

//     await updateDoc(doc(db, "posts", editing.editingId), {
//       text: editing.editingText
//     });

//     setEditing({
//       editingId: null,
//       editingText: ""
//     })

//   }

//   return (

//     <form onSubmit={savePost}>

//       <div className="searchBar">

//         <textarea id="postBox" onChange={(e) => { setPostText(e.target.value) }}
//           type="text" className="searchTerm" placeholder="What's in your mind..." />

//         <button type="submit" className="searchButton"> Post..! </button>

//       </div>

//       {(isLoading) ? "loading..." : ""}

//       {posts.map((eachPost, i) => (
//         <div className="post" key={i}>

//           {/* <h1 className="postHead">{(eachPost.isEditing) ? <input type="text" /> : eachPost?.text} </h1> */}
//           <h3 className="postHead" href={eachPost?.url} target="_blank" rel="noreferrer">
//             {(eachPost.id === editing.editingId) 
//             ?
//               <form onSubmit={updatePost}>

//                 <input type="text" value={editing.editingText}
//                   onChange={(e) => { setEditing({ ...editing, editingText: e.target.value }) }}
//                   placeholder="please enter updated value" />

//                 <button type="submit">Update</button>
//               </form>
//               :
//               eachPost?.text}
//           </h3>
//           <span className="date">
//             {moment((eachPost?.createdOn?.seconds)
//               ?
//               eachPost?.createdOn?.seconds * 1000
//               :
//               undefined)
//               .format("MMMM Do YYYY, h:mm a")}
//           </span>

//           <br />
//           <button className="delBtn"
//             onClick={() => { deletePost(eachPost?.id) }}
//           >Delete</button>

//           <button className="editBtn" onClick={() => {

//             const updatedState =
//               posts.map(eachItem => {
//                 if (eachItem.id === eachPost?.id) {
//                   return { ...eachItem, isEditing: !eachItem.isEditing }
//                 }
//                 else {
//                   return eachItem
//                 }
//               })

//             setPosts([updatedState])

//           }}>Edit</button>

//         </div>
//       ))}

//     </form>
//   );
// }
// export default App;


import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import { initializeApp } from "firebase/app";

import {
  getFirestore, collection, addDoc,
  getDocs, doc, onSnapshot, query,
  serverTimestamp, orderBy, deleteDoc, updateDoc
} from "firebase/firestore";

import './App.css';

// Configuration of app
const firebaseConfig = {
  apiKey: "AIzaSyAgE4vW13-yqGnnfnutng3g2tYaTo18UQg",
  authDomain: "fir-firestore-db-154ab.firebaseapp.com",
  projectId: "fir-firestore-db-154ab",
  storageBucket: "fir-firestore-db-154ab.appspot.com",
  messagingSenderId: "262657503417",
  appId: "1:262657503417:web:549906d8e1445ef68ceb68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



function App() {

  //state variables or stateful components
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState({ editingId: null, editingText: "" })


  useEffect(() => {

    // this is to get data only once. Afterwards, it is not used/stopped.
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());

        setPosts((prev) => {
          let newArray = [...prev, doc.data()];
          return newArray
        });

      });
    }
    // getData();

    let unsubscribe = null;
    // this is to get real time data
    const getRealtimeData = async () => {

      const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          // posts.unshift(doc.data());
          // posts.push(doc.data());

          posts.push({ id: doc.id, ...doc.data() });

        });

        setPosts(posts);
        console.log("posts: ", posts);
      });

    }
    getRealtimeData();

    // Cleanup function / After leaving work or having a break, work is also stopped/aborted
    return () => {
      // console.log("Cleanup function");
      unsubscribe();
    }
  }, [])

  // when typed on keyboard and post button is clicked, 
  // this function runs and send data to firebase firestore "posts" collection
  const savePost = async (e) => {
    e.preventDefault();

    console.log("postText: ", postText);

    try {

      const docRef = await addDoc(collection(db, "posts"), {
        text: postText,
        // createdOn: new Date().getTime(),
        createdOn: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }


  }

  const deletePost = async (postId) => {
    // console.log("postId: ", postId);
    await deleteDoc(doc(db, "posts", postId));
  }

  const updatePost = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "posts", editing.editingId), { text: editing.editingText });

    setEditing({ editingId: null, editingText: "" })
  }


  return (
    <div>
      
      <div className="searchBar">
        <form onSubmit={savePost}>

          <textarea className="postBox" maxLength="80" type="text" placeholder="What's in your mind..."
            onChange={(e) => { setPostText(e.target.value) }} />

          <br />
          <button type="submit" className="searchBtn">Post..!</button>

        </form>
      </div>


      <div>
        {(isLoading) ? "loading..." : ""}

        {posts.map((eachPost, i) => (
          <div className="post" key={i}>

            <h3 className="postHead" href={eachPost?.url}
              target="_blank" rel="noreferrer">

              {(eachPost.id === editing.editingId) ?
                <form onSubmit={updatePost}>

                  <input className="editBox" type="text" value={editing.editingText}
                    onChange={(e) => {
                      setEditing({ ...editing, editingText: e.target.value })
                    }}
                    maxLength="80" placeholder="please enter updated value" />

                  <button className="updateBtn" type="submit">Update</button>
                </form>
                :
                eachPost?.text}
            </h3>

            <span className="date">{moment((eachPost?.createdOn?.seconds) ?
              eachPost?.createdOn?.seconds * 1000 : undefined).format('Do MMMM, h:mm a')
            }</span>

            <br />
            <button className="delBtn"
              onClick={() => { deletePost(eachPost?.id) }}
            >Delete</button>

            {(editing.editingId === eachPost?.id) ? null :

              <button className="editBtn"
                onClick={() => { setEditing({ editingId: eachPost?.id, editingText: eachPost?.text }) }}
              >Edit</button>
            }

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;