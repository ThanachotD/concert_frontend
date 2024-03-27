import { ReactElement, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { FcMenu } from "react-icons/fc";
import { FiHome } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { TbSwitchVertical } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

interface SidebarItemProps {
  onClick: () => void;
  label: string;
  icon: ReactElement;
}

interface SidebarProps {
  role: 'user' | 'admin';
}

const SidebarItem: React.FC<SidebarItemProps> = ({ onClick, label, icon }) => (
  <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-50 text-gray-900" onClick={onClick}>
    {icon} {/* Display the icon */}
    <span className="text-[15px] ml-4">{label}</span>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className={`fixed top-0 bottom-0 lg:left-0 w-[200px] overflow-y-auto text-center bg-white ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col h-screen justify-between">
          <div>
            <div className="text-gray-900 text-xl p-2.5 mt-1 pl-5 flex items-center pb-2">
              <h1 className="font-bold text-[30px] ml-3">{role === 'admin' ? 'Admin' : 'User'}</h1>
              <BiX className="cursor-pointer ml-auto lg:hidden" onClick={toggleSidebar} />
            </div>
            {/* Common Items */}
            {role === 'admin' && <SidebarItem label="Home" icon={<FiHome />} onClick={toggleSidebar} />}
            {role === 'admin' && <SidebarItem label="Profile" icon={<GoHistory />} onClick={toggleSidebar} />}
            <SidebarItem label={role === 'admin' ? "Switch to User" : "Switch to Admin"} icon={<TbSwitchVertical />} onClick={toggleSidebar} />
          </div>
          <div className='mb-4'>
            <SidebarItem label="Logout" icon={<IoIosLogOut />} onClick={toggleSidebar} />
          </div>
        </div>
      </div>
      <div className={`p-8 left-0 fixed text-xl text-gray-900 ${isSidebarOpen ? 'hidden' : 'block'}`}>
        <FcMenu className="cursor-pointer text-blue-600" onClick={toggleSidebar} />
      </div>
    </>
  );
};

export default Sidebar;
