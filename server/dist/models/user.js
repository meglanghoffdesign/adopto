import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class User extends Model {
    // Hash the password before saving the user
    static async setPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quiz_parms: {
            type: DataTypes.JSONB,
            defaultValue: {},
        },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await User.setPassword(user.password);
            },
            beforeUpdate: async (user) => {
                user.password = await User.setPassword(user.password);
            },
        },
    });
    return User;
}
