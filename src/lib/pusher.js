import PusherClient from "pusher-js";
import PusherServer from "pusher";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  secret: process.env.PUSHER_APP_SECRET,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  useTLS: true,
});
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  }
);
