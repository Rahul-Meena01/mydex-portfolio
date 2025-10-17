const mongoose = require("mongoose");

// Track database connection state
let isConnected = false;

const connectDB = async () => {
  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      console.log("⚠️  MongoDB URI not configured in .env file");
      console.log("📝 Server will run without database connection");
      console.log("💡 To enable database:");
      console.log("   1. Create a .env file in the backend directory");
      console.log("   2. Add: MONGODB_URI=your_mongodb_connection_string");
      console.log(
        "   3. Get free MongoDB from: https://www.mongodb.com/cloud/atlas"
      );
      console.log("");
      return null;
    }

    // Check if using localhost (development mode)
    if (process.env.MONGODB_URI.includes("localhost")) {
      console.log("⚠️  Using local MongoDB instance");
      console.log("📝 Make sure MongoDB is running locally");
      console.log("💡 Or use MongoDB Atlas for free cloud database");
      console.log("");
    }

    // Prevent duplicate connections
    if (isConnected && mongoose.connection.readyState === 1) {
      console.log("✅ Using existing MongoDB connection");
      return mongoose.connection;
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are no longer needed in MongoDB Driver v4.0.0+
      // but keeping connection stable
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    console.log("");

    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.log("");
    console.log("🔧 Troubleshooting tips:");
    console.log("   1. Check if MONGODB_URI in .env is correct");
    console.log(
      "   2. Verify your MongoDB Atlas IP whitelist (0.0.0.0/0 for all IPs)"
    );
    console.log("   3. Ensure database user credentials are correct");
    console.log("   4. Check your network connection");
    console.log("");
    console.log("⚠️  Server will continue running without database");
    console.log("   Some features (contact form, analytics, likes) won't work");
    console.log("");

    // Don't exit process, let server run without database
    return null;
  }
};

// Connection event handlers
mongoose.connection.on("connected", () => {
  isConnected = true;
  console.log("📡 Mongoose connection established");
});

mongoose.connection.on("error", (err) => {
  isConnected = false;
  console.error("❌ Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("📴 Mongoose disconnected from MongoDB");
});

// Graceful shutdown handler
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 Mongoose connection closed due to app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
    process.exit(1);
  }
});

// Export connection state checker
const isDBConnected = () => isConnected && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDBConnected = isDBConnected;
