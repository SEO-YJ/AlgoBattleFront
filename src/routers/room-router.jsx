import RoomPage from "../routes/room/page";

export const roomRouter = {
  children: [
    {
      path: "",
      index: true,
      element: <RoomPage />,
    },
  ],
};