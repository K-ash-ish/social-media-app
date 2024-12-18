import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
export function Comment({
  id,
  author: { name, userHandle, profileUrl },
  content,
}) {
  return (
    <div
      key={id}
      className="border-2 border-dotted border-rose-200 px-2 py-4 m-2 rounded-lg flex flex-col gap-2 ml-2 "
    >
      <div className="flex items-center gap-2">
        <Avatar className="">
          <AvatarImage src={profileUrl} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ">
          <h3 className="capitalize font-semibold">{name}</h3>
          <h4 className="text-xs">@{userHandle}</h4>
        </div>
      </div>
      <p className="ml-2">{content}</p>
    </div>
  );
}
export function CommentShimmer({ comment, name, userHandle }) {
  return (
    <div className="opacity-40 bg-gray-100 animate-pulse border-2 border-dotted border-rose-200 px-2 py-4 m-2 rounded-lg flex flex-col gap-2 ml-2 ">
      <div className="flex items-center gap-2">
        <Avatar className="">
          <AvatarImage alt="@profilepic" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ">
          <h3 className="capitalize font-semibold">{name}</h3>
          <h4 className="text-xs">@{userHandle}</h4>
        </div>
      </div>
      <p className="ml-2">{comment}</p>
    </div>
  );
}
