import React from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useAppDispatch } from "@/app/hooks";
import { loginAsync } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await dispatch(loginAsync());
    navigate("/", { replace: true });
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
          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText type="text" className="w-full mb-3" />

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2"
            >
              Password
            </label>
            <InputText type="password" className="w-full mb-3" />

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox checked={true} id="rememberme" className="mr-2" />
                <label htmlFor="rememberme">Duy trì đăng nhập</label>
              </div>
            </div>

            <Button
              label="Đăng nhập"
              className="w-full mb-5 bg-indigo-600"
              onClick={() => handleLogin()}
            />

            <div className="w-full mb-7">
              Bạn không phải thành viên? Vui lòng liên hệ admin của tổ chức để
              được cung cấp tài khoản!
            </div>
            <Button
              label="Đăng nhập với FPT ADFS"
              className="w-full bg-indigo-100 text-indigo-600"
              onClick={() => handleLogin()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
