const Sequelize = require('sequelize');
const conn = require('./conn');
const {STRING, VIRTUAL, ENUM, INTEGER, UUID, UUIDV4} = Sequelize;

const Guitar = conn.define('guitar',{
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  ranking: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 5
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      
    },
  },
  brand:{
    type: STRING,
    // allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  bodyType:{
    type: ENUM('SOLID', 'SEMI-HOLLOW','HOLLOW','ACOUSTIC'),
    // allowNull: false,
    defaultValue: 'SOLID',
  },
  pickUpType:{
    type: ENUM('SINGLE-COIL', 'DOUBLE-COIL','HUMBUCKER', 'NONE'),
    // allowNull: false,
  },
  stringGauge:{
    type: INTEGER,
    // allowNull: false, 
    validate: {
      isInt: true,
      max: 12,
      min: 8, 
    },
  },
  isElectric:{
    type: VIRTUAL,
    get(){
      return this.pickUpType === 'NONE' ? false : true
    },
  },
  isAcoustic:{
    type: VIRTUAL,
    get(){
      return this.bodyType === 'ACOUSTIC' ? true : false
    },
  },
}
);

Guitar.findElectric = function(){
  return this.findAll({
    where: {
      pickUpType: 'NONE'
    }
  });
};

// Guitar.belongsTo(Guitar, {as: 'guitar'});

module.exports = Guitar;
