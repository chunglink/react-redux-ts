export const menu = [
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
