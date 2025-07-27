
import { useEffect,  } from 'react';
import {connectSocket , getSocket} from '../services/socket'
import { useSelector } from "react-redux";


import { io } from 'socket.io-client';
import { useState } from 'react';

let socket;




function NoticePage() {
    const user=useSelector((state) => state.auth.user);
  const [name,setName]=useState('');

    const deviceSocket=()=>{
        socket = io('http://localhost:8000', {
        auth: {name:name,groupName:'xxxx' },
        transports: ['websocket', 'polling'], // Enable fallback
        reconnectionAttempts: 3,
        withCredentials: true,
        autoConnect: true
      });
    }
    
//     useEffect(() => {
//         if(!user){
//               socket?.emit("join_room", { groupName: "room123" }); // Same name as server expects

//         }
// }, []);

    useEffect(()=>{

        // let socket;
        if(!user){
            deviceSocket();
        }else{
        //  socket = connectSocket(localStorage.getItem('token'));
        return ;
        }


        socket.on('connect', () => console.log('Socket connected!'));

        socket.on('receive_message', (newMessage) => {
    //   setMessages(prev => [...prev, newMessage]);

    console.log(newMessage);
    
    });
        // console.log("socket connected");
        // console.log(socket);
        // socket.on("hi",(data)=>{
        //     console.log(data);
            
        // })
        
        console.log("h");
        
        return () => {
      socket.disconnect();
    };
    },[name])


    const handleGroupIdChange = (e) => {
    setName(e.target.value);
  };


  const clickset=()=>{
    deviceSocket();
  }
    return<>
    <h1>Notice !</h1>
    <input
        type="text"
        value={name}
        onChange={handleGroupIdChange}
        placeholder="Group ID"
        className="w-full my-2 py-2 pl-10 text-sm text-gray-700 bg-white rounded-lg focus:outline-none border-1 border-red-100"
      />
     
    </>
}



export default NoticePage;