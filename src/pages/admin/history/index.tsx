import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout";
import Table from "@/components/ui/table";
import { BASE_PATH } from '@/utils';

interface HistoryData {
  ReserveDate: string;
  UserName: string;
  Concert: string;
  Type: string;
}

export default function HistoryPage() {
  const columns = ['ReserveDate', 'UserName', 'Concert', 'Type'];
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reserveResponse = await fetch(BASE_PATH+'reserve');
        if (!reserveResponse.ok) {
          throw new Error(`HTTP error! status: ${reserveResponse.status}`);
        }
        const reserves = await reserveResponse.json();

        // Assuming `reserves` is an array of reservations
        const enrichedDataPromises = reserves.map(async (reserve: any) => {
          // Fetch user data
          const userResponse = await fetch(BASE_PATH+'user');
          let userData = await userResponse.json();
          userData = userData.filter((item: { Role: string; })=>item.Role="user")
          // Fetch concert data
          const concertResponse = await fetch(BASE_PATH+'concert');
          const concertData = await concertResponse.json();

          let concertOne = concertData.filter((item:any)=>reserve.concert.Id == item.Id)
          return {
            ReserveDate: reserve.ReserveDate,
            UserName: userData[0].FirstName + " " + userData[0].LastName,
            Concert:concertOne[0].ConcertName,
            Type: reserve.Type,
          };
        });

        const resultData = await Promise.all(enrichedDataPromises);
        setHistoryData(resultData);
      } catch (error) {
        console.error("Could not fetch history data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout role="admin">
      <Table columns={columns} data={historyData as []} />
    </Layout>
  );
}
