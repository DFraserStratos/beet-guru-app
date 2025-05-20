const isProduction = process.env.NODE_ENV === 'production';

export const logger = {
  info: (...args) => {
    if (!isProduction) {
      console.info(...args);
    }
  },
  error: (...args) => {
    console.error(...args);
  }
};
