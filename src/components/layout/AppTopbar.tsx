import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Avatar } from "primereact/avatar";
import { useAppDispatch } from "@/app/hooks";
import { logoutAsync } from "@/features/auth/authSlice";
//import LogoHome from "../../assets/images/logo_home.png";
export const AppTopbar = (props: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className="layout-topbar">
      {/* <Link to="/" className="layout-topbar-logo">
        <img src={LogoHome} alt="logo" />
      </Link> */}

      <button
        type="button"
        className="p-link  layout-menu-button layout-topbar-button"
        onClick={props.onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className="p-link layout-topbar-menu-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <Avatar icon="pi pi-user" shape="circle" />
        <span style={{ marginLeft: 10, paddingTop: 5, color: "#ffffff" }}>
          Chungnt
        </span>
      </button>

      <ul
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      >
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={() => dispatch(logoutAsync())}
            style={{ color: "gray" }}
          >
            <i className="pi pi-sign-out" />
            <span>Đăng xuất</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
