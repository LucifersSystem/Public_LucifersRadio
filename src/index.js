"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const CAIDATA_1 = require("./Classes/CAIDATA");
// @ts-ignore
const Log_1 = require("./Classes/Log");
const wss_port = 6550;
const httpServer = require("http").createServer();
const io = require('socket.io')(httpServer, { pingTimeout: 60000, allowEIO3: true, origin: "*",
    methods: ["GET", "POST", "OPTIONS"], transports: ['websocket', 'polling', 'flashsocket'] }).listen(wss_port);
let Curr_talking = 0;
io.on("connection", (socket) => {
    (0, Log_1.Info)("Connection from: " + socket.id);
    // receive a message from the client
    socket.on("vc_leave", (OldChannel) => {
        //Leaves Channel
        try {
            socket.leave(OldChannel);
        }
        catch (err) {
        }
    });
    socket.on("vc_join", (NewChannel) => {
        //Joins the channel
        try {
            socket.join(NewChannel);
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
    // @ts-ignore
    socket.on("vc_packet", (Channel, Data) => {
        if (Curr_talking == 0 || Curr_talking == socket.id) {
            Curr_talking = socket.id;
            // socket.broadcast.to(Channel).emit("voice_packet", Data);
            socket.broadcast.to(Channel).emit("vc_packet", Data);
            // socket.broadcast.emit("vc_packet", Data);
            socket.broadcast.to(Channel).emit('CAIData', {
                key: "4B89FD28EF4705DE864A651B07C8666C",
                messageID: 6000,
                packet: new CAIDATA_1.CAIDATA(6000, 0, "0", "0", 0)
            });
        }
    });
    socket.on("disconnect", (Data) => {
        //Disconnects Client Socket
        try {
            socket.disconnect(true);
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
    socket.on("systemTx", (key, talkgroup, subscriber) => {
        //...If someone is transmitting
        try {
            socket.broadcast.emit("systemTx", { key: key, talkgroup: talkgroup, subscriber: subscriber });
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
    socket.on("systemRelease", (key, talkgroup) => {
        //
        try {
            socket.broadcast.emit("systemRelease", { key: key, talkgroup: talkgroup });
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
    socket.on("VoiceRelease", () => {
        //Triggered on last voice packet
        try {
            Curr_talking = 0;
            socket.emit('CAIData', {
                key: "4B89FD28EF4705DE864A651B07C8666C",
                messageID: 6001,
                packet: new CAIDATA_1.CAIDATA(6001, 0, "0", "0", 0)
            });
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
    socket.on("systemTone", (key, talkgroup, subscriber, tone1, tone2, type) => {
        //...Emits tones
        try {
            socket.broadcast.emit("systemTone", {
                key: key,
                talkgroup: talkgroup,
                subscriber: subscriber,
                tone1: tone1,
                tone2: tone2,
                type: type
            });
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
    socket.on("CAIData", (obj) => {
        //...SENDS CAI DATA
        try {
            let CIADATA = obj.packet;
            let AuthKey = obj.key;
            let subid = CIADATA.subscriber;
            let MessageID = (0, CAIDATA_1.GetName)(CIADATA.messageID.toString());
            if (MessageID === "REGISTER") {
                //Register CAI Client --Usually Panel
                socket.emit('CAIData', {
                    messageID: 0x210,
                    packet: new CAIDATA_1.CAIDATA((0, CAIDATA_1.get_rawID)("REGISTRATION_OK"), 0, subid, "0", 0)
                });
            }
            // @ts-ignore
            if (MessageID === "AFFILIATE") {
                socket.emit('CAIData', {
                    key: "4B89FD28EF4705DE864A651B07C8666C",
                    messageID: 0x220,
                    packet: new CAIDATA_1.CAIDATA((0, CAIDATA_1.get_rawID)("AFFILIATE_OK"), 0, subid, "1", 0)
                });
            }
            // @ts-ignore
            if (MessageID === "CHANNEL_REQ") {
                socket.emit('CAIData', {
                    key: "4B89FD28EF4705DE864A651B07C8666C",
                    messageID: 0x241,
                    packet: new CAIDATA_1.CAIDATA(577, 0, subid, CIADATA.payload, CIADATA.messageKey)
                });
            }
            socket.broadcast.emit('CAIData', {
                key: "4B89FD28EF4705DE864A651B07C8666C",
                messageID: (0, CAIDATA_1.get_NormalID)(MessageID),
                packet: new CAIDATA_1.CAIDATA((0, CAIDATA_1.get_NormalID)(MessageID), subid, -1, CIADATA.payload, CIADATA.messageKey)
            });
            socket.on("Heartbeat", () => {
                //...
                try {
                    socket.emit("Heartbeat");
                    console.log("Heartbeat");
                }
                catch (err) {
                    socket.emit("error", String(err));
                }
            });
            socket.on("ping", () => {
                //ping from client to server
                try {
                    socket.emit("pong");
                }
                catch (err) {
                    socket.emit("error", String(err));
                }
            });
            socket.on("dispatcherInhibit", (key, inhibited, subscriberID) => {
                //From Dispatch panel
            });
            socket.on("getTalkgroupSubscribers", (key, tg) => {
                //From Dispatch panel
            });
            socket.on("message", (message) => {
                //From Dispatch panel
                console.log("Message from websocket: " + String(message));
                socket.emit("Success");
            });
        }
        catch (err) {
            socket.emit("error", String(err));
        }
    });
});
