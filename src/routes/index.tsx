import { Navigate, Route, Routes } from "react-router";
import { Portifolio, NotFound } from "../pages";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to={"portifolio"} replace />} />
    <Route path="/portifolio" element={<Portifolio />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
