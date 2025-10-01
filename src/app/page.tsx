import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
    <div className="bg-orange-50 h-[90vh]">
      <div className="container mx-auto px-4 py-40">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold  lg:text-6xl">
            Welcome to Pixel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-orange-500 hover:bg-orange-600">
              <Link href={"/products"}>Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Link href={"/categories"}>Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}
