import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;