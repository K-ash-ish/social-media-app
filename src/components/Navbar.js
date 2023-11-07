"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    const logoutStatus = await fetch("/api/logout")
      .then((data) => data.json())
      .then((data) => data);
    if (logoutStatus.message === "Success") {
      return router.push("/login");
    }
  }
  // const { isLoggedIn } = useAuth();
  // isLoggedIn();

  return (
    <nav className="rounded-md md:w-1/2  md:mx-auto   h-16 md:p-2 flex flex-row  justify-between items-center  ">
      <Link
        href="/"
        className="text-2xl font-bold uppercase text-blue-500 mx-2"
      >
        Connect
      </Link>
      <ul className="font-semibold  flex justify-around items-center md:text-xl">
        <Link
          href="/profile"
          className="hover:bg-accent h-10 px-4 py-2 rounded-md"
        >
          Profile
        </Link>
        {/* <Link></Link> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="font-semibold">
            <Button variant="ghost" className="md:text-xl">
              {" "}
              More <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="capitalize mr-2">
            <DropdownMenuLabel>Account options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="">
              <DropdownMenuItem>
                <Link href="/account-options">Options</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-transparent">
                <Button variant="link" className="px-0" onClick={handleLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </nav>
  );
}

export default Navbar;
