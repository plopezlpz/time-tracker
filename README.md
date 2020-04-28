# Time tracker

The application consists of front end written in react-redux and backend in golang

## Running
- Start Postgres DB in docker:
```sh
cd pg-docker
docker-compose up
```
- Start backend
```sh
cd time-tracker-be
make run
```
- Start front end
```sh
cd time-tracker-fe
npm install
npm run start
```

## Synopsis
The application is quite simple, the backend is a REST web service that connects to a postgres database, it only adds and lists the recorded times, it cannot update them. Pagination is not implemented.

A user can set a name for a time record session and start the timer, once the user stops the timer, the session will be sent to the back end to be persisted and the UI will show the updated list of sessions.

## Limitations
- User management is not implemented, there are no users therefore these sessions don't belong to anyone.
- Pagination is not implemented neither in BE or FE, if we save too many sessions there will be performance issues in FE to render all these records and in BE to retrieve them from the BD and through the network
- The current running session is only saved in the redux store, that means that you can open two tabs and start multiple sessions at the same time without realizing that another session is running in another tab.
- Errors are not handled in the FE, if the backend returns a 400 error, the front end will only display that in the console
- Time sessions cannot be updated or deleted
