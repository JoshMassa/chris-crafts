import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;