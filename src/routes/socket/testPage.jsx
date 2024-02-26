import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io("http://localhost:3000");

export default function SocketTestPage() {
  const [gameRooms, setGameRooms] = useState([]);

  useEffect(()=>{
    socket.on("gameRooms",(rooms) => {
        setGameRooms(rooms);
    });

    return () => {
        socket.off("gameRooms");
    }
  }, []);

  const createRoom = () => {
    const roomName = prompt("Enter room name:");
    const roomPassword = prompt("Enter room password(optional):");
    const roomLevel = prompt("Enter room level:");
    const roomAlgorithm = prompt("Enter room algorithm:");
    const player1Id = "123";
    socket.emit("createRoom",{
        roomName,
        roomPassword,
        roomLevel,
        roomAlgorithm,
        player1Id,
    });
  };

  const leaveRoom = (index) => {
    socket.emit("leaveRoom", index);
  };

  return (
    <div>
      <h1>Game Rooms</h1>
      <button onClick={()=>createRoom()}>Create Room</button>
      <ul>
        {gameRooms.map((room, index) => (
          <li key={index}>
             * 방 이름 : {room.name}
             * 방 레벨 : {room.level}
             * 방 알고리즘 : {room.algorithm}
             * 방장 : {room.player1}
             <button onClick={() => leaveRoom(index)}>Leave Room</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
