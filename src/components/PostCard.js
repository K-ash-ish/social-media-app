import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function PostCard(props) {
  const { id, userHandle, content } = props;

  return (
    <Link href={`/post/${id}`}>
      <Card className="my-4 mx-2 bg-slate-50 border-dashed border-blue-400">
        <CardHeader className="">
          <CardTitle className="capitalize font-semibold">
            @{userHandle}
          </CardTitle>
          <CardContent className="text-sm capitalize">{content}</CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default PostCard;
