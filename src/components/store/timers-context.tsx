import { time } from "console";
import { type ReactNode, createContext, useContext, useReducer } from "react";
// create context is generic type
export type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimerState = {
  isRunning: true,
  timers: [],
};
type TimersContextValue = TimerState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};
const TimersContext = createContext<TimersContextValue | null>(null);
// start with use with name for custom hoooks: function must only called directly inside the fucntion
export function useTimerContext() {
  const timersCtx = useContext(TimersContext);
  if (timersCtx === null) {
    throw new Error("timercontext is null - that should not be the case !");
  }
  return timersCtx;
}

type TimersContextProviderProps = {
  children: ReactNode;
};
type StartTimerAction = {
  type: "START_TIMERS";
};
type StopTimerAction = {
  type: "STOP_TIMERS";
};
type AddTimerAction = {
  type: "ADD_TIMERS";
  payload: Timer;
};
type Action = StartTimerAction | StopTimerAction | AddTimerAction;
// current state , action that dispatched
function timersReducer(state: TimerState, action: Action): TimerState {
  if (action.type === "START_TIMERS") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMERS") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD_TIMERS") {
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  return state;
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  // array diststuring
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMERS", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "STOP_TIMERS" });
    },
    stopTimers() {
      dispatch({ type: "START_TIMERS" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
