import React, { useEffect, useState } from "react";
import "@/App.css";

import { ToastContainer } from "react-toastify";
import { ConfirmDialog } from "primereact/confirmdialog";
import Spinner from "@/components/progress-spinner/Spinner";
import AppRouter from "@/components/routers/AppRouter";
import { Constants } from "@/lib/constants";

declare var abp: any;
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    abp.event.on(Constants.EVENT.LOADING, (flag: boolean) => {
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
