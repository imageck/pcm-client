import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import Item from "./pages/Item";
import NotFound from "./layouts/error";

import Navbar from "./layouts/header/navbar";
import Footer from "./layouts/footer/footer";

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
     <Navbar />
     <main className="w-100 container-xxl mx-auto flex-grow-1">
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/collections" element={<Collections />} />
       <Route path="/collections/:id" element={<Collection />} />
       <Route path="/collections/:id/items/:id" element={<Item />} />
       <Route path="*" element={<NotFound />} />
      </Routes>
     </main>
     <Footer />
    </BrowserRouter>
  );
}
