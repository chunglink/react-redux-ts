import React from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useAppDispatch } from "@/app/hooks";
import { loginAsync } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );
  const defaultValues = {
    name: "admin@gmail.com",
    password: "password1",
    rememberMe: false,
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });
  const onSubmit = async (data: any) => {
    await dispatch(
      loginAsync({
        name: data.name,
        password: data.password,
      })
    );
    navigate("/", { replace: true });
    reset();
  };

  return (
    <div className="flex" style={{ height: "100vh", backgroundColor: "white" }}>
      <div
        className="hidden lg:block w-6 bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("banner.png")' }}
      ></div>
      <div className="lg:w-6 md:w-12 md:p-4 flex align-items-center justify-content-center">
        <div className="lg:col-8 md:col-12">
          <div className="text-center mb-5 flex">
            <img src="logo.png" alt="hyper" height={50} />
            <div className="text-900 text-3xl font-medium ml-3">PMB</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <label
                htmlFor="password"
                className={classNames({ "p-error": errors.password })}
              >
                Email
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: t("LOGIN.EMAIL_REQUIRE"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: t("LOGIN.EMAIL_INVALID"),
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames({ "p-invalid": fieldState.error })}
                  />
                )}
              />
              {errors.name && (
                <small className="p-error">{errors.name.message}</small>
              )}
            </div>
            <div className="field">
              <label
                htmlFor="password"
                className={classNames({ "p-error": errors.password })}
              >
                {t("LOGIN.PASSWORD_LABEL")}
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: t("LOGIN.PASSWORD_REQUIRE") }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    toggleMask
                    className={classNames({ "p-invalid": fieldState.error })}
                    header={passwordHeader}
                    footer={passwordFooter}
                  />
                )}
              />
            </div>
            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Checkbox
                      inputId={field.name}
                      onChange={(e) => field.onChange(e.checked)}
                      checked={field.value}
                      className={classNames("mr-2", {
                        "p-invalid": fieldState.error,
                      })}
                    />
                  )}
                />
                <label htmlFor="rememberMe">{t("LOGIN.REMEMBER_ME")}</label>
              </div>
            </div>

            <Button
              label={t("LOGIN.SUBMIT_BTN_LABEL")}
              className="w-full mb-5 bg-indigo-600"
              type="submit"
            />
          </form>

          <div className="w-full mb-7">{t("LOGIN.HELP_TEXT")}</div>
          <Button
            label={t("LOGIN.ADFS_BTN_LABEL")}
            className="w-full bg-indigo-100 text-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
