import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define a type-safe structure for quiz parameters
export interface QuizParams {  // Add export here
  allergies?: string[]; // e.g., ["dogs"]
  livingSituation?: 'apartment' | 'house_no_yard' | 'house_with_yard';
  hasKids?: boolean;
  hasOtherPets?: boolean;
  availableTime?: 'low' | 'medium' | 'high'; // maps to pet age
  activityLevel?: 'low' | 'medium' | 'high'; // maps to pet size
  location?: string;
  distance?: number;
}

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  quiz_parms: QuizParams;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public quiz_parms!: QuizParams;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public static async setPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
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
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          user.password = await User.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          user.password = await User.setPassword(user.password);
        },
      },
    }
  );

  return User;
}