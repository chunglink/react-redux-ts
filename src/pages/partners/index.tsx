import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { partners, totalPartners } from "@/features/partner/partnerSlice";
import PartnerDto from "@/features/partner/interfaces/partnerDto";
import { Button } from "primereact/button";
import { template } from "@/components/paginator-template/Paginator";
import CreateOrEditPartnerDialog from "./components/CreateOrEditPartnerDialog";
import { useAppSelector } from "@/app/hooks";

const PartnerList = () => {
  const partnerList: PartnerDto[] = useAppSelector(partners);
  const totalRecords: number = useAppSelector(totalPartners);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [creationDialogVisible, setCreationDialogVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerDto>({
    pa_id: 0,
    pa_name: "",
    pa_code: "",
    pa_note: "",
  });

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
          onClick={() => onBtnEditClick(rowData)}
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
    setSelectedPartner({
      pa_id: 0,
      pa_name: "",
      pa_code: "",
      pa_note: "",
    });
    setCreationDialogVisible(true);
  };
  const onBtnEditClick = async (rowData: PartnerDto) => {
    await setSelectedPartner({ ...rowData });
    setCreationDialogVisible(true);
  };
  const header = (
    <div className="table-header">
      <Button icon="pi pi-plus" onClick={openCreationDialog} label="Th??m m???i" />
    </div>
  );

  return (
    <div>
      <h3>Qu???n l?? ?????i t??c</h3>
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

          <Column field="pa_code" header="M?? ?????i t??c" />
          <Column field="pa_name" header="T??n ?????i t??c" />
          <Column field="pa_note" header="Ghi ch??" />
          <Column body={actionBodyTemplate} header="H??nh ?????ng" />
        </DataTable>
      </div>
      <CreateOrEditPartnerDialog
        isVisible={creationDialogVisible}
        setVisible={setCreationDialogVisible}
        defaultModel={selectedPartner}
      />
    </div>
  );
};

export default PartnerList;
