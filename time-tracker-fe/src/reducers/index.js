import { combineReducers } from "redux";
import {
  RANGE_SELECTED,
  FETCH_RECORDS,
  UPDATE_CURRENT_RECORD
} from "../actions/types";
import { RANGES } from "../constants";

const recordsReducer = (records = [], action) => {
  switch (action.type) {
    case FETCH_RECORDS:
      return action.payload;
    default:
      return records;
  }
};

const rangeReducer = (range = RANGES.TODAY, action) => {
  switch (action.type) {
    case RANGE_SELECTED:
      return action.payload;
    default:
      return range;
  }
};

const currentRecordReducer = (record = {}, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_RECORD:
      if (action.payload === null) {
        return {};
      }
      return { ...record, ...action.payload };
    default:
      return record;
  }
};

export default combineReducers({
  records: recordsReducer,
  range: rangeReducer,
  currentRecord: currentRecordReducer
});
