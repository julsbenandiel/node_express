dotenv.config({ path: "./global_variables.env" })

import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

export const app = express();

//database conenction
import db from './db'

//routes
import UserRoutes from './routes/userRoutes'
import PostRoutes from './routes/postRoutes'

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', UserRoutes);
app.use('/post', PostRoutes)

//models
import User from './models/User'
import Post from './models/Post'

User.hasMany(Post);
Post.belongsTo(User);

db
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT, () =>
            console.log(`🚀 Server ready at ${process.env.PORT}`)
        );
    })
    .catch(err => console.log(err));
