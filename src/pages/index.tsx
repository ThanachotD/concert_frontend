import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminHome from '@/pages/admin/home';
import UserHome from '@/pages/user/home';
import UserCreationForm from '@/components/ui/UserCreationForm';
import { BASE_PATH } from '@/utils';

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(BASE_PATH+'user', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to fetch the user role');
        const data = await response.json();
        if (data) {
          setRole(data.Role);
        } else {
          setShowForm(true);
        }
      } catch (error) {
        setShowForm(true);
      }
    };

    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    } else {
      fetchUserRole();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Concerts App</title>
      </Head>
      {showForm ? (
        // Render the form to create a user if no user data is found
        <UserCreationForm onUserCreated={(userRole) => {
          setRole(userRole);
          setShowForm(false); // Hide form once the user is created
        }} />
      ) : (
        // Render the main content based on the user's role
        role === 'user' ? <UserHome /> : <AdminHome />
      )}
    </>
  );
}
