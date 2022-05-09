import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/Loading';
import PrivateRouter from './PrivateRouter';

const Main = lazy(() => import('../pages/Main'));
const Login = lazy(() => import('../pages/LoginRegister'));
const Account = lazy(() => import('../pages/Account'));
const ProductDetail = lazy(() => import('../pages/Product-Detail'));
const AddProduct = lazy(() => import('../pages/Add-Product'));
const NotFound = lazy(() => import('../pages/Not-Found'));

function Router() {
  return (

    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRouter />}>
          <Route path="/myaccount" element={<Account />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>

      </Routes>
    </Suspense>

  );
}

export default Router;
