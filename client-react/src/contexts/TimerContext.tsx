import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from 'socket.io-client';

interface TimerContextValue {
    timer: number;
    socket: Socket | undefined;
    startTimer: () => void;
    stopTimer: () => void;
}

const TimerContext = createContext<TimerContextValue | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}

export const TimerProvider = ({ children}: { children: ReactNode }) => {
  const [timer, setTimer] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const sock = io("http://localhost:3000"); // TODO: move to env variable
    setSocket(sock);

    // TODO: Remove console.log on events
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

  useEffect(() => {
    const interval = setInterval(() => {
      if(!running || !startTime) return;
      setTimer(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
    <TimerContext.Provider value={{ timer, startTimer, stopTimer, socket }}>
      {children}
    </TimerContext.Provider>
  );
}
