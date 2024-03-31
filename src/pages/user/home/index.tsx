import React, { useState, useEffect, useCallback } from 'react'; // Removed incorrect 'use' import
import Layout from "@/components/layout";
import Card from "@/components/ui/card/index";
import { BASE_PATH } from '@/utils';

interface Concert {
  Id: number;
  ConcertName: string;
  TotalSeats: number;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  type: string;
}

interface User {
  Id: number;
  Role: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
}

export default function HomePage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  const fetchConcertsAndUser = useCallback(async () => {
    try {
      // Fetch concerts
      const concertResponse = await fetch( BASE_PATH+'concert');
      if (!concertResponse.ok) throw new Error('Data could not be fetched!');
      const concertData: Concert[] = await concertResponse.json();
      const typedConcertData = concertData.map(concert => ({ ...concert, type: "RESERVE" }));
      setConcerts(typedConcertData);

      // Fetch user
      const userResponse = await fetch( BASE_PATH+'user');
      if (!userResponse.ok) throw new Error('User data could not be fetched!');
      const userData: User | User[] = await userResponse.json(); // Adjusted for potential array response

      // Handle both single and array user data responses
      let currentUser: User | undefined;

      if (Array.isArray(userData)) {
        // Find the first user with role "user" in the array
        currentUser = userData.find(u => u.Role === "user");
      } else if (userData.Role === "user") {
        // If a single user object is returned and the role is "user"
        currentUser = userData;
      }

      // Set user state if a user with role "user" is found
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchConcertsAndUser();
  }, [user]);

  // Rendering logic remains the same
  if(user){
    return (
      <Layout role={user.Role}>
        <div className="flex flex-col gap-4">
          {concerts.map((concert) => (
            <Card key={concert.Id} data={concert} userId={user.Id} />
          ))}
        </div>
      </Layout>
    );
  }
}
