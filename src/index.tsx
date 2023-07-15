import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./routes/Layout";
import { WriteQuestion } from "./pages/WriteQuestion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Rout path="/questions" element={<ListPage />} /> */}
          <Route path="/questions/write" element={<WriteQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
