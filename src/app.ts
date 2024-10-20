import { Application, NextFunction } from "express";
import express from "express";
import http from 'http'
import cors from 'cors'
import connectToDatabase from './config/connectDb';
import route from "./app/routes/routes";
import corsOptions from "./config/cors";
import { error } from "console";
import { errorResponse } from "./utils/response";
import { StatusCode } from "./interfaces/enum";
import { setUpSocketIO } from "./services/socket";
// import compression from 'compression'
// import helmet from "helmet";
// import cookieParser from 'cookie-parser'
// import logger from 'morgan'
// import { setUpSocketIO } from "./services/socket";
// import { limiter } from './utils/rateLimitter'

class App{
    public app:Application;
    server:http.Server<typeof http.IncomingMessage,typeof http.ServerResponse>

    constructor(){
        this.app=express()
        this.server=http.createServer(this.app)
        this.applyMiddleware()
        this.routes()
        connectToDatabase()

        setUpSocketIO(this.server)
    }

    private hello(){
        console.log("Thsi hellow function callled");
        
    }

    private applyMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.options('*', cors(corsOptions));
        this.app.use(
          cors(corsOptions)
        );
        // this.app.use(compression());
        // this.app.use(helmet());
        // this.app.use(logger("dev"));
        // this.app.use(cookieParser());
        // this.app.use(limiter)
    }

    private routes():void{
        this.app.use('/api/v1',route);
    }

    public startServer(PORT:number):void{
        this.server.listen(PORT,()=>{
            console.log(`server is running  http://localhost:${PORT}`);
            
        })
    }

}
export default App