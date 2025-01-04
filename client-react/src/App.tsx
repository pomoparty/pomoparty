import { Outlet } from "react-router-dom";
import "./App.scss";
import { Topbar } from "./components/Topbar/Topbar";
import { formatTime } from "./util";
import { useTimer } from './contexts/TimerContext';

function App() {

  const { timer, startTimer, stopTimer, socket } = useTimer();

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
