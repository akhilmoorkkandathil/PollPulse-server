import { Socket, Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import JwtControllers from './jwt';
import jwt from 'jsonwebtoken';
import ChatUseCases from '../app/use-cases/chatUseCases';
import UsersUseCases from '../app/use-cases/userUseCase';
import { PollUseCase } from '../app/use-cases/pollUseCases';


interface DecodedToken {
    clientId: string;
}

export interface AuthenticatedSocket extends Socket {
    decoded?: DecodedToken;
}

const jwtController = new JwtControllers();
const chatUseCase = new ChatUseCases();
const userUseCase = new UsersUseCases();
const pollUsecase = new PollUseCase()




// Centralized token verification function
const verifyToken = (token: string, refreshToken: string, socket: AuthenticatedSocket, next: (err?: any) => void) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, async (err: any, decoded: any) => {
        if (err) {
            if (refreshToken) {
                try {
                    const tokens = await jwtController.socketRefresh(refreshToken);
                    if (tokens) {
                        socket.emit('tokens-updated', tokens);
                        jwt.verify(tokens.accessToken, process.env.JWT_SECRET_KEY as string, (err: any, decoded: any) => {
                            if (err) return next(new Error('Failed to verify new access token'));
                            socket.decoded = decoded;
                            next();
                        });
                    } else {
                        return next(new Error('Failed to refresh token'));
                    }
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    return next(new Error('Failed to refresh token'));
                }
            } else {
                return next(new Error('Invalid token'));
            }
        } else {
            socket.decoded = decoded;
            next();
        }
    });
};

export const setUpSocketIO = (server: HttpServer): void => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:4200", // Restrict to your domain
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.use(async (socket: AuthenticatedSocket, next) => {
        const token: string | undefined = socket.handshake.query.token as string | undefined;
        const refreshToken: string | undefined = socket.handshake.query.refreshToken as string | undefined;

        if (!token) return next(new Error('Token is missing'));

        try {
            verifyToken(token, refreshToken || '', socket, next);
        } catch (error) {
            console.error('Authentication error:', error);
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.join('room-abc');

        socket.on('sendMessage', async (message: string) => {
            try {
                const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
                const { senderId, content } = parsedMessage;
                console.log(senderId,content);
                
                if (!senderId || !content) {
                    console.error('Invalid group message format:', parsedMessage);
                    return;
                }
                const userData = await userUseCase.getUserById(senderId);
                let userName = userData.data.userName
                const savedMessage = await chatUseCase.sendMessage(senderId, content);
                if (savedMessage) {
                    io.to('room-abc').emit('receiveMessage', {
                        senderId,
                        userName: userName.toUpperCase(),
                        content,
                        timestamp: new Date(),
                    });
                    console.log(`Message from ${senderId} to group 'room-abc': ${content}`);
                } else {
                    console.error('Failed to save message:', content);
                }
            } catch (error) {
                console.error('Error parsing group message:', error);
            }
        });


        socket.on('submitVote', async (pollData) => {
            try {
              console.log('Vote submitted:', pollData);
          
              //Update the poll data via use case
              const response = await pollUsecase.updatePollData(pollData);
          
              if (response.status === 200) {
                // Broadcast the updated poll data to all clients
                io.emit('updatePoll', pollData); // Sends to everyone including the sender
              } else {
                console.error('Error updating poll:', response.message);
              }
            } catch (error) {
              console.error('Error handling vote submission:', error);
            }
          });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};





