import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import TrustedCompanies from "@/components/TrustedCompanies";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <Hero />
      <Categories />
      <FeaturedBusinesses />
      <TrustedCompanies />
      <Footer />
    </div>
  );
};

export default Index;
