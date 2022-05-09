import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

interface Iprops {
  isLoading: boolean | any;
}

const FullPageLoader = ({ isLoading = false }: Iprops) => {
  return (
    isLoading && (
      <div className="spinner">
        <ProgressSpinner />
      </div>
    )
  );
};

export default FullPageLoader;
