import { useTimerContext } from "./store/timers-context";
import Timer from "./Timer.tsx";

export default function Timers() {
  const { timers } = useTimerContext();
  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.name}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
}
