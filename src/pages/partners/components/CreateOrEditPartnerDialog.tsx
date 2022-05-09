import PartnerDto from "@/features/partner/types/partnerDto";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
interface ICreateOrEditPartnerDialogProps {
  isVisable: boolean;
  setVisable: (isVisable: boolean) => void;
}
const CreateOrEditPartnerDialog = ({
  isVisable,
  setVisable,
}: ICreateOrEditPartnerDialogProps) => {
  const [formData, setFormData] = useState({});
  const defaultValues: PartnerDto = {
    pa_id: 0,
    pa_name: "",
    pa_code: "",
    pa_note: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });
  const onSubmit = (data: any) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    setFormData(data);
    //setShowMessage(true);
    console.log(errors);
    reset();
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="Lưu"
        className="p-button-text"
        autoFocus
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        label="Hủy"
        className="p-button-text"
        autoFocus
        onClick={() => setVisable(false)}
      />
    </div>
  );
  return (
    <Dialog
      visible={isVisable}
      onHide={() => setVisable(false)}
      position="center"
      footer={dialogFooter}
      header="Đối tác"
      breakpoints={{ "960px": "80vw" }}
      style={{ width: "30vw" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <label
            htmlFor="pa_name"
            className={classNames({ "p-error": errors.pa_name })}
          >
            Name*
          </label>
          <Controller
            name="pa_name"
            control={control}
            rules={{ required: "Trường này là bắt buộc!" }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                autoFocus
                className={classNames({
                  "p-invalid": fieldState.error,
                })}
              />
            )}
          />

          {errors.pa_name && (
            <small className="p-error">{errors.pa_name.message}</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pa_note">Ghi chú</label>
          <Controller
            name="pa_note"
            control={control}
            render={({ field, fieldState }) => (
              <InputTextarea
                id={field.name}
                {...field}
                className={classNames({
                  "p-invalid": fieldState.error,
                })}
              />
            )}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default CreateOrEditPartnerDialog;
