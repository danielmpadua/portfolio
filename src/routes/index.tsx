import { Route, Routes } from "react-router";
import { Portifolio, NotFound, Finance } from "../pages";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Portifolio />} />
    <Route path="/finance" element={<Finance />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
