import sequalize from 'sequelize'
export default {
    schemaName: 'users',
    schema: {
        name: { type: sequalize.STRING },
        username: { type: sequalize.STRING, unique: true},
        password: { type: sequalize.STRING },
    }

}