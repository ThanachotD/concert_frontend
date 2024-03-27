import Layout from "@/components/layout";
import Card from "@/components/ui/card/index";
import CreateForm from "@/components/form";

export default function HomePage() {
  const MockConcert = {
      type:"Delete",
      name:"BlackPink",
      description:"Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.",
      total: 490
  }
  return (
      <Layout role="user">
        <div className="flex flex-col gap-4">
          <Card data={MockConcert}/>
        </div>
      </Layout>
  );
}
