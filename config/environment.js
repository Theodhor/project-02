const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-02';
const port = process.env.PORT || 4000;

module.exports = { dbURI, port };
