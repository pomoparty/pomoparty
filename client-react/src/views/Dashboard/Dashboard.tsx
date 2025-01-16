import { formatTime } from "../../util";
import { useTimer } from '../../contexts/TimerContext';
import './Dashboard.scss';
import { useEffect } from "react";

export const Dashboard = () => {

  const { timer, toggleTimer, socket, running } = useTimer();

  // useEffect(() => {
  //   console.log(timer);
  // }, [timer]);

  return (
    <div className="container">
      <h1> FOCUS </h1>
      <div className="timer">{formatTime(timer || 0)}</div>
      <button className="play-button" onClick={toggleTimer}>
          {running ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
      </button>

      <section>
        <h3> DEBUG </h3>
        <button onClick={()=>socket?.emit("create", "night")}>create</button>
        <button onClick={()=>socket?.emit("join", "night")}>join</button>
      </section>
    </div>
  );
}
