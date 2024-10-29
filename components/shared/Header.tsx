"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; // Adjust based on your actual import paths
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setcurrentPage] = useState("/");

  const pathname = usePathname();
  useEffect(() => {
    setIsMounted(true);
    setcurrentPage(pathname);
  }, [pathname]);

  return (
    <nav className="absolute top-0 w-full z-50 flex justify-between items-center text-white px-12 max-sm:px-3 py-5">
      <Link href={"/"}>
        <Image
          alt="CCLogo"
          src={"/assets/images/CCLogo.png"}
          width={60}
          height={60}
        ></Image>
      </Link>
      <div className="">
        <ul className="flex justify-center gap-12 max-sm:text-base max-sm:gap-3 text-lg font-medium">
          <Link href={"/showcase"}>
            <li
              className={`cursor-pointer transition  hover:text-[#AC51D2] ${
                currentPage === "/showcase" ? "text-[#AC51D2]" : ""
              }`}
            >
              Showcase
            </li>
          </Link>
          <Link href={"/clubs"}>
            <li
              className={`cursor-pointer transition max-sm:text-base hover:text-[#AC51D2] ${
                currentPage === "/clubs" ? "text-[#AC51D2]" : ""
              }`}
            >
              Clubs
            </li>
          </Link>
          <Link href={"/events"}>
            <li
              className={`cursor-pointer transition max-sm:text-base hover:text-[#AC51D2] ${
                currentPage === "/events" ? "text-[#AC51D2]" : ""
              }`}
            >
              Events
            </li>
          </Link>
          <Link href={"/core-team"}>
            <li
              className={`cursor-pointer transition max-sm:text-base hover:text-[#AC51D2] ${
                currentPage === "/core-team" ? "text-[#AC51D2]" : ""
              }`}
            >
              Team
            </li>
          </Link>
          <li>
            {isMounted && (
              <>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Link
                    className="cursor-pointer transition max-sm:text-base hover:text-[#AC51D2]"
                    href="/sign-in"
                  >
                    Login
                  </Link>
                </SignedOut>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
