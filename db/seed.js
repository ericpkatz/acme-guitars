const conn = require('./conn');
const Guitar = require('./Guitar');

const seed = async() => {
  await conn.sync({ force: true });
  const [strat, tele, sg, lesPaul, vintageGr, martinD15, martinD18, taylor, prsSemi] = await Promise.all([
    Guitar.create({ name: 'Stratocaster', brand: 'Fender', bodyType: 'SOLID', pickUpType: 'SINGLE-COIL', stringGauge: 10  }),
    Guitar.create({ name: 'Telecaster', brand: 'Fender', bodyType: 'SOLID', pickUpType: 'SINGLE-COIL', stringGauge: 9  }),
    Guitar.create({ name: 'SG', brand: 'Gibson', bodyType: 'SOLID', pickUpType: 'HUMBUCKER', stringGauge: 10  }),
    Guitar.create({ name: 'Les Paul', brand: 'Gibson', bodyType: 'SOLID', pickUpType: 'HUMBUCKER', stringGauge: 9  }),
    Guitar.create({ name: '1959 Vintage', brand: 'Gretsch', bodyType: 'HOLLOW', pickUpType: 'HUMBUCKER', stringGauge: 11  }),
    Guitar.create({ name: 'D15', brand: 'Martin', bodyType: 'ACOUSTIC', pickUpType: 'NONE', stringGauge: 11  }),
    Guitar.create({ name: 'D18', brand: 'Martin', bodyType: 'ACOUSTIC', pickUpType: 'NONE', stringGauge: 10  }),
    Guitar.create({ name: 'V-Class', brand: 'Taylor', bodyType: 'ACOUSTIC', pickUpType: 'HUMBUCKER', stringGauge: 11  }),
    Guitar.create({ name: 'Special Semi-Hollow Charcoal', brand: 'PRS', bodyType: 'SEMI-HOLLOW', pickUpType: 'HUMBUCKER', stringGauge: 10  }),
  ]);
};
module.exports = seed;

/*
for creating:
curl localhost:3000/api/guitars POST -v -d '{'name': 'FOO', 'brand': 'BAR', 'bodyType': 'SEMI-HOLLOW', 'pickUpType': 'HUMBUCKER', 'stringGauge': 10}' -H 'Content-Type:application/json'

*/
