const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["unread", "read", "archived", "replied"],
      default: "unread",
    },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
  },
  { timestamps: true }
);

contactSchema.index({ date: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

contactSchema.virtual("formattedDate").get(function () {
  return this.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

contactSchema.methods.markAsRead = function () {
  this.status = "read";
  return this.save();
};

contactSchema.methods.markAsReplied = function () {
  this.status = "replied";
  return this.save();
};

contactSchema.statics.getUnreadCount = function () {
  return this.countDocuments({ status: "unread" });
};

contactSchema.statics.getByStatus = function (status) {
  return this.find({ status }).sort({ date: -1 });
};

contactSchema.pre("save", function (next) {
  this.name = this.name.trim();
  this.email = this.email.trim().toLowerCase();
  this.message = this.message.trim();
  next();
});

module.exports = mongoose.model("Contact", contactSchema);
