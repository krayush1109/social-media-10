/*
! What is Socket IO ?
Socket: Represents a single user/browser connection.
io: Represents the server instance.
emit: Sends a message/event.
on: Receives a message/event.
*/

const UserCollection = require("./models/user.schema");

const io = require("socket.io")();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
    console.log("A user connected");

    // console.log(socket.id);
    // console.log(socket.connected);
    
    socket.on('join', async (username) => {
        const user = await UserCollection.findOneAndUpdate({ username: username }, { socketId: socket.id })
        // console.log(username)
        // console.log(socket.id)
    })

});
// end of socket.io logic

module.exports = socketapi;