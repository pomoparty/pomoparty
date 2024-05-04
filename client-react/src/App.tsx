import { Outlet } from "react-router-dom"
import "./App.scss";
import { Topbar } from "./components/Topbar/Topbar";

function App() {
  return (
    <div className="app-container">
      <Topbar />
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default App
