import { Loader, ShoppingBagIcon, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.tsx";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button.tsx";
import { Separator } from "../ui/separator.tsx";
import HoverInfoElement from "../ui/HoverInfoElement.tsx";
import {
  addToCart,
  decreaseFromCart,
  fetchCarts,
  removeFromCart,
} from "@/services/useCartsQuery.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CARTS_QUERY } from "@/utils/constants.tsx";
import CartList from "./CartList.tsx";
import { useConditionalEffect } from "@/hooks/useConditionalEffect.tsx";
import { useUsersQuery } from "@/services/usersQuery.tsx";
import { useEffect } from "react";

const Cart = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { data: user } = useUsersQuery();
  const { data, isPending, refetch } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: fetchCarts,
  });
  useEffect(() => {
    return () => {
      if (location.pathname === "/login") refetch();
    };
  }, []);
  const numberOfItems = data ? data?.length : 0;
  const totalPrice = data
    ? data?.reduce((acc, item) => acc + item.count * item.cartProduct.price, 0)
    : 0;

  const removeFromCartMutation = useMutation({
    mutationFn: async (item: string) => decreaseFromCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });
  const removeItem = useMutation({
    mutationFn: async (item: string) => removeFromCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });
  const addToCartMutation = useMutation({
    mutationFn: async (item: string) => addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });

  const addToCartAnimation = useConditionalEffect(data, "cart");
  if (isPending) {
    return (
      <div className="grid items-center rounded-sm border-2 border-border p-1">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <Sheet>
      {user?.first_name ? (
        <HoverInfoElement hoverContent="Cart" shouldHover side="bottom">
          <SheetTrigger className="m-auto flex items-center rounded-md bg-background p-2 ring-1 ring-border">
            <ShoppingCart
              aria-hidden="true"
              color={
                numberOfItems > 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"
              }
              className={addToCartAnimation}
            />
            <span
              className={
                numberOfItems > 0
                  ? "ml-2 animate-bounce text-sm font-medium text-primary"
                  : "ml-2 text-sm font-medium text-muted"
              }
            >
              {numberOfItems}
            </span>
          </SheetTrigger>
        </HoverInfoElement>
      ) : null}
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>cart </SheetTitle>
        </SheetHeader>
        {data?.length ? (
          <>
            <div className="flex justify-between">
              <div> Cart items {numberOfItems}</div>
            </div>
            <CartList
              data={data}
              isLoading={isPending}
              addToCartMutation={addToCartMutation.mutate}
              removeFromCartMutation={removeFromCartMutation.mutate}
              removeItem={removeItem.mutate}
            />
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">
                    Total Price: {totalPrice > 0 ? totalPrice : 0}$
                  </span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    to="/shopping"
                    className={cn(
                      buttonVariants({
                        className: "w-full",
                      }),
                    )}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          // if cart is empty
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <ShoppingBagIcon className="m-auto grid h-44 w-44" />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                to=""
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  }),
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
