import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
    <div className="bg-orange-50 min-h-[50vh] flex items-center">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
        <div className="text-center space-y-4 sm:space-y-6">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to Pixel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto block sm:hidden">
            Shop tech, fashion, and more with fast shipping.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto hidden sm:block">
            Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 bg-orange-500 hover:bg-orange-600">
              <Link href={"/products"}>Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8">
              <Link href={"/categories"}>Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}
