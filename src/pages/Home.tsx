import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import HomeCategories from "@/components/ui/homePage custom/HomeCategories";
import HomeOffers from "@/components/ui/homePage custom/HomeOffers";
import HomeProductsPreview from "@/components/ui/homePage custom/HomeProductsPreview";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="border-x-2 border-border">
        <div className="flex w-full flex-col gap-6 py-8">
          {/* Best Offers */}
          <HomeOffers />
          {/* home fancy categories carousel */}
          <HomeCategories />
          {/* Homepage All products */}
          <HomeProductsPreview />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
