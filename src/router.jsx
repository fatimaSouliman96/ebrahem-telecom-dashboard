import { createHashRouter } from "react-router-dom";
import App from "./App";
import {
  homeRouter,
  financialRouter,
  ordersRouter,
  accountsManage,
  transfer,
  addBalance,
  pricesRouter,
  accountRouter,
  accountDetailRouter,
  providersRouter
} from './pages';


import appsRouter from "./pages/apps/routes/routerApps";
import agentsRouter from "./pages/agent/routes/agentsRouter";
import  { lazy, Suspense } from "react";
import inquresRouter from "./pages/inquires/routes/inqurieRouter";

const LogIn = lazy(() => import('./pages/Ath/LogIn'));

export const router = createHashRouter([
  {
    path: "/log_in",
    element:
      <Suspense fallback={<div>جارٍ تحميل صفحة تسجيل الدخول...</div>}>
        <LogIn />
      </Suspense>

  },
  {
    path: "/",
    element: <App />,
    children: [
      ...homeRouter,
      ...financialRouter,
      ...ordersRouter,
      ...accountsManage,
      ...transfer,
      ...addBalance,
      ...pricesRouter,
      ...accountRouter,
      ...accountDetailRouter,
      ...providersRouter,
      ...appsRouter,
      ...agentsRouter,
      ...inquresRouter
    ],
  }

]);
