import { shallow } from "enzyme";
import React from "react";
import Record from "./Record";
import { RecordList } from "./RecordList";
import { ListItemText } from "@material-ui/core";

describe("RecordList", () => {
  it("render - records are displayed", () => {
    const wrapper = buildComponent({
      record: { name: "my record", start: 1579531203, finish: 1579533203 },
    });
    const items = wrapper.find(ListItemText);
    expect(items.length).toEqual(3);
    expect(items.at(0).props().primary).toEqual("my record");
    expect(items.at(1).props().secondary).toEqual("16:40:03 - 17:13:23");
    expect(items.at(2).props().primary).toEqual("00:33:20");
  });
});

function buildComponent(props) {
  return shallow(<Record {...props} />);
}
