import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import "./App.scss";
import { Topbar } from "./components/Topbar/Topbar";

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const sock = io("http://localhost:3000");
    setSocket(sock);

    sock.on("create", (data) => {
      console.log("received create");
    });
    sock.on("join", (data) => {
      console.log("received join");
    });
    sock.on("start-timer", (data) => {
      console.log("received start-timer");
    });
    sock.on("stop-timer", (data) => {
      console.log("received stop-timer");
    });

    return () => {
      sock.disconnect();
    };
  }, []);
  return (
    <div className="app-container">
      <Topbar />
      <button onClick={()=>socket.emit("create", "night")}>create</button>
      <button onClick={()=>socket.emit("join", "night")}>join</button>
      <button onClick={()=>socket.emit("start-timer")}>start</button>
      <button onClick={()=>socket.emit("stop-timer")}>stop</button>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default App;
