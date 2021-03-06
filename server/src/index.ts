import 'reflect-metadata';
import {MikroORM} from "@mikro-orm/core";
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import {UserResolver} from "./resolvers/user";
import Redis from 'ioredis';
import session from "express-session";
import connectRedis from 'connect-redis';
import {__prod__, COOKIE_NAME} from "./constants";
import {MyContext} from "./types";
import cors from 'cors';

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const app = express();

    const RedisStore = connectRedis(session)
    const redis = new Redis();

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));
    app.set('trust proxy', 1);
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: Redis as any,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__ // cookie only works in https
            },
            saveUninitialized: false,
            secret: 'asdasdasdasdasdasdasdasdasd',
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({req,res}): MyContext => ({em: orm.em, req, res,redis})
    })

    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: false
        }
    });

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main().catch(err => {
    console.error(err)
});