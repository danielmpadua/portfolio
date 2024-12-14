import { Route, Routes } from "react-router";
import { Portifolio, NotFound } from "../pages";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Portifolio />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
