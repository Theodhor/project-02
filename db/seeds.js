const mongoose = require('mongoose');

const Photo = require('../models/photo');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase(() => { // delete the database ready for new data

    Photo.create([{
      name: 'Panda',
      image: 'https://i.pinimg.com/originals/67/88/59/67885927303523dc4f821a618380f88f.jpg',
      method: 'Flying panda',
      about: 'Flying panda'
    }, {
      name: 'Peter',
      image: 'https://i.pinimg.com/236x/a0/dc/44/a0dc44e31598be37a27f27cda01cf653--peter-griffin-family-guy.jpg',
      method: 'Peter Griffin',
      about: 'Peter Griffin'
    }], (err, records) => {
      if(err) console.log(err);
      console.log(`${records.length} photos created!`);
      mongoose.connection.close();
    });
  });
});
