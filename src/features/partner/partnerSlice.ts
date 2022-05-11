import PartnerDto from "@/features/partner/interfaces/partnerDto";
import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPartner } from "./api";
import PartnerState from "./interfaces/partnerState";
export const addPartnerAsync = createAsyncThunk(
  "partner/add",
  async (input: PartnerDto) => {
    const response = await addPartner(input);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
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

  extraReducers: (builder) => {
    builder
      .addCase(addPartnerAsync.fulfilled, (state, action) => {
        state.totalRecord++;
        state.partnerList.push({
          pa_id: state.partnerList.length + 1,
          pa_code: "DT000" + (state.partnerList.length + 1),
          pa_name: action.payload.pa_name,
          pa_note: action.payload.pa_note,
        });
      })
      .addCase(addPartnerAsync.rejected, (state) => {});
  },
});

export const partners = (state: RootState) => state.partner.partnerList;
export const totalPartners = (state: RootState) => state.partner.totalRecord;
export default partnerSlice.reducer;
