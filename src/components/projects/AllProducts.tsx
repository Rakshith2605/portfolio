"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { productsData } from "@/components/projects/ProductsData";

export default function AllProducts() {
  const cards = productsData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full pt-8">
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        My Products
      </h2>
      <Carousel items={cards} />
    </div>
  );
} 