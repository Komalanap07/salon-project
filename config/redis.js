const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  host: 'localhost', // Redis server address
  port: 6379,        // Default Redis port
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
client.connect().then(() => console.log("Connected to Redis"));

module.exports = client;
