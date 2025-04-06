import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface OrganizationAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
}

interface OrganizationCreationAttributes extends Optional<OrganizationAttributes, 'id'> {}

export class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> implements OrganizationAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public location!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function OrganizationFactory(sequelize: Sequelize): typeof Organization {
  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'organizations',
      sequelize,
    }
  );

  return Organization;
}