import { Hero } from "../components/Hero";
import NavBar from "../components/NavBar";
import { Sidebar } from "../components/Sidebar";


const Dashboard = () => {

  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col dark:bg-[#202124]">
      <div className="">
        <NavBar/>
      </div>
      <div className="flex flex-row ">
        <Sidebar />
      <div className="lg:h-96 w-2/3"><Hero /></div>
      </div>
    </div>
  );
};

export default Dashboard;
