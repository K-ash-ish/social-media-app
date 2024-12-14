import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
export function ProfileShimmer() {
  return (
    <div className=" flex flex-col h-5/6 md:w-1/2 md:mx-auto  m-4 overflow-hidden ">
      <div className="flex flex-col ">
        <div className="flex  justify-between">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage alt="@shadcn" />
              <AvatarFallback className="bg-gray-100 animate-pulse"></AvatarFallback>
            </Avatar>
            <div>
              <p className="bg-gray-100 h-5 w-28 text-xs text-gray-400"></p>
            </div>
          </div>
          <Button className="self-end bg-gray-100 animate-pulse w-24"></Button>
        </div>
        <div className="flex flex-col justify-between  pb-2 my-2">
          <p></p>
          <div className="text-xs text-gray-400  flex space-x-4 my-1">
            <p className="w-20 h-3 bg-gray-100"></p>
            <p className="w-20 h-3 bg-gray-100"></p>
          </div>
          <Button asChild className="bg-gray-100 animate-pulse">
            <Link href=""></Link>
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 w-full h-1 animate-pulse"></div>
      <div className="flex flex-col w-11/12 mx-auto ">
        {Array(3)
          .fill("")
          ?.map((post, i) => {
            return (
              <Card
                key={i}
                className="my-4 mx-2 h-24 bg-gray-100 animate-pulse w-full  "
              ></Card>
            );
          })}
      </div>
    </div>
  );
}
