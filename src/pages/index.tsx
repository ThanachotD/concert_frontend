import Head from 'next/head';
import Sidebar from '@/components/layout/sidebar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Concerts App</title>
      </Head>
      <main className='bg-gray-100 w-full h-screen'>
        <Sidebar role="admin"/>
        
      </main>
    </>
  );
}
