import React, { useEffect, useState } from "react";
import "@/App.css";

import { ToastContainer } from "react-toastify";
import { ConfirmDialog } from "primereact/confirmdialog";
import Spinner from "@/components/progress-spinner";
import AppRouter from "@/components/routers/AppRouter";
import { AppConsts } from "@/lib/appConst";

declare var abp: any;
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    abp.event.on(AppConsts.EVENT.LOADING, (flag: boolean) => {
      setIsLoading(flag);
    });
  }, []);
  return (
    <div>
      <Spinner isLoading={isLoading}></Spinner>
      <ToastContainer />
      <ConfirmDialog />
      <AppRouter></AppRouter>
    </div>
  );
};

export default App;
