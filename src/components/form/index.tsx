import { useState } from 'react';
import { IoSaveOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { BASE_PATH } from '@/utils';

interface InfoConcert {
  name: string;
  description: string;
  total: number; 
}

const Card = () => {
  const [concertInfo, setConcertInfo] = useState<InfoConcert>({ name: '', description: '', total: 0 });

  const handleSave = async () => {

    try {
      const response = await fetch( BASE_PATH+'concert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        "ConcertName": concertInfo.name,
        "TotalSeats": concertInfo.total,
        "Description": concertInfo.description,
      }),
      });

      if (response.ok) {
        await response.json();
        alert("Concert saved successfully!");
        setConcertInfo({ name: '', description: '', total: 0 });
      } else {
        console.error("Server error:", response.status);
        alert("Failed to save concert. Server responded with error.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to save concert. Network error.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConcertInfo(prevState => ({
      ...prevState,
      [name]: name === 'total' ? parseInt(value, 10) || '' : value,
    }));
  };


  return (
     <div className="card w-full bg-base-100 shadow-sm rounded">
        <div className="card-body">
            <h2 className="card-title text-sky-500 text-2xl">Create</h2>
            <div className="card-actions flex justify-between items-center border-t-2 border-gray-100 pt-2">
                <div className="flex direction-row justify-between gap-4 w-full">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Concert Name</span>
                        </div>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Please input concert name" 
                          className="input input-bordered w-full rounded" 
                          value={concertInfo.name} 
                          onChange={handleChange}
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Total Seat</span>
                        </div>
                        <div className="input input-bordered flex items-center gap-2 rounded">
                            <input 
                              name="total"
                              className="grow" 
                              placeholder="Please input total seat" 
                              value={concertInfo.total.toString()} // Ensure total is a string for the input value
                              onChange={handleChange}
                            />
                            <CiUser/>
                        </div>
                    </label>
                </div> 
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea 
                      className="textarea textarea-bordered h-24 rounded" 
                      placeholder="Please Input description"
                      name="description" 
                      value={concertInfo.description} 
                      onChange={handleChange}
                    ></textarea>
                </label>
                <div></div>
                <div className="flex flex-row-reverse">
                     <button 
                       className="btn bg-sky-500 text-gray-50 rounded"
                       onClick={handleSave}
                     >
                        <IoSaveOutline className="text-xl"/>
                        Save
                     </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card;
