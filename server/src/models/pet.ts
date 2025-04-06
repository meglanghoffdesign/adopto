import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface PetAttributes {
  id: number;
  petfinder_id: string | null; // Petfinder ID
  name: string;
  species: string;
  breed: string;
  size: string;
  gender: string | null;
  age: string | null;
  color: string | null;
  coat: string | null;
  status: string;
  organization_id: number;
  good_with_children: boolean | null;
  good_with_dogs: boolean | null;
  good_with_cats: boolean | null;
  house_trained: boolean | null;
  declawed: boolean | null;
  special_needs: boolean | null;
  location: string | null;
  distance: number;
  photo_url: string | null;
  adopt_url: string | null;
  description: string | null;
  published_at: Date | null;
  fetch_timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface PetCreationAttributes extends Optional<PetAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Pet extends Model<PetAttributes, PetCreationAttributes> implements PetAttributes {
  public id!: number;
  public petfinder_id!: string | null;
  public name!: string;
  public species!: string;
  public breed!: string;
  public size!: string;
  public gender!: string | null;
  public age!: string | null;
  public color!: string | null;
  public coat!: string | null;
  public status!: string;
  public organization_id!: number;
  public good_with_children!: boolean | null;
  public good_with_dogs!: boolean | null;
  public good_with_cats!: boolean | null;
  public house_trained!: boolean | null;
  public declawed!: boolean | null;
  public special_needs!: boolean | null;
  public location!: string | null;
  public distance!: number;
  public photo_url!: string | null;
  public adopt_url!: string | null;
  public description!: string | null;
  public published_at!: Date | null;
  public fetch_timestamp!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function PetFactory(sequelize: Sequelize): typeof Pet {
  Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      petfinder_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'adoptable',
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      good_with_children: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      good_with_dogs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      good_with_cats: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      house_trained: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      declawed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      special_needs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      photo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adopt_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      published_at: {
        type: DataTypes.DATE,  // Change this to DATE
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      fetch_timestamp: {
        type: DataTypes.DATE,  // Change this to DATE
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'pets',
      sequelize,
      timestamps: true, // Ensures Sequelize handles the timestamps
    }
  );

  return Pet;
}