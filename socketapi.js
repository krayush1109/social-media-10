/*
! What is Socket IO ?
Socket: Represents a single user/browser connection.
io: Represents the server instance.
emit: Sends a message/event.
on: Receives a message/event.
*/

const MsgCollection = require("./models/message.schema");
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

    socket.on('join_chat', async (username) => {
        try {
            const user = await UserCollection.findOneAndUpdate({ username: username }, { socketId: socket.id })
            console.log(username)
            console.log("Message Received from the Client to Server");
            // console.log(socket.id)
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('user_message', async (msgObject) => {
        try {
            const receiverUser = await UserCollection.findOne({ username: msgObject.receiver });
            const receiverSocketId = "" || receiverUser.socketId;

            msgObject = {
                ...msgObject,
                thumbnailUrlReceiver: receiverUser.avatar.thumbnailUrl
            }

            // console.log("receiverUser.thumbnailUrl : ", receiverUser.thumbnailUrl);
            // console.log("msgObject : ", msgObject);

            await MsgCollection.create({
                sender: msgObject.sender,
                receiver: msgObject.receiver,
                msg: msgObject.msg,
            })

            socket.to(receiverSocketId).emit('message_received', msgObject)

            // console.log(msgObject.msg, msgObject.receiver, msgObject.sender)
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('start_chat_session', async ({ receiver, sender }) => {
        try {
            const receiverUser = await UserCollection.findOne({ username: receiver });

            let messagesDB = await MsgCollection.find({
                $or: [{
                    sender: sender,
                    receiver: receiver
                },
                {
                    sender: receiver,
                    receiver: sender
                }]
            })         

            console.log(messagesDB);

            // console.log("messages : ", messagesDB);
            socket.emit('start_chat_session', messagesDB, receiverUser.avatar.thumbnailUrl)

        } catch (error) {
            console.log(error)
        }
    })
});
// end of socket.io logic

module.exports = socketapi;