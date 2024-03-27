import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminHome from '@/pages/admin/home';
import UserHome from '@/pages/user/home';

export default function Home() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole === 'user') {
      setRole('user');
    } else {
      setRole('admin');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Concerts App</title>
      </Head>
      {role === 'user' ? <UserHome /> : <AdminHome />}
    </>
  );
}
