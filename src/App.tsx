import AddTimer from "./components/AddTimer.tsx";
import Header from "./components/Header.tsx";
import TimersContextProvider from "./components/store/timers-context";
import Timers from "./components/Timers.tsx";

function App() {
  return (
    <TimersContextProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimersContextProvider>
  );
}

export default App;
