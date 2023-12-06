import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";

import TopNav from "./top-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row items-center justify-between bg-primary max-w-full w-full h-11 px-7 py-2">
      <div id="logo" className="flex flex-row items-center gap-1">
        <div className="flex items-center justify-center bg-primary-foreground w-5 h-5 p-1 rounded-full">
          <FontAwesomeIcon icon={faBurger} size="sm" className="text-primary" />
        </div>
        <p className="text-primary-foreground font-bold">fastfood</p>
      </div>

      <div className="flex flex-col items-center">
        <Sheet>
          <SheetTrigger className="block cursor-pointer sm:hidden">
            <HamburgerMenuIcon className="h-6 w-6 text-primary-foreground" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col items-center bg-primary"
          >
            <SheetHeader>
              <SheetTitle className="text-primary-foreground">Menu</SheetTitle>
            </SheetHeader>
            <TopNav isChildOfSheet={true} />
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex">
          <TopNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
