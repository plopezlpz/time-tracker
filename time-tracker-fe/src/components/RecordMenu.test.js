import { Select } from "@material-ui/core";
import { shallow } from "enzyme";
import React from "react";
import { RecordMenu } from "./RecordMenu";
import { RANGES } from "../constants";

describe("RecordMenu", () => {
  it("render - default value is today", () => {
    const wrapper = buildComponent({
      range: RANGES.TODAY
    });
    expect(wrapper.find(Select).props().value).toEqual(RANGES.TODAY);
  });

  it("on change - select range and fetch records", () => {
    const mockSetRangeAndFetch = jest.fn(() => {});
    const wrapper = buildComponent({
      range: RANGES.TODAY,
      selectRangeAndFetchRecords: mockSetRangeAndFetch
    });
    wrapper
      .find(Select)
      .simulate("change", { target: { value: RANGES.THIS_WEEK } });
    expect(mockSetRangeAndFetch.mock.calls.length).toBe(1);
    expect(mockSetRangeAndFetch.mock.calls[0][0]).toEqual(RANGES.THIS_WEEK);
  });
});

function buildComponent(props) {
  return shallow(<RecordMenu {...props} />);
}
