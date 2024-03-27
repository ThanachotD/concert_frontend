import React from 'react';

interface CardProps {
  totalSeats: number;
  description: string;
  icon: JSX.Element;
  color:string;
}

const DefaultCard: React.FC<CardProps> = ({ totalSeats, description, icon,color }) => {
  return (
    <div className={`${color} w-full min-w-[48px] min-h-[144px] rounded-lg relative text-white flex flex-col items-center justify-center`}>
      <div className="icon text-2xl px-5">{icon}</div>
      <div className="px-5 py-1 text-sm flex items-center justify-center">
        {description}
      </div>
      <div>
        <p className="text-2xl font-meduim">{totalSeats}</p> 
      </div>
    </div>
  );
};

export default DefaultCard;
