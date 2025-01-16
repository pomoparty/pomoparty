import { Outlet } from "react-router-dom";
import "./App.scss";
import { Topbar } from "./components/Topbar/Topbar";

function App() {

  return (
    <div className="app-container">
      <Topbar />
      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
