import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import { NotFoundPage } from "./pages/404";
import { HomePage } from "./pages/HomePage";
import { RedirectPage } from "./pages/RedirectPage";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/:shortUrl" element={<RedirectPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
    </Route>
  )
);
