const env = process.env;

module.exports = {
  port: env.PORT || 3000,
  host: env.HOST || env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
};
