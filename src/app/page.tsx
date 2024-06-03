import Image from "next/image";
import Card from "./components/Card";
import Search from "./components/Search";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/Backgroundmain.jpg')] bg-cover">
      <Search/>
      <Card/>
    </main>
  );
}
