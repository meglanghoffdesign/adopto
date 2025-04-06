import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { PetFactory } from './pet.js';
import { FavoriteFactory } from './favorite.js';
import { OrganizationFactory } from './organization.js';
const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
// Initialize models
const User = UserFactory(sequelize);
const Pet = PetFactory(sequelize);
const Favorite = FavoriteFactory(sequelize);
const Organization = OrganizationFactory(sequelize);
// Define associations (relationships between models)
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });
Pet.hasMany(Favorite, { foreignKey: 'petId' });
Favorite.belongsTo(Pet, { foreignKey: 'petId' });
Organization.hasMany(Pet, { foreignKey: 'organizationId' });
Pet.belongsTo(Organization, { foreignKey: 'organizationId' });
export { sequelize, User, Pet, Favorite, Organization };
