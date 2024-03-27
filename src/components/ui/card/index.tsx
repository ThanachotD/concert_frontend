import { MdDeleteOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";

interface InfoConcert {
  type: string;
  name:string;
  description:string;
  total:Number;
}

const Card = ({ data }: { data: InfoConcert }) => {
  return (
    <div className="card w-full bg-base-100 shadow-sm rounded">
        <div className="card-body">
            <h2 className="card-title text-sky-500">{data.name}</h2>
            <p className="border-t-2 border-gray-100 pt-4 pb-2">{data.description}</p>
            <div className="card-actions flex justify-between items-center">
                <div className="flex direction-row gap-2 items-center">
                    <CiUser className="text-xl"/>
                    <div>{data.total.toString()}</div>
                </div>
                { data.type =="Delete" ? (
                <button className="btn btn-error text-gray-50 rounded">
                    <MdDeleteOutline className="text-xl"/>
                   {data.type}
                </button>
                ) : (
                    <button className="btn bg-sky-500 text-gray-50 rounded">
                        {data.type}
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};

export default Card;
