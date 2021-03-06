import { Toastr } from "../components/toast/Toastr";

import axios from "axios";
import { Constants } from "@/lib/constants";

declare var abp: any;
const qs = require("qs");
const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

const http = axios.create({
  baseURL: Constants.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config: any) {
    abp.event.trigger(Constants.EVENT.LOADING, true);
    if (!!abp.auth.getToken()) {
      config.headers.common["Authorization"] = "Bearer " + abp.auth.getToken();
    }

    return config;
  },
  function (error) {
    abp.event.trigger(Constants.EVENT.LOADING, false);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    abp.event.trigger(Constants.EVENT.LOADING, false);
    return response;
  },
  (error) => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      abp.event.trigger(Constants.EVENT.LOADING, false);
      Toastr.error(
        error.response.data.error.details || DEFAULT_ERROR_NOTIFICATION
      );
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      abp.event.trigger(Constants.EVENT.LOADING, false);
      Toastr.error(
        error.response.data.error.message || DEFAULT_ERROR_NOTIFICATION
      );
    } else if (!error.response) {
      abp.event.trigger("LOADING", false);
      Toastr.error(DEFAULT_ERROR_NOTIFICATION);
    }

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
