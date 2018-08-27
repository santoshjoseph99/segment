## High-level architecture overview
The server uses web sockets to communicate real-time messages to clients.  I used websockets because of the [availability](https://caniuse.com/#feat=websockets) across browsers.  The two way communication aspect of websockets is not used in this project, but the client could send the pause event and searches to the server where the pausing or filtering could happen.

The client is a React application.

## What the code does:
The server starts up reading the redis channel and starts a websocket server.  A client connects using the a browser web socket.  Messages are pushed onto the web socket and any client subscribed will receive the messages.  Since the messages are coming at a speed which a user will have a hard time seeing the messages, the client slows down the displaying of the messages.  The client also will keep at most 10000 messages (this is an arbitrary number) so that browser will not use too much memory. I also use a virtual list so any the items that are in the viewport are only rendered in the DOM.

## How to run:
  * Clone the repo: https://github.com/santoshjoseph99/segment.git
  * cd segment
  * run: make test
  * open another terminal. run: docker-compose up
  * open another terminal. cd into debugger-server and run: npm run start
  * open another terminal, cd into debugger-client and run: npm run start

### How long you spent on each part of the project.
  * I spent a couple hours on the server (haven't used redis before or websockets).
  * I spent about 5 hours on the client.

### A list of the requirements that you did not implement
  * Testing was not finished due to some time constraints.

### Proposal for ideal “production” state
  * server
    - logging for connections
    - logging for errors
    - configuration
  * client
    - tracking (events for clicks & searches)
    - logging errors (sent to server)
    - configuration (sent from server)

## How would you deploy this service.
  * The server can be deployed on any linux box.
  * The client would be deployed with the server.

## How you would scale the backend service
  * There could be multiple ways but I'm thinking one way would be is to create a queue (maybe even use a redis database) that has publish/subscribe function.  When a client connects it is actually connecting to a queue.