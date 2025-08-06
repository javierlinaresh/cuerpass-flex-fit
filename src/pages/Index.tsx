import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Categories from "@/components/Categories";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import TrustedCompanies from "@/components/TrustedCompanies";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <Hero />
      <BenefitsSection />
      <HowItWorksSection />
      <Categories />
      <FeaturedBusinesses />
      <TrustedCompanies />
      <Footer />
    </div>
  );
};

export default Index;
