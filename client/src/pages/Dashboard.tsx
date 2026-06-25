

import NavBar from "../components/NavBar";
import { Sidebar } from "../components/Sidebar";


const Dashboard = () => {

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <div>
        <NavBar/>
      </div>
      <div className="">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
