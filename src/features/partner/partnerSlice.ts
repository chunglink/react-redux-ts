import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import PartnerState from "./types/partnerState";

const initialState: PartnerState = {
  totalRecord: 1,
  partnerList: [
    {
      pa_id: 1,
      pa_code: "DT0001",
      pa_name: "Đối tác số 1",
      pa_note: "",
    },
  ],
};
export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {},
});

export const partners = (state: RootState) => state.partner.partnerList;
export const totalPartners = (state: RootState) => state.partner.totalRecord;
export default partnerSlice.reducer;
