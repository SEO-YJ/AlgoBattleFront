import React from "react";
import TotalLayout from "../components/TotalLayout";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/main/page";
import RoomPage from "../routes/room/page";
import GamePage from "~/routes/game/page";
import ResultPage from "~/routes/result/page";
import RankPage from "~/routes/rank/page";
import SocketTestPage from "~/routes/socket/testPage";

export const mainRouter = [
  {
    path: "/",
    element: <TotalLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        index: true,
      },
      {
        // path: "/room", //TODO room -> :roomId가 좋을듯? 의견있으면 알려주세요
        path: "/room/:roomId",
        element: <RoomPage />,
        index: true, //TODO roomid에 따른 room으로 이동되게 해야 할듯? (아래 전부다!)
      },
      {
        path: "/room/game",
        element: <GamePage />,
        index: true,
      },
      {
        path: "/room/result",
        element: <ResultPage />,
        index: true,
      },
      {
        path: "/rank",
        element: <RankPage />,
        index: true,
      },
      {
        path: "/socket/test",
        element: <SocketTestPage />,
        index: true,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);

export default router;
