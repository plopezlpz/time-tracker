import React from "react";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";

import { RANGES } from "../constants";

import { selectRangeAndFetchRecords } from "../actions";
import { Select } from "@material-ui/core";

export function RecordMenu(props) {
  const { range, selectRangeAndFetchRecords } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Select
        id="range-select"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={range}
        onChange={e => selectRangeAndFetchRecords(e.target.value)}
      >
        {Object.keys(RANGES).map(r => (
          <MenuItem key={RANGES[r].id} value={RANGES[r]}>
            {RANGES[r].label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

const mapStateToProps = state => {
  return { range: state.range };
};
export default connect(mapStateToProps, { selectRangeAndFetchRecords })(
  RecordMenu
);
