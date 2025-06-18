import Table from "@/components/Table";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <div>
        <Header />
      </div>

      <div className="flex-1 h-full bg-white m-2">
        <Table />
      </div>
    </div>
  );
}
