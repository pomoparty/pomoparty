import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import "./App.scss";
import { Topbar } from "./components/Topbar/Topbar";
import { formatTime } from "./util";

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const sock = io("http://localhost:3000");
    setSocket(sock);

    sock.on("create", (_) => {
      console.log("received create");
    });
    sock.on("join", (_) => {
      console.log("received join");
    });
    sock.on("start-timer", (time) => {
      console.log("received start-timer");
      setStartTime(time);
      setRunning(true);
    });
    sock.on("stop-timer", (_) => {
      console.log("received stop-timer");
      setRunning(false);
    });

    return () => {
      sock.disconnect();
    };
  }, []);

  const [timer, setTimer] = useState<number>();
  const [startTime, setStartTime] = useState<number>();
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if(!running || !startTime) return;
      setTimer(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  });

  const startTimer = () => {
    setStartTime(Date.now());
    setRunning(true);

    socket?.emit("start-timer", Date.now());
  }

  const stopTimer = () => {
    setRunning(false);
    socket?.emit("stop-timer")
  }

  return (
    <div className="app-container">
      <Topbar />
      <div className="timer">{formatTime(timer || 0)}</div>
      <button onClick={()=>socket?.emit("create", "night")}>create</button>
      <button onClick={()=>socket?.emit("join", "night")}>join</button>
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default App;
