const nodemailer = require("nodemailer");

// Create reusable transporter
let transporter = null;

const createTransporter = () => {
  if (transporter) {
    return transporter;
  }

  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(
      "⚠️  Email service not configured. Set EMAIL_USER and EMAIL_PASS in .env"
    );
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail", // 'gmail', 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // For Gmail, use App Password
      },
    });

    console.log("✅ Email service configured successfully");
    return transporter;
  } catch (error) {
    console.error("❌ Failed to create email transporter:", error.message);
    return null;
  }
};

// Send email notification when new contact form is submitted
const sendEmailNotification = async (contact) => {
  const emailTransporter = createTransporter();

  if (!emailTransporter) {
    console.log("Email notification skipped - service not configured");
    return { success: false, message: "Email service not configured" };
  }

  try {
    // Email to admin (you)
    const adminMailOptions = {
      from: `"Pokédex Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 New Contact Form Submission from ${contact.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #667eea; }
            .label { font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p>You have received a new message from your Pokédex Portfolio contact form.</p>
              
              <div class="info-box">
                <p><span class="label">Name:</span> ${contact.name}</p>
              </div>
              
              <div class="info-box">
                <p><span class="label">Email:</span> ${contact.email}</p>
              </div>
              
              <div class="info-box">
                <p><span class="label">Date:</span> ${new Date(
                  contact.date
                ).toLocaleString()}</p>
              </div>
              
              <div class="info-box">
                <p><span class="label">Message:</span></p>
                <p style="white-space: pre-wrap;">${contact.message}</p>
              </div>
              
              <div class="info-box">
                <p><span class="label">IP Address:</span> ${
                  contact.ipAddress || "N/A"
                }</p>
              </div>
              
              <p style="margin-top: 30px;">
                <a href="mailto:${contact.email}" 
                   style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reply to ${contact.name}
                </a>
              </p>
            </div>
            <div class="footer">
              <p>This is an automated notification from your Pokédex Portfolio</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email to admin
    const adminResult = await emailTransporter.sendMail(adminMailOptions);
    console.log("✅ Admin notification email sent:", adminResult.messageId);

    // Optional: Send auto-reply to user
    if (process.env.SEND_AUTO_REPLY === "true") {
      const userMailOptions = {
        from: `"Rahul Meena - Pokédex Portfolio" <${process.env.EMAIL_USER}>`,
        to: contact.email,
        subject: "Thank you for contacting me! 🎉",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>✨ Message Received!</h2>
              </div>
              <div class="content">
                <p>Hi <strong>${contact.name}</strong>,</p>
                
                <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                
                <p><strong>Your message:</strong></p>
                <div style="background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0;">
                  <p style="white-space: pre-wrap;">${contact.message}</p>
                </div>
                
                <p>I typically respond within 24-48 hours. If your matter is urgent, please feel free to reach out directly at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
                
                <p>Best regards,<br><strong>Rahul Meena</strong></p>
                
                <p style="margin-top: 30px;">
                  <a href="https://rahul-meena01.github.io/mydex-portfolio/" 
                     style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Visit My Portfolio
                  </a>
                </p>
              </div>
              <div class="footer">
                <p>This is an automated response. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      const userResult = await emailTransporter.sendMail(userMailOptions);
      console.log("✅ Auto-reply email sent to user:", userResult.messageId);
    }

    return {
      success: true,
      message: "Email notification sent successfully",
    };
  } catch (error) {
    console.error("❌ Error sending email notification:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  const emailTransporter = createTransporter();

  if (!emailTransporter) {
    return { success: false, message: "Email service not configured" };
  }

  try {
    await emailTransporter.verify();
    console.log("✅ Email configuration is valid and ready to send emails");
    return { success: true, message: "Email service is working" };
  } catch (error) {
    console.error("❌ Email configuration test failed:", error.message);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendEmailNotification,
  testEmailConfig,
};
