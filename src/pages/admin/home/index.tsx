import React, { useState, useEffect, useCallback } from 'react';
import Layout from "@/components/layout";
import Card from "@/components/ui/card";
import CreateForm from '@/components/form';
import { FiUser } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import DefaultCard from "@/components/ui/statiscard";
import { IoIosCloseCircleOutline } from "react-icons/io";
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

interface Reservation {
  Id: number;
  UserId: number;
  ConcertId: number;
  NumberOfSeats: number;
  Type: "RESERVE" | "CANCEL";
}

interface DashboardData {
  totalSeats: number;
  totalReservations: number;
  cancellations: number;
}

interface User {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
}

export default function HomePage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData>({ totalSeats: 0, totalReservations: 0, cancellations: 0 });
  const [user, setUser] = useState<User | null>(null); // User state
  
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch( BASE_PATH+'user');
      if (!response.ok) throw new Error('User data could not be fetched!');
      const userData: User = await response.json();
      if (userData.Role === "user") {
        setUser(userData); // Set user state if Role is "user"
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const fetchConcertsAndReservations = useCallback(async () => {
    try {
      const concertsResponse = await fetch( BASE_PATH+'concert');
      const reservationsResponse = await fetch( BASE_PATH+'reserve');
      
      if (!concertsResponse.ok || !reservationsResponse.ok) throw new Error('Data could not be fetched!');

      const concertsData: Concert[] = await concertsResponse.json();
      const reservationsData: Reservation[] = await reservationsResponse.json();

      // Processing concerts data
      let Seats = concertsData.reduce((acc, concert) => acc + concert.TotalSeats, 0);

      // Processing reservations data
      const totalReservations = reservationsData.length;
      const cancellations = reservationsData.filter(reservation => reservation.Type === "CANCEL").length;
      const totalSeats = Seats+ totalReservations+cancellations
      setConcerts(concertsData.map(concert => ({ ...concert, type: "DELETE" })));
      setDashboard({ totalSeats, totalReservations, cancellations });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchConcertsAndReservations();
    fetchUserData();
  }, [fetchConcertsAndReservations]);

  return (
    <Layout role="admin">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 w-full">
          <DefaultCard totalSeats={dashboard.totalSeats} description={"Total of seats"} icon={<FiUser/>} color={"bg-blue-500"} />
          <DefaultCard totalSeats={dashboard.totalReservations} description={"Reserve"} icon={<CiBookmark/>} color={"bg-emerald-500"} />
          <DefaultCard totalSeats={dashboard.cancellations} description={"Cancel"} icon={<IoIosCloseCircleOutline/>} color={"bg-rose-500"} />
        </div>
        <div role="tablist" className="tabs gap-4  w-64">

        </div>
        <div role="tablist" className="tabs tabs-bordered">
          <input type="radio" name="my_tabs_1" role="tab" className="tab border-b-2 border-gray-50" aria-label="Overview" />
          <div role="tabpanel" className="tab-content pt-4">
            {concerts.map((concert) => (
               <Card key={concert.Id} data={concert as Concert} userId={user ? user.Id : 0} />
            ))}
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className="tab border-b-2 border-gray-50" aria-label="Create" checked />
          <div role="tabpanel" className="tab-content pt-4">
            <CreateForm/>
          </div>
        </div>
      </div>
    </Layout>
  );
}
