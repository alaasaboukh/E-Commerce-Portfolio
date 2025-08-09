import BenefitsBanner from "@/components/library/BenefitsBanner";
import CategorySlider from "@/components/products/CategorySlider";
import LandingPage from "@/components/heroSection/LandingPage";
import Navbar from "@/components/layout/Navbar";
import NewArrival from "@/components/products/NewArrival";
import Products from "@/components/products/Products";


export default function Home() {
    return (
        <>
        <Navbar />
        <LandingPage />
        <Products />
        <CategorySlider />
        <NewArrival />
        <BenefitsBanner />
        </>
      );
    }

