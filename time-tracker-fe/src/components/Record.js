import React from "react";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import { formatTime, formatDuration } from "../utils";

export default function Record(props) {
  const { name, start, finish } = props.record;
  const total = finish - start;
  return (
    <div>
      <ListItem justify="flex-start">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ListItemText primary={name} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText
              secondary={formatTime(start) + " - " + formatTime(finish)}
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText primary={formatDuration(total)} />
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
}
