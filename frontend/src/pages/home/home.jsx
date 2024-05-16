import HeroSection from "../../components/homeComponents/heroSection/heroSection";

import Footer from "../../components/footer/footer";
import FindYourFriend from "../../components/homeComponents/findYourFriend/findYourFriend";
import AdoptionProcess from "../../components/homeComponents/adoptionProcess/adoptionProcess";
import Petshop from "../../components/homeComponents/petshop/petshop";
import Slider from "../../components/homeComponents/slider/slider";
import Video from "../../components/homeComponents/video/video";
import Shopcard from "../../components/shopcard/shopcard";
import "../../index.css";
import PetHostel from "../petHostel/PetHostel";
import Homestay from "../../components/homeComponents/homestay/Homestay";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FindYourFriend />
      <AdoptionProcess />
      <Homestay />
      {/* <PetHostel /> */}
      <Petshop />
      <Slider />
      <Video />
      <Footer />
    </>
  );
}
