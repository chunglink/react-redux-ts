import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import React from "react";
import { Dropdown } from "primereact/dropdown";
import { PaginatorTemplateOptions } from "primereact/paginator";
export const template: PaginatorTemplateOptions = {
  layout:
    "CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
  PrevPageLink: (options: any) => {
    return (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-paginator-icon pi pi-angle-left"></span>
        <Ripple />
      </button>
    );
  },
  NextPageLink: (options: any) => {
    return (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-paginator-icon pi pi-angle-right"></span>
        <Ripple />
      </button>
    );
  },
  PageLinks: (options: any) => {
    if (
      (options.view.startPage === options.page &&
        options.view.startPage !== 0) ||
      (options.view.endPage === options.page &&
        options.page + 1 !== options.totalPages)
    ) {
      const className = classNames(options.className, { "p-disabled": true });

      return (
        <span className={className} style={{ userSelect: "none" }}>
          ...
        </span>
      );
    }

    return (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
      >
        {options.page + 1}
        <Ripple />
      </button>
    );
  },
  RowsPerPageDropdown: (options: any) => {
    const dropdownOptions = [
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 50, value: 50 },
    ];

    return (
      <Dropdown
        value={options.value}
        options={dropdownOptions}
        onChange={options.onChange}
      />
    );
  },
  CurrentPageReport: (options) => {
    return `Hiển thị ${options.first}-${options.last}/${options.totalRecords}`;
  },
  FirstPageLink: (options) => {
    return null;
  },
  JumpToPageInput: (options) => {
    return null;
  },
  LastPageLink: (options) => {
    return null;
  },
};
