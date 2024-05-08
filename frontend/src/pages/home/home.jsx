import HeroSection from "../../components/homeComponents/heroSection/heroSection"

import Footer from "../../components/footer/footer";
import FindYourFriend from "../../components/homeComponents/findYourFriend/findYourFriend"
import AdoptionProcess from "../../components/homeComponents/adoptionProcess/adoptionProcess"
import Petshop from "../../components/homeComponents/petshop/petshop";
import Slider from "../../components/homeComponents/slider/slider"
import Video from "../../components/homeComponents/video/video"
import Shopcard from "../../components/shopcard/shopcard";
import "../../index.css"
export default function Home() {
  return (
    <>
      <HeroSection />
      < FindYourFriend />
      <AdoptionProcess />
      <Petshop/>
      < Slider />
      <Shopcard />
      <Video />
      <Footer />
    </>
  );
}
