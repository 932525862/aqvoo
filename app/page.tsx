import Navbar from "@/components/Navbar";
import Story from "@/components/Story";
import Catalog from "@/components/Catalog";
import Packaging from "@/components/Packaging";
import Delivery from "@/components/Delivery";
import Reveals from "@/components/Reveals";
import FlyPacks from "@/components/FlyPacks";
import { Footer, Order } from "@/components/Order";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Story />
        <Catalog />
        <Packaging />
        <Delivery />
        <Order />
      </main>
      <Footer />
      <Reveals />
      <FlyPacks />
    </>
  );
}
