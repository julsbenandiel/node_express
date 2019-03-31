import Sequelize from "sequelize";
import db from '../db'

const Post = db.define(
    "posts",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: Sequelize.STRING,
        body: Sequelize.STRING,
    }
);

export default Post;