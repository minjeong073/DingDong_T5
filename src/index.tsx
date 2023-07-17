import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./routes/Layout";
import { WriteQuestion } from "./pages/WriteQuestion";
import { List } from "./pages/List/List";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/articles" element={<List />} />
          <Route path="/articles/write" element={<WriteQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

