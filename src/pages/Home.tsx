import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "@/components/ui/cards/ProductCard";
import {
  useAllProductsQuery,
  useCategoriesQuery,
} from "@/services/productsQuery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Home() {
  const { isPending, error, data } = useAllProductsQuery();
  const { data: categories } = useCategoriesQuery();
  console.log(categories);

  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <MaxWidthWrapper className="mt-8">
      <div className="flex w-full flex-col gap-6">
        {/* Best Offers */}

        <section className="flex flex-col gap-2">
          <div
            className={cn(
              buttonVariants({
                className: "max-w-min bg-yellow-500",
                variant: "secondary",
              })
            )}
          >
            Best Offers
          </div>
          <Carousel>
            <CarouselContent>
              {data.products.map((item: ProductData) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 "
                >
                  <Link to={`/products/${item.id}`}>
                    <Card>
                      <CardContent className="flex flex-col">
                        <CardHeader>
                          <CardTitle className="line-clamp-1 text-center">
                            {item.title}
                          </CardTitle>
                          <Button>{item.price}$</Button>
                        </CardHeader>
                        <img
                          src={item.image}
                          alt={item.title}
                          className=" h-[100px] "
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        {/* Homepage categories */}
        <Carousel className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <CarouselContent className="flex ">
            {categories.map((category: CategoriesProps) => (
              <CarouselItem
                key={category.id}
                className="md:basis-1/3 lg:basis-1/5 "
              >
                <Link to={`/products/categories/${category.name}`}>
                  <Button>{category.name}</Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* Homepage All products */}
        <section className="flex flex-col gap-2">
          <div
            className={cn(
              buttonVariants({ className: "max-w-min", variant: "secondary" })
            )}
          >
            All products
          </div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {data.products.map((item: ProductData) => (
              <Link key={item.id} to={`/products/${item.id}`}>
                <ProductCard {...item} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
