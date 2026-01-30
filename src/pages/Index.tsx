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
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="bg-neutral-900">
        <BenefitsSection />
      </div>
      <HowItWorksSection />
      <div className="bg-neutral-900">
        <Categories />
      </div>
      <FeaturedBusinesses />
      <div className="bg-neutral-900">
        <TrustedCompanies />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
