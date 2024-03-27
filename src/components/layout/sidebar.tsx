import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiHome, FiMenu } from 'react-icons/fi';
import { GoHistory } from 'react-icons/go';
import { TbSwitchVertical } from 'react-icons/tb';
import { IoIosLogOut, IoIosClose } from 'react-icons/io';

// Define an interface for navigation items
interface NavigationItem {
  id: number;
  name: string;
  href: string;
  icon: JSX.Element;
}

// Define an interface for the Sidebar props
interface SidebarProps {
  role: 'user' | 'admin';
}

// Define the navigation items for user and admin
const navigationUser: NavigationItem[] = [
  { id: 3, name: 'Switch to Admin', href: '/admin/home', icon: <TbSwitchVertical/> },
];

const navigationAdmin: NavigationItem[] = [
  { id: 1, name: 'Home', href: '/admin/home', icon: <FiHome/> },
  { id: 2, name: 'History', href: '/admin/history', icon: <GoHistory/> },
  { id: 4, name: 'Switch to User', href: '/user/home', icon: <TbSwitchVertical/> },
];

const Sidebar = ({ role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  useEffect(() => {
    setNavigation(role === 'admin' ? navigationAdmin : navigationUser);
  }, [role]);

  return (
    <div>
      <button
        className="text-2xl text-gray-500 absolute top-5 left-10 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoIosClose /> : <FiMenu />}
      </button>

      <div className={
      `fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      transition duration-0 ease-in-out md:translate-x-0 md:static md:flex md:flex-col 
      bg-white text-gray-900 w-[200px] z-30 justify-between h-full`
      }>
        <div>
          <div className="flex items-center justify-center h-20">
            <h1 className="text-2xl font-semibold">{role.toUpperCase()}</h1>
          </div>
          <nav className="flex flex-col p-4">
            {navigation.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center p-2 my-2 transition-colors duration-200 justify-start hover:bg-blue-50 text-gray-900">
                  <span className="text-lg mr-2">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>              
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link href="/logout" className="flex items-center p-2 my-2 transition-colors duration-200 justify-start hover:bg-blue-50 text-gray-900">
              <span className="text-lg mr-2"><IoIosLogOut /></span>
              <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};

export default Sidebar;
