## FE 

### Component overview
RecordTimer
- reads/writes `currentRecord` 
- Displays the current session, starts and stops the timer
- saves current record and re-fetch the records to include the newly created record

RecordMenu
- reads/writes `range` 
- fetches the records on select

RecordList
- reads `records`
- fetches the records on mounting component

### State overview
```
records: []{id,
            name,
            start,
            finish,
            duration}

range: {TODAY, THIS_WEEK, THIS_MONTH}

currentRecord: {name,
                start,
                finish}
```

### Redux cycle overview:
Action Creator -> produces -> Action of type -> sent to -> Reducer -> creates new state

```
Action Creator              | Action(s) of type      | Reducer creates new state that
-------------------------------------------------------------------------------------
selectRangeAndFetchRecords -> RANGE_SELECTED        -> Updates the dropdown menu
(fetchRecords)                FETCH_RECORDS (async) -> Updates the record list
-------------------------------------------------------------------------------------
saveRecordAndFetchRecords  -> SAVE_RECORD           -> Updates the dropdown menu
(fetchRecords)                FETCH_RECORDS (async) -> Updates the record list
-------------------------------------------------------------------------------------
updateCurrentRecord        -> UPDATE_CURRENT_RECORD -> Updates the current record
                                                       (Also used for reseting)

```

## BE

- Schema has an index on `finish` to allow for fast retrieval
- Migration will happen if the `dbmigration` flag is provided
- Two endpoints available:
```
GET /records?start=<int>

POST /records
{
  name: string,
  start: int64
  finish: int64
}
```
- In package `main` we have the entrypoint of the app together with http headers, db connection setup and migration.
- Package `models` contains the record and the record store (with implementation in postgres)
- Package `handlers` contains the endpoint implementation, it will call to the store in `models`