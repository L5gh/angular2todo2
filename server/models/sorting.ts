import * as mongoose from 'mongoose';

const sortingSchema = new mongoose.Schema({
  className: String,
});

const Sorting = mongoose.model('Sorting', sortingSchema);

export default Sorting;
