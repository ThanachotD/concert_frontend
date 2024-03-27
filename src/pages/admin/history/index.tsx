import Layout from "@/components/layout";
import Table from "@/components/ui/table";

export default function HistoryPage() {
  const columns = ['No.', 'Name', 'Job', 'Action'];
  const data = [
    { no: '1', name: 'Cy Ganderton', job: 'Quality Control Specialist',action:"cancel" },
    { no: '2', name: 'Hart Hagerty', job: 'Desktop Support Technician',action:"reserve" },
    { no: '3', name: 'Brice Swyre', job: 'Tax Accountant', action:"reserve" },
  ];
  return (
      <Layout role="admin">
        <Table columns={columns} data={data.map(row => ({...row} ))} />
      </Layout>
  );
}
