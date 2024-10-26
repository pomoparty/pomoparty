import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import "./App.scss";
import { Topbar } from "./components/Topbar/Topbar";

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
    <div className="app-container">
      <Topbar />
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default App;
