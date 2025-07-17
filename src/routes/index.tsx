import { Route, Routes } from "react-router";
import { Portfolio, NotFound, Finance } from "../pages";
import { PickMyGame } from "../pages/PickMyGame";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/finance" element={<Finance />} />
    <Route path="/pick-my-game" element={<PickMyGame />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
