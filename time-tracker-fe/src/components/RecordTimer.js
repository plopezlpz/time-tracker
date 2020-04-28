import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Box
} from "@material-ui/core";
import Stop from "@material-ui/icons/Stop";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { connect } from "react-redux";
import { saveRecordAndFetchRecords, updateCurrentRecord } from "../actions";
import moment from "moment";
import { formatDuration } from "../utils";

export class RecordTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  onChangeName(e) {
    const { updateCurrentRecord } = this.props;
    updateCurrentRecord({ name: e.target.value });
  }

  onStart() {
    const { updateCurrentRecord } = this.props;
    const started = moment().unix();
    updateCurrentRecord({ start: started });

    this.timerInterval = setInterval(() => {
      this.setState(() => ({
        count: moment().unix() - started
      }));
    }, 1000);
  }

  onStop() {
    const {
      updateCurrentRecord,
      saveRecordAndFetchRecords,
      record
    } = this.props;
    clearInterval(this.timerInterval);
    this.setState({ count: 0 });
    updateCurrentRecord(null);
    saveRecordAndFetchRecords({ ...record, finish: moment().unix() });
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    const { record } = this.props;
    const { count } = this.state;
    const timer = formatDuration(count);
    return (
      <Box paddingLeft={3}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={8}>
            <TextField
              label="Name"
              value={record.name || ""}
              size="small"
              inputProps={{ maxLength: 100 }}
              onChange={this.onChangeName.bind(this)}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>{timer}</Typography>
          </Grid>
          <Grid item xs={2}>
            {!Boolean(record.start) && (
              <IconButton
                color="primary"
                aria-label="start"
                disabled={!Boolean(record.name)}
                onClick={this.onStart.bind(this)}
              >
                <PlayCircleFilledWhiteIcon fontSize="large" />
              </IconButton>
            )}
            {Boolean(record.start) && (
              <IconButton
                color="primary"
                aria-label="stop"
                onClick={this.onStop.bind(this)}
              >
                <Stop fontSize="large" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return { record: state.currentRecord };
};
export default connect(mapStateToProps, {
  saveRecordAndFetchRecords,
  updateCurrentRecord
})(RecordTimer);
