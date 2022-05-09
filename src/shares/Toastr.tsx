import React from "react";

import { toast, Slide } from "react-toastify";
import { confirmDialog } from "primereact/confirmdialog";
const ToastrComponent = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-row items-start justify-start">
      <p className="mx-4 font-medium leading-5 text-white">{message}</p>
    </div>
  );
};

const showToastr = (message: string) => {
  toast.success(<ToastrComponent message={message} />, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide,
    theme: "colored",
  });
};

const isError = (e: any) => e && e.stack && e.message;

const showErrorToastr = (error: any) => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error(<ToastrComponent message={errorMessage} />, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide,
    theme: "colored",
  });
};
const showConfirm = (
  message: string,
  header: string = "Confirmation",
  icon: string = "pi pi-exclamation-triangle"
) => {
  return new Promise<void>((resolve, reject) => {
    confirmDialog({
      message: message,
      header: header,
      icon: icon,
      acceptLabel: "Có",
      rejectLabel: "Không",
      accept: () => {
        resolve();
      },
      reject: () => {
        reject();
      },
    });
  });
};

export const Toastr = {
  success: showToastr,
  error: showErrorToastr,
  confirm: showConfirm,
};

export default Toastr;
