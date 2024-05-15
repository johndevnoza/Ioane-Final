import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Skeleton } from "../skeleton";
import {
  ProductsSkeleton,
  SmallProductsSkeleton,
} from "./CustomSkeletonLoadings";
type SkeletonLoadingProps = {
  numberOfCards: number;
  products?: boolean;
  cart?: boolean;
  shopping?: boolean;
  homePageOffers?: boolean;
  homePageProducts?: boolean;
  homePageCategories?: boolean;
};

// ProductsLoading.jsx

export const ProductsLoading = ({
  numberOfCards,
  products,
  cart,
  shopping,
  homePageOffers,
  homePageCategories,
  homePageProducts,
}: SkeletonLoadingProps) => {
  const cards = [];

  for (let i = 0; i < numberOfCards; i++) {
    cards.push(<ProductsSkeleton key={i} />);
  }

  return (
    <>
      {products && (
        <MaxWidthWrapper className="my-8">
          <div className="min-w-max min-h-8 bg-secondary animate-pulse rounded-md"></div>
          <div className="grid my-8 max-[440px]:grid-cols-1  md:grid-cols-3 max-[300px]:grid-cols-1 sm:grid-cols-2 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
            {cards}
          </div>
        </MaxWidthWrapper>
      )}
      {homePageProducts && (
        <div className="my-8">
          <div className="min-w-max min-h-8 bg-secondary animate-pulse rounded-md"></div>
          <div className="grid my-8 max-[440px]:grid-cols-1  md:grid-cols-3 max-[300px]:grid-cols-1 sm:grid-cols-2 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
            {cards}
          </div>
        </div>
      )}
      {homePageOffers && (
        <div>
          <div className="w-32 min-h-10 bg-secondary animate-pulse rounded-lg"></div>
          <div className="grid my-2  md:grid-cols-3 max-[375px]:grid-cols-1 sm:grid-cols-2 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
            <SmallProductsSkeleton responsive="" />
            <SmallProductsSkeleton responsive="max-[375px]:hidden" />
            <SmallProductsSkeleton responsive="hidden md:block" />
            <SmallProductsSkeleton responsive="hidden lg:block" />
          </div>
        </div>
      )}
    </>
  );
};
