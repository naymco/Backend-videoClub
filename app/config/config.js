module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || 'mongodb://localhost:27017/movie',
    SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN || 'esteesmitokensecreto'
}