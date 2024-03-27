import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiMenu } from 'react-icons/fi';
import { GoHistory } from 'react-icons/go';
import { TbSwitchVertical } from 'react-icons/tb';
import { IoIosLogOut, IoIosClose } from 'react-icons/io';

const navigation = [
  { name: 'Home', href: '/', icon: <FiHome/> },
  { name: 'History', href: '/history', icon: <GoHistory/> },
  { name: 'Switch to user', href: '/users', icon: <TbSwitchVertical/> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="text-2xl text-gray-500 absolute top-5 left-5 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoIosClose /> : <FiMenu />}
      </button>

      <div className={
      `fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      transition duration-200 ease-in-out md:translate-x-0 md:static md:flex md:flex-col 
      bg-white text-gray-900 w-[200px] z-30 justify-between h-full`
      }>
        <div>
          <div className="flex items-center justify-center h-20">
          <h1 className="text-2xl font-semibold">Admin</h1>
        </div>
        <nav className="flex flex-col p-4">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name} className="flex items-center p-2 my-2 transition-colors duration-200 justify-start hover:bg-blue-50 text-gray-900">
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
