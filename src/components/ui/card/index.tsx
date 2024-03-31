import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BASE_PATH } from '@/utils';

interface CardProps {
  data: InfoConcert;
  userId: number;
}

interface InfoConcert {
  type?: string;
  Id: number;
  ConcertName: string;
  TotalSeats: number;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  isReservedByUser?: boolean;
}

const Card = ({ data, userId}: CardProps) => {
const [concertInfo, setConcertInfo] = useState<InfoConcert>(data);

const handleDelete = async () => {
    try {
        const response = await fetch(BASE_PATH+'concert/'+concertInfo?.Id.toString(), {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            await response.json();
            alert("Concert is deleted successfully!");
        } else {
            alert("Failed to deleted concert. Server responded with error.");
        }
    } catch (error) {
      alert("Failed to deleted concert. Network error.");
    }
  };

const handleReserve = async () => {
    try {
      const response = await fetch(BASE_PATH+'reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
        "userId": userId,
        "concertId": concertInfo.Id,
        "NumberOfSeats": 1,
        "Type":"Reserve"
      }),
      });
      if (response.ok) {
        await response.json();
        alert("Concert saved successfully!");
      } else {
        alert("Failed to save concert. Server responded with error.");
      }
    } catch (error) {
      alert("Failed to save concert. Network error.");
    }
  };

  useEffect(() => {
    const handleReservation = async () => {
      const response = await fetch(BASE_PATH+'reserve', {
          method: 'GET', // Adjusted to use URL path parameters
          headers: {
            'Content-Type': 'application/json',
          },
      });

        if (response.ok) {
          const reserved = await response.json(); // Assuming the backend sends back a boolean
          reserved.map((item:any)=>{
          if(item.user?.Id==userId){
              setConcertInfo({ ...concertInfo, isReservedByUser: true });
            }
          })
        }
    };

    handleReservation();
  }, [userId, concertInfo.Id]); // Dependencies
    return (
      <div className="card w-full bg-base-100 shadow-sm rounded">
          <div className="card-body">
              <h2 className="card-title text-sky-500">{data.ConcertName}</h2>
              <p className="border-t-2 border-gray-100 pt-4 pb-2">{data.Description}</p>
              <div className="card-actions flex justify-between items-center">
                  <div className="flex direction-row gap-2 items-center">
                      <CiUser className="text-xl"/>
                      <div>{typeof data.TotalSeats === 'number' ? data.TotalSeats.toString() : data.TotalSeats}</div>
                  </div>
                  { data.type == "DELETE" ? (
                      <button 
                          className="btn btn-error text-gray-50 rounded"
                          onClick={handleDelete}>
                          <MdDeleteOutline className="text-xl"/>
                          {data.type}
                      </button>
                  ) : concertInfo.isReservedByUser ? (
                      <button
                          className="btn btn-error text-gray-50 rounded"
                          >
                        Cancel
                      </button>
                  ) : (
                      <button
                          className="btn bg-sky-500 text-gray-50 rounded"
                          onClick={handleReserve}>
                        Reserve
                      </button>
                  )}
              </div>
          </div>
      </div>
    );
}

export default Card;
