import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const sock = io("http://localhost:3333");
    setSocket(sock);
    sock.on("ping", (data) => {
      console.log(data);
    });

    return () => {
      sock.disconnect();
    };
  }, []);
  return (
    <>
      <h1> Pomoparty </h1>
      <button onClick={() => socket?.emit("yert")}>hi</button>
    </>
  );
}

export default App;
