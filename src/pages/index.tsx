import Head from 'next/head';
import Layout from '@/components/layout/layout';
import { FcMenu } from "react-icons/fc";
import { ReactElement, useState } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <>
      <Head>
        <title>Concerts App</title>
      </Head>
      <Layout role="admin">
        <h1>Welcome to the Dashboarssssd</h1>
      </Layout>
    </>
  );
}
