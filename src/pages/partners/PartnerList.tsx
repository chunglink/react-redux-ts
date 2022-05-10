import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { partners, totalPartners } from "@/features/partner/partnerSlice";
import PartnerDto from "@/features/partner/types/partnerDto";
import { Button } from "primereact/button";
import { template } from "@/shares/paginatorTemplate";
import CreateOrEditPartnerDialog from "./components/CreateOrEditPartnerDialog";
import { useAppSelector } from "@/app/hooks";

const PartnerList = () => {
  const partnerList: PartnerDto[] = useAppSelector(partners);
  const totalRecords: number = useAppSelector(totalPartners);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [creationDialogVisable, setCreationDialogVisable] = useState(false);

  const indexBodyTemplate = (rowData: PartnerDto): number => {
    return (
      partnerList.findIndex((item) => item.pa_id === rowData.pa_id) * page + 1
    );
  };
  const actionBodyTemplate = (rowData: PartnerDto) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => console.log(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning mt-2"
          onClick={() => console.log(rowData)}
        />
      </div>
    );
  };
  const onPageChange = (event: any) => {
    console.log(event);
  };
  const openCreationDialog = () => {
    setCreationDialogVisable(true);
  };
  const header = (
    <div className="table-header">
      <Button icon="pi pi-plus" onClick={openCreationDialog} label="Thêm mới" />
    </div>
  );

  return (
    <div>
      <h3>Quản lí đối tác</h3>
      <div>
        <DataTable
          header={header}
          value={partnerList}
          paginator
          paginatorTemplate={template}
          rows={rows}
          totalRecords={2}
          paginatorClassName="justify-content-end"
          onPage={onPageChange}
        >
          <Column body={indexBodyTemplate} header="Stt" />

          <Column field="pa_code" header="Mã đối tác" />
          <Column field="pa_name" header="Tên đối tác" />
          <Column field="pa_note" header="Ghi chú" />
          <Column body={actionBodyTemplate} header="Hành động" />
        </DataTable>
      </div>
      <CreateOrEditPartnerDialog
        isVisable={creationDialogVisable}
        setVisable={setCreationDialogVisable}
      />
    </div>
  );
};

export default PartnerList;
