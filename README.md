# pomoparty

Pomodoro app with shared sessions

Frontend: React (Typescript)
Backend: Rocket (Rust)
Database: TBD (most likely document-based like MongoDB/DynamoDB)
Server: TBD (most likely Netlify + AWS or personal VPS)

## Design

### Timer
- fe manages timer
- be relaying start/stop to other fe's
    - be maybe does sync on every action
        - with a tolerance maybe

### Shared Timers (Rooms)
- be manages shared timers
    - fe sends http request to find/join rooms
- every time person connects to socket, they get a new id
    - use this as id for actions


## Events
- pomodoro actions (i.e. start, stop, skip)
    - take room id, user id

rooms
- join
    - connect to socket
    - give room code
        - maybe passcode if exists

- search?
