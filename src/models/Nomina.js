import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Nomina extends Model {}

Nomina.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: '2000-01-01',
      },
    },
    recibo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    moneda: {
      type: DataTypes.ENUM('USD', 'Bs'),
      allowNull: false,
      validate: {
        isIn: [['USD', 'Bs']],
      },
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    montoEnLetras: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concepto: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    numeroFactura: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Nomina',
    tableName: 'nominas',
    timestamps: true,
    underscored: true,
  }
);

export default Nomina;