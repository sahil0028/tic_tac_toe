import { useEffect, useState } from "react";

const useSocket = () => {
    // const url= 'ws://localhost:8080';
    // const url= 'https://tictactoeback.vercel.app/';
    // const url= 'https://tictactoeback.netlify.app/';
    const url= 'https://tic-tac-toe-a8tv.onrender.com';
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen=()=>{
      console.log('connected');
      setSocket(ws);
    }

    ws.onclose=()=>{
      console.log('disconnected');
      setSocket(null);
    }

    return () => {
      ws.close();
    };
  }, []);
  return socket;
};

export default useSocket;
