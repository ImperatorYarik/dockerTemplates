// socket-service/index.js
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const io = new Server({
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:80",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Example: Join a room
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Example: Send message to room
    socket.on('send_message', (data) => {
        io.to(data.roomId).emit('receive_message', {
            message: data.message,
            sender: socket.id,
            timestamp: new Date()
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.SOCKET_PORT || 3001;
io.listen(PORT);
console.log(`Socket.IO server running on port ${PORT}`);