import Layout from "@/components/layout";
import Card from "@/components/ui/card"
import CreateForm from '@/components/form';
import { FiUser } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import DefaultCard from "@/components/ui/statiscard";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function HomePage() {
  const MockConcert = {
      type:"Delete",
      name:"BlackPink",
      description:"Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.",
      total: 490
  }
  return (
    <Layout role="admin">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 w-full">
          <DefaultCard totalSeats={500} description={"Total of seats"} icon={<FiUser/>} color={"bg-blue-500"} />
          <DefaultCard totalSeats={120} description={"Reserve"} icon={<CiBookmark/>} color={"bg-emerald-500"} />
          <DefaultCard totalSeats={12} description={"Cancel"} icon={<IoIosCloseCircleOutline/>} color={"bg-rose-500"} />
        </div>
        <div role="tablist" className="tabs gap-4  w-64">

        </div>
        <div role="tablist" className="tabs tabs-bordered">
          <input type="radio" name="my_tabs_1" role="tab" className="tab border-b-2 border-gray-50" aria-label="Overview" />
          <div role="tabpanel" className="tab-content pt-4">
            <Card data={MockConcert}/>
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
