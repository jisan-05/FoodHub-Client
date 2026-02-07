"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { ordersService } from "@/services/orders.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cart from "../ui/cart";
import ProfileMenu from "../ui/profileMenu";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://cdn.produkto.io/logo-templates/6733c6a262f86639a806d206/food-hub-variation1.webp",
    alt: "logo",
    title: "FoodHub",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Meals",
      url: "/meals",
    },
    {
      title: "Restaurants",
      url: "/providers",
    },
    {
      title: "Orders",
      url: "/myOrders",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

// Helper function to calculate total cart count
const calculateCartCount = (orders: any[]) => {
  return orders.reduce((sum, order) => {
    const cartQty = order.orderItemForCarts?.reduce(
      (itemSum: number, item: any) => itemSum + item.quantity,
      0
    ) ?? 0;
    return sum + cartQty;
  }, 0);
};

// Initial fetch of cart count
useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await ordersService.getAddToCartData();
      if (Array.isArray(res.data)) {
        setCartCount(calculateCartCount(res.data));
      } else {
        setCartCount(0);
      }
    } catch (err) {
      setCartCount(0);
    }
  };

  fetchCart();
}, []);

// Instant cart count update on "cart-updated" event
useEffect(() => {
  const handler = () => {
    ordersService.getAddToCartData().then((res) => {
      if (Array.isArray(res.data)) {
        setCartCount(calculateCartCount(res.data));
      } else {
        setCartCount(0);
      }
    });
  };

  window.addEventListener("cart-updated", handler);
  return () => window.removeEventListener("cart-updated", handler);
}, []);


  useEffect(() => {
    const getSession = async () => {
      const sessionData = await authClient.getSession();
      setSession(sessionData);
      setLoading(false);
    };

    getSession();
  }, []);

  // const data = await ordersService.getAddToCartData()

  
  return (
    <section
      className={cn(
        "py-4 fixed top-0 left-0 w-full z-50 bg-white shadow",
        className,
      )}
    >
      <div className="container mx-auto px-2 ">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              {/* <img
                  src={logo.src}
                  className="max-h-8 dark:invert"
                  alt={logo.alt}
                /> */}
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-5 justify-center">
            <div className="h-full mt-2 mx-auto">
              <Link href="/cart">
                <Cart count={cartCount} />
              </Link>
            </div>
            {!loading && session.data ? (
              <ProfileMenu
                name={session.data?.user.name}
                email={session.data?.user.email}
                image={session.data.user.image}
                // image="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
              />
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <p className="text-2xl font-semibold text-red-700">FoodHub</p>
              {/* <img
                  src={logo.src}
                  className="max-h-8 dark:invert"
                  alt={logo.alt}
                /> */}
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    {/* <a href={logo.url} className="flex items-center gap-2">
                        <img
                          src={logo.src}
                          className="max-h-8 dark:invert"
                          alt={logo.alt}
                        />
                      </a> */}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2"></AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar1 };
