# Project Name

## Purpose
The purpose of this app is to demonstrate the use of Socket IO in a real-time chat application. 

## Features

- User created chat rooms
- Rooms are joinable with their IDs
- Messages sent in a chat room are only seen in that chat room
- Status indicators for when users are typing or idle
  - These events use throttleing to limit the amount of requests made to the server

## Installation

To use the app, you must have Node.js and npm installed on your machine.

To install the app, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the command `npm install` to install the required dependencies.
4. Start the server by running `npm start`.
5. Open a web browser and navigate to `http://localhost:3000` to use the app.

## Usage

When you navigate to the app in a browser, you will see a menu that allows you to join or create a chat room. To create a new chat room, click the "Create Room" button and a unique chat room ID will be generated for you. Enter a username and the chat room ID, then click the "Join" button to enter the chat room you created.

Once you are in a chat room, you can enter text in the message form at the bottom of the view and click the "Submit" button to send a message to the chat room. To invite other users to join the chat room, give them the chat room ID displayed at the top of the chat room view. When other users join, they can also send messages that everyone in the chat room can see.

To the left of the chat room view is a list of users that are currently in the same chat room. The light to the left of their name indicates their activity status: green for active and yellow for idle. When a user starts typing in the message form, a "typing..." indicator will appear next to their name for everyone to see.

To leave the chat room, click the "Leave" button at the top right corner of the chat room view. This will take you back to the main menu.


## Components

### Client
- Join Chat Room Form
- Chat Room
- DOM Handlers
- Socket Handlers

### Server
- Chat Room Store
- User Store
- Socket Handlers

## Future Additions
- User authentication
- "Away" status
- Animations
- Mobile responsiveness



