import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PrimeReact from "primereact/api";
import { classNames } from "primereact/utils";
import AppMenu from "./AppMenu";
import { AppTopbar } from "./AppTopbar";
import "prismjs/themes/prism-coy.css";
import "./assets/layout/layout.scss";
const Layout = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  const onWrapperClick = (event: any) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event: any) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event: any) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event: any) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event: any) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const menu = [
    {
      label: "Danh sách biên bản",
      icon: "pi pi-fw pi-book",
      to: "/dashboard",
    },
    {
      label: "Danh mục",
      icon: "pi pi-fw pi-box",
      expanded: true,
      items: [
        {
          label: "Sự vụ",
          to: "",
        },
        { label: "Tuyến trục", to: "" },
        { label: "Phân đoạn", to: "" },
        { label: "Đối tác", to: "/partner" },
        { label: "Thiết bị/ vật tư", to: "" },
        { label: "Bộ phận", to: "" },
        { label: "Chi nhánh", to: "" },
        { label: "Chức vụ", to: "" },
        { label: "Hạng mục", to: "" },
      ],
    },
    {
      label: "Quản lí Người dùng",
      icon: "pi pi-fw pi-id-card",
      to: "",
    },
  ];

  const addClass = (element: any, className: string) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element: any, className: string) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });
  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
      />
      <div className="layout-sidebar" onClick={onSidebarClick}>
        <AppMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          layoutColorMode={layoutColorMode}
        />
      </div>
      <div className="layout-main-container">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
