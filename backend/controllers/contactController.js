const Contact = require("../models/Contact");
const { sendEmailNotification } = require("../utils/emailService");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide name, email, and message",
        });
    }
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("user-agent"),
    });
    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully! (Email notification is disabled, but your message is saved.)",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        date: contact.date,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({
          success: false,
          message: "Validation failed",
          errors: messages,
        });
    }
    console.error("Error creating contact:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    const total = await Contact.countDocuments(query);
    const unreadCount = await Contact.getUnreadCount();
    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      unreadCount,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve messages" });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve message" });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const validStatuses = ["unread", "read", "archived", "replied"];
    if (!status || !validStatuses.includes(status)) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(
            ", "
          )}`,
        });
    }
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: `Message status updated to ${status}`,
        data: contact,
      });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update message status" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete message" });
  }
};

exports.getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const total = await Contact.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Contact.countDocuments({ date: { $gte: today } });
    const formattedStats = {
      total,
      today: todayCount,
      byStatus: stats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
    };
    res.status(200).json({ success: true, data: formattedStats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve statistics" });
  }
};
