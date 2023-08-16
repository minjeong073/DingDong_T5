import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import { Layout } from './routes/Layout';
import { WriteQuestion } from './pages/WriteQuestion';
import { List } from './pages/List/List';
import { Home } from './pages/Home/Home';
import { RecoilRoot } from 'recoil';
import { Detail } from './pages/Detail';
import { Replies } from './pages/Replies';
import { ModifyQuestion } from './pages/ModifyQuestion';
import { Login } from './pages/Login';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/articles" element={<Layout />}>
              <Route index element={<List />} />
              <Route path="/articles/:_id" element={<Detail />} />
              <Route path="/articles/write" element={<WriteQuestion />} />
              <Route path="/articles/modify/:_id" element={<ModifyQuestion />} />
            </Route>
            <Route path="/replies" element={<Layout />}>
              <Route index element={<Replies />} />
            </Route>
            <Route path="/mypage" element={<Layout />}></Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
