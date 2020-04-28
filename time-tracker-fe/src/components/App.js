import React from "react";
import Container from "@material-ui/core/Container";
import RecordList from "./RecordList";
import RecordTimer from "./RecordTimer";
import { Paper, Box } from "@material-ui/core";
import RecordMenu from "./RecordMenu";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box marginBottom={2} marginTop={2}>
          <Paper elevation={5}>
            <RecordTimer />
          </Paper>
        </Box>

        <RecordMenu />

        <Paper>
          <RecordList />
        </Paper>
      </Container>
    </div>
  );
}

export default App;
