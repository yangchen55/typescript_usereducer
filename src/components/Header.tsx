import Button from "./UI/Button.tsx";
import { useTimerContext } from "./store/timers-context.tsx";

export default function Header() {
  const timersCtx = useTimerContext();

  return (
    <header>
      <h1>ReactTimer</h1>
      <Button
        onClick={
          timersCtx.isRunning ? timersCtx.stopTimers : timersCtx.startTimers
        }
      >
        {" "}
        {timersCtx.isRunning ? "Stop" : "start"}Timers
      </Button>
    </header>
  );
}
