// components/Layout.js
import Sidebar from './sidebar';

const Layout = ({ children,role}:any) => {
  return (
    <div className="flex">
      <Sidebar role={role}/>
      <div className="flex-1 p-10 bg-gray-50 w-full h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
