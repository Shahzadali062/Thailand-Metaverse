import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home/Home.jsx";
import NotFound from "./assets/pages/NotFound/NotFound.jsx";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}