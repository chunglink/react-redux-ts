import { useAppDispatch } from "@/app/hooks";
import { getUsersAsync } from "@/features/auth/authSlice";
import Login from "@/pages/login";
import PartnerList from "@/pages/partners";
import { Button } from "primereact/button";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
declare var abp: any;
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
        <Route path="/partner" element={<PartnerList />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const ProtectedPage = () => {
  const dispatch = useAppDispatch();
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

  return (
    <Button label="Confirm" onClick={() => dispatch(getUsersAsync())}></Button>
  );
};
export default AppRouter;
