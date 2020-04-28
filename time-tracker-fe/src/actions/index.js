import {
  RANGE_SELECTED,
  FETCH_RECORDS,
  SAVE_RECORD,
  UPDATE_CURRENT_RECORD
} from "./types";
import server from "../apis/server";
import { rangeToStartDate } from "../utils";

const selectRange = range => {
  return {
    type: RANGE_SELECTED,
    payload: range
  };
};

const updateCurrentRecord = record => {
  return {
    type: UPDATE_CURRENT_RECORD,
    payload: record
  };
};

const fetchRecords = () => async (dispatch, getState) => {
  const since = rangeToStartDate(getState().range);
  const response = await server.get(`/records?start=${since}`);

  dispatch({
    type: FETCH_RECORDS,
    payload: response.data
  });
};

const saveRecord = record => async dispatch => {
  const response = await server.post(`/records`, record);

  dispatch({
    type: SAVE_RECORD,
    payload: response.data
  });
};

const saveRecordAndFetchRecords = record => async (dispatch, getState) => {
  await dispatch(saveRecord(record));

  const since = rangeToStartDate(getState().range);
  dispatch(fetchRecords(since));
};

const selectRangeAndFetchRecords = range => async dispatch => {
  dispatch(selectRange(range));

  const since = rangeToStartDate(range);
  dispatch(fetchRecords(since));
};

export {
  updateCurrentRecord,
  fetchRecords,
  saveRecordAndFetchRecords,
  selectRangeAndFetchRecords
};
