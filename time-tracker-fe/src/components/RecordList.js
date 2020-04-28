import React, { Component } from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Record from "./Record";
import { fetchRecords } from "../actions";
import { formatDate } from "../utils";
import { RANGES } from "../constants";
import Typography from "@material-ui/core/Typography";

export class RecordList extends Component {
  componentDidMount() {
    this.props.fetchRecords();
  }

  renderDateHeader(prev, current) {
    const { multipleDays } = this.props;
    if (!multipleDays) {
      return "";
    }
    const finishDate = formatDate(current.finish);
    const prevDate = prev ? formatDate(prev.finish) : null;

    if (finishDate !== prevDate) {
      return (
        <div>
          <Typography variant={"button"}>{finishDate}</Typography>
        </div>
      );
    }
  }

  renderList(records) {
    return records.map((record, i, arr) => {
      const isNotLast = i < arr.length - 1;
      return (
        <div key={record.id}>
          {this.renderDateHeader(arr[i - 1], record)}
          <Record record={record} />
          {isNotLast && <Divider variant="middle" />}
        </div>
      );
    });
  }

  render() {
    const { records } = this.props;
    return (
      <div>
        <List component="nav" aria-label="previous records">
          {records.length === 0 && (
            <Typography align={"center"}>No Records</Typography>
          )}
          {this.renderList(records)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { records: state.records, multipleDays: state.range !== RANGES.TODAY };
};
export default connect(mapStateToProps, { fetchRecords })(RecordList);
