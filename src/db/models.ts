import { DataTypes } from "sequelize";
import sequelize from "./db";

export const ItemData = sequelize.define("itemData", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  itemName: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  itemPrice: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false,
  },
  itemAtbCardPrice: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: true,
  },
  itemNonActionPrice: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: true,
  },
  itemPhoto: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  itemLink: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  tgId: {
    type: DataTypes.BIGINT,
    unique: true,
    allowNull: false,
  },
});

export const TrackedItems = sequelize.define("trackedItems", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
  },
  itemDataId: {
    type: DataTypes.INTEGER,
    references: {
      model: ItemData,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
  },
});

User.belongsToMany(ItemData, {
  through: TrackedItems,
  foreignKey: "userId",
});

ItemData.belongsToMany(User, {
  through: TrackedItems,
  foreignKey: "itemDataId",
});
