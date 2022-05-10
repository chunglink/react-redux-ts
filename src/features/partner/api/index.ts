import axios, { AxiosResponse } from "axios";
import mockAdapter from "axios-mock-adapter";
import PartnerDto from "../types/partnerDto";

const mock = new mockAdapter(axios);
mock.onPost("/addPartner").reply(200, {
  pa_name: "test 1",
  pa_note: "note 1",
});

export function addPartner(partner: PartnerDto) {
  return axios.post("/addPartner", {
    pa_name: partner.pa_name,
    pa_note: partner.pa_note,
  });
}
