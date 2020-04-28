import React from "react";
import { shallow } from "enzyme";
import { RecordTimer } from "./RecordTimer";
import { IconButton, TextField, Typography } from "@material-ui/core";
import moment from "moment";

describe("RecordTimer tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("render", () => {
    const wrapper = buildComponent({
      record: {}
    });
    expect(wrapper.find(TextField).props().label).toBe("Name");
    expect(wrapper.find(IconButton).props().disabled).toBeTruthy();
  });

  it("on name input - update current record", () => {
    const mockUpdateFn = jest.fn(() => {});
    const wrapper = buildComponent({
      record: {},
      updateCurrentRecord: mockUpdateFn
    });
    wrapper.find(TextField).simulate("change", { target: { value: "foo" } });
    expect(mockUpdateFn.mock.calls.length).toBe(1);
    expect(mockUpdateFn.mock.calls[0][0]).toEqual({ name: "foo" });
  });

  it("on start - timer is running", () => {
    const mockUpdateFn = jest.fn(() => {});
    const wrapper = buildComponent({
      record: {
        name: "foo"
      },
      updateCurrentRecord: mockUpdateFn
    });
    expect(wrapper.find(IconButton).props().disabled).toBeFalsy();

    mockTime(0);
    expect(wrapper.find(Typography).props().children).toEqual("00:00:00");
    wrapper.find(IconButton).simulate("click");

    mockTime(2000);
    jest.advanceTimersByTime(1000);
    wrapper.update();

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Typography).props().children).toEqual("00:00:02");
  });

  it("on stop - record is saved and timer cleared", () => {
    const mockUpdateFn = jest.fn(() => {});
    const mockSaveAndFetch = jest.fn(() => {});
    const wrapper = buildComponent({
      record: {
        name: "foo",
        start: 1
      },
      updateCurrentRecord: mockUpdateFn,
      saveRecordAndFetchRecords: mockSaveAndFetch
    });
    mockTime(5000);
    wrapper.find(IconButton).simulate("click");

    jest.advanceTimersByTime(1000);
    wrapper.update();

    // Clears current record
    expect(mockUpdateFn.mock.calls.length).toBe(1);
    expect(mockUpdateFn.mock.calls[0][0]).toBeNull();
    // Saves current record and re-fetches
    expect(mockSaveAndFetch.mock.calls.length).toBe(1);
    expect(mockSaveAndFetch.mock.calls[0][0]).toEqual({
      name: "foo",
      start: 1,
      finish: 5
    });
  });
});

function mockTime(ms) {
  moment.now = function() {
    return new Date(ms);
  };
}

function buildComponent(props) {
  return shallow(<RecordTimer {...props} />);
}
