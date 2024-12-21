import { Route, Routes } from "react-router";
import { Portfolio, NotFound, Finance } from "../pages";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/finance" element={<Finance />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
