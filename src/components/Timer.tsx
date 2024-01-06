import Container from "./UI/Container.tsx";
import { useState, useEffect, useRef } from "react";
import {
  useTimerContext,
  type Timer as TimerProps,
} from "./store/timers-context.tsx";

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimerContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 50);
      }, 50);
      interval.current = timer;
    } else if (!isRunning && interval.current) {
      clearInterval(interval.current);
    }
    return () => clearInterval(timer);
  }, [isRunning]);
  // empty arry got no dependency, code only run once even after rerender and reexecute

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
        djkh
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
