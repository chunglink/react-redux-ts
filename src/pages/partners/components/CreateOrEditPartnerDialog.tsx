import { useAppDispatch } from "@/app/hooks";
import { addPartnerAsync } from "@/features/partner/partnerSlice";
import PartnerDto from "@/features/partner/interfaces/partnerDto";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
interface ICreateOrEditPartnerDialogProps {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}
const CreateOrEditPartnerDialog = ({
  isVisible,
  setVisible,
}: ICreateOrEditPartnerDialogProps) => {
  const [formData, setFormData] = useState({});
  const dispatch = useAppDispatch();
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
  const onSubmit = (data: PartnerDto) => {
    setFormData(data);
    //setShowMessage(true);
    dispatch(addPartnerAsync(data));
    console.log(errors);

    reset();
    setVisible(false);
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="Lưu" onClick={handleSubmit(onSubmit)} />
      <Button
        label="Hủy"
        className="p-button-warning ml-2"
        onClick={() => setVisible(false)}
      />
    </div>
  );
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setVisible(false)}
      footer={dialogFooter}
      header="Đối tác"
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
      style={{ width: window.innerWidth >= 992 ? "50vw" : "90vw" }}
      modal
      maximizable
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <label
            htmlFor="pa_name"
            className={classNames({ "p-error": errors.pa_name })}
          >
            Tên *
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
