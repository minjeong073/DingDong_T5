import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./routes/Layout";
import { WriteQuestion } from "./pages/WriteQuestion";
import { List } from "./pages/List";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/questions" element={<WriteQuestion />} />
        </Route>
        <Route path="/" >
            <Route path="/articles" element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);