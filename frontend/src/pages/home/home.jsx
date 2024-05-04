import HeroSection from "../../components/homeComponents/heroSection/heroSection"

import Footer from "../../components/footer/footer";
import FindYourFriend from "../../components/homeComponents/findYourFriend/findYourFriend"
import AdoptionProcess from "../../components/homeComponents/adoptionProcess/adoptionProcess"
import Slider from "../../components/homeComponents/slider/slider"
import Video from "../../components/homeComponents/video/video"
import "../../index.css"
export default function Home() {
  return (
    <>
      <HeroSection />
      < FindYourFriend />
      <AdoptionProcess />
      < Slider />
      <Video />
      <Footer />
    </>
  );
}
