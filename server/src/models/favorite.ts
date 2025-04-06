import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface FavoriteAttributes {
  id: number;
  userId: number;
  petId: number;
}

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> {}

export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public petId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function FavoriteFactory(sequelize: Sequelize): typeof Favorite {
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'favorites',
      sequelize,
    }
  );

  return Favorite;
}