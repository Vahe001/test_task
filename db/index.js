import Sequelize from 'sequelize';
import user from "./user";

export default async function () {
    try {
        const sequelize = new Sequelize(process.env.DB);
        global.USERS = sequelize.define(user.schemaName, user.schema, { freezeTableName: true });
        await global.USERS.sync({});

    } catch (err) {
        console.error(err)
    }
}
