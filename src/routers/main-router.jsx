import React from "react";
import TotalLayout from "../components/TotalLayout";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/main/page";
import RoomPage from "../routes/room/page";
import GamePage from "~/routes/game/page";
import ResultPage from "~/routes/result/page";
import RankPage from "~/routes/rank/page";

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
        path: "/room",
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
    ],
  },
];

const router = createBrowserRouter(mainRouter);

export default router;
