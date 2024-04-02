import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCategoriesQuery } from "@/services/productsQuery";
import { Link } from "react-router-dom";
import { Button } from "../button";
import Autoplay from "embla-carousel-autoplay";

function HomeCategories(): JSX.Element | string {
  const { data: categories, isPending, error } = useCategoriesQuery();

  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Carousel
      opts={{
        align: "end",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="border bg-card text-card-foreground shadow-sm"
    >
      <CarouselContent className="">
        {categories.map((category: CategoriesProps) => (
          <CarouselItem
            key={category.id}
            className="md:basis-1/3 lg:basis-1/5 basis-1/3 "
          >
            <Link to={`/product-category/${category.name}`}>
              <Button variant={"secondary"}>{category.name}</Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export default HomeCategories;