import { Toastr } from "./../shares/Toastr";

import axios from "axios";
import { AppConsts } from "@/lib/appconst";

declare var abp: any;
const qs = require("qs");
const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config: any) {
    if (!!abp.auth.getToken()) {
      config.headers.common["Authorization"] = "Bearer " + abp.auth.getToken();
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      Toastr.error(
        error.response.data.error.details || DEFAULT_ERROR_NOTIFICATION
      );
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      Toastr.error(
        error.response.data.error.message || DEFAULT_ERROR_NOTIFICATION
      );
    } else if (!error.response) {
      Toastr.error(DEFAULT_ERROR_NOTIFICATION);
    }

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
