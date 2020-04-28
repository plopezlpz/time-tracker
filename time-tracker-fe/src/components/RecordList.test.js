import { Typography } from "@material-ui/core";
import { shallow } from "enzyme";
import React from "react";
import Record from "./Record";
import { RecordList } from "./RecordList";

describe("RecordList", () => {
  it("render - records are displayed", () => {
    const mockFetch = jest.fn(() => {});
    const wrapper = buildComponent({
      records: [
        { id: 1, finish: 4 },
        { id: 2, finish: 3 },
        { id: 3, finish: 2 },
        { id: 4, finish: 1 }
      ],
      multipleDays: false,
      fetchRecords: mockFetch
    });
    expect(wrapper.find(Record).length).toBe(4);
  });

  it("no records", () => {
    const mockFetch = jest.fn(() => {});
    const wrapper = buildComponent({
      records: [],
      multipleDays: false,
      fetchRecords: mockFetch
    });
    expect(wrapper.find(Typography).props().children).toEqual("No Records");
  });
});

function buildComponent(props) {
  return shallow(<RecordList {...props} />);
}
