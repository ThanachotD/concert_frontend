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
  icon: ReactElement; // Type for icon prop
}

const SidebarItem: React.FC<SidebarItemProps> = ({ onClick, label, icon }) => (
  <div
    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-50 text-gray-900"
    onClick={onClick}>
    {icon} {/* Display the icon */}
    <span className="text-[15px] ml-4">{label}</span>
  </div>
);

const Sidebar = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDropdown = () => setIsSubmenuOpen(!isSubmenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[200px] overflow-y-auto text-center bg-white ${isSidebarOpen ? '' : 'hidden'}`}>
        <div className='flex flex-col'>
          <div className='justify-between'>
            <div className="text-gray-900 text-xl">
              <div className="p-2.5 mt-1 pl-5 flex items-center">
                <h1 className="font-bold text-[30px] ml-3">Admin</h1>
                <BiX className="cursor-pointer ml-auto lg:hidden" onClick={toggleSidebar} />
              </div>
            </div>
            {/* Sidebar Items */}
            <div className="flex flex-col justify-between h-full h-[900px]">
            <div>
              <SidebarItem label="Home" icon={<FiHome />} onClick={toggleDropdown} />
              <SidebarItem label="Profile" icon={<GoHistory />} onClick={toggleDropdown} />
              <SidebarItem label="Switch to User" icon={<TbSwitchVertical />} onClick={toggleDropdown} />
            </div>
              <SidebarItem label="Logout" icon={<IoIosLogOut/>} onClick={toggleDropdown} />
            </div>
          </div>
        </div>
      </div>

      <div className={`p-8 left-0 fixed text-xl text-gray-900 ${!isSidebarOpen ? '' : 'hidden'}`}>
        <FcMenu className="cursor-pointer text-blue-600" onClick={toggleSidebar} />
      </div>
    </>
  );
};

export default Sidebar;
