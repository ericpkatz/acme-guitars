const express = require('express');
const { Sequelize } = require('sequelize');
const Op = require('sequelize').Op;
const app = express();
const { conn, seed, 
  models: { Guitar },
} = require('./db');
const path = require('path');

app.use(express.json());
app.use('/client', express.static('client'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/guitars', async(req,res,next) =>{
  try{ 
   res.send(await Guitar.findAll())
  }
  catch(ex){
    next(ex)
  }
})

// DEAR PROF AND TAs -- all of my categories in my product have NOT NULL properties. If you want to make testing easier, since it's so many categories, copy and paste this in:
// curl localhost:3000/api/guitars -X POST -v -d "{"name" : "FOO", "brand": "BAR", "bodyType": "SEMI-HOLLOW", "pickUpType": "HUMBUCKER", "stringGauge": 10}' -H 'Content-Type:application/json'}" -H 'Content-Type:application/json' 
// 

// ok. I wrote the message above thinking it would work smoothly. I cannot for the life of me figure out why my post isn't working. i've tried single quotes, double quotes, name and guitar.name or Guitar.name. I tried this.name. I'm literally throwing everything at the wall and seeing what sticks. I've tried curl, I've tried postman. I've tried making the req.body a variable and mapping through the variable to see if I can extract req.body.name. Every single time, I get an object successfully created. It gives the guitar a bodyType of SOLID (because that's the only field I have with a defaultValue) and then everything else is null. I had to remove allowNull from this just to get it to work. 

app.post('/api/guitars', async(req,res, next) =>{
  try{
    const guitar = await Guitar.create(req.body);
    res.send(guitar);
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/guitars/bodyType/:bodyType', async(req,res,next) =>{
  try{ 
    const guitars = await Guitar.findAll({
      where: {
        bodyType: req.params.bodyType
      }
    })
   res.send(guitars)
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/guitars/pickUpType/:pickUpType', async(req,res,next) =>{
  try{ 
    const guitars = await Guitar.findAll({
      where: {
        pickUpType: req.params.pickUpType
      }
    })
   res.send(guitars)
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/guitars/electric', async(req,res,next) =>{
  try{ 
    const electrics = await Guitar.findAll({
      where: {
        [Op.or]: [{bodyType: 'SOLID'}, {bodyType: 'HOLLOW'}, {bodyType: 'SEMI-HOLLOW'}]
      }
    })
   res.send(electrics)
  }
  catch(ex){
    next(ex)
  }
})
app.get('/api/guitars/acoustic', async(req,res,next) =>{
  try{ 
   res.send(await Guitar.findAll({
    where: {bodyType: 'ACOUSTIC'}
   }))
  }
  catch(ex){
    next(ex)
  }
})

app.delete('/api/guitars/:id', async(req,res, next) =>{
  try{
    const del = await Guitar.findByPk(req.params.id)
    del.destroy();
    res.sendStatus(204)
  }
  catch(ex){
    next(ex)
  }
})
app.put('/api/guitars/:id', async(req,res, next) =>{
  try{
    const guitar = await Guitar.findByPk(req.params.id)
    await guitar.update(req.body);
    res.send(guitar)
  }
  catch(ex){
    next(ex)
  }
})

app.use('/api/*', (req, res)=>{
  res.status(404).send({message: 'Not Found'})
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ message: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    await seed()
    const electricGuitars = await Guitar.findElectric();
    electricGuitars.forEach(guitar => console.log(guitar.name));
    console.log(`listening on port ${port}`);
  }
  catch(ex){
    console.log(ex);
  }
});
