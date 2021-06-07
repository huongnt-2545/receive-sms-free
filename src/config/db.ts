import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

const connect = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error(err);
  }
};

export default {
  connect,
};
