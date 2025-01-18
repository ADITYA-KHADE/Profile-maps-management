const mongoose = require('mongoose');

const ProfileModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  coordinates: { type: [Number], required: true },
},
{
  timestamps: true,
}
);

const ProfileModel = mongoose.model('Profile', ProfileModelSchema)

module.exports = ProfileModel