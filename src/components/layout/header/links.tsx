import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Links() {
  const { t } = useTranslation();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              buttonVariants({ className: "group-data-[state=open]:p-5" }),
            )}
          >
            <MenuSquare />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                }),
              )}
            >
              <Link to="/products/page/1"> {t("allProducts")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                }),
              )}
            >
              <Link to="/product-category"> {t("categories")}</Link>
            </NavigationMenuLink>
            <Separator />
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                }),
              )}
            >
              <Link to="/about"> {t("aboutUs")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                }),
              )}
            >
              <Link to="/contact"> {t("contact")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                }),
              )}
            >
              <Link to="/map"> {t("map")}</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
