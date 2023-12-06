"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { SheetClose } from "./ui/sheet";

interface TopNavProps {
  isChildOfSheet?: boolean;
}

interface Props extends TopNavProps {
  asChild?: boolean;
  children: ReactNode;
}

const EncapsulatedInSheetClose: React.FC<Props> = ({
  asChild = false,
  isChildOfSheet = false,
  children,
}) => {
  if (!isChildOfSheet) {
    return <>{children}</>;
  }
  return <SheetClose asChild={asChild}>{children}</SheetClose>;
};

const TopNav: React.FC<TopNavProps> = ({ isChildOfSheet = false }) => {
  const pathname = usePathname();

  const menuItems = [
    { title: "Pedidos", path: "/" },
    { title: "Cozinha", path: "/kitchen" },
    { title: "Retirada", path: "/delivery" },
  ];

  return (
    <NavigationMenu
      id="menu"
      className="flex items-start sm:items-center sm:w-auto max-w-full text-primary-foreground font-bold text-xs"
    >
      <NavigationMenuList className="flex flex-col sm:flex-row items-center sm:justify-between gap-1 sm:gap-6 max-h-6t-4 sm:pt-0">
        {menuItems.map((item, idx) => (
          <NavigationMenuItem
            key={idx}
            className={pathname === item.path ? "group" : ""}
          >
            <Link
              href={item.path}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle() + ` bg-primary`}
                style={
                  pathname === item.path
                    ? {
                        backgroundColor: "#19400e",
                      }
                    : {}
                }
              >
                <EncapsulatedInSheetClose isChildOfSheet={isChildOfSheet}>
                  <span
                    className={
                      `font-semibold text-xs rounded-sm` +
                      (pathname === item.path
                        ? " group-hover:text-primary-foreground"
                        : " hover:text-primary")
                    }
                  >
                    {item.title}
                  </span>
                </EncapsulatedInSheetClose>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TopNav;
