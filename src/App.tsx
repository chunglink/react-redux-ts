import React, { useEffect, useState } from "react";
import "@/App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { isUserLoggedin } from "@/features/auth/authSlice";
import Login from "@/pages/login";
import Layout from "@/shares/Layout";
import { ToastContainer } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import FullPageLoader from "@/shares/FullPageLoader";
import PartnerList from "@/pages/partners/PartnerList";

declare var abp: any;
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    abp.event.on("LOADING", (flag: boolean) => {
      setIsLoading(flag);
    });
  }, []);
  return (
    <div>
      <FullPageLoader isLoading={isLoading}></FullPageLoader>
      <ToastContainer />
      <ConfirmDialog />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <h1> aaaaaaaaaaaaaa</h1>
              </RequireAuth>
            }
          />
          <Route path="/partner" element={<PartnerList />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
function RequireAuth({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAppSelector(isUserLoggedin);
  let location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
const ProtectedPage = () => {
  const confirm = (event: any) => {
    // confirmDialog({
    //   header: "aaaaaaaaaaaaaaaaaa",
    //   message: "Are you sure you want to proceed?",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => console.log("aaaaaaaaaaaaaaaaaaaaaa"),
    //   reject: () => console.log("bbbbbbbbbbbbbbbbbbbbbbbbb"),
    // });
    abp.event.trigger("LOADING", true);
  };

  return <Button label="Confirm" onClick={(event) => confirm(event)}></Button>;
};
export default App;
