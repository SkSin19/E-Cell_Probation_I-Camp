const Registration =require("../models/registrationSchema");


const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      isFromKiit,
      emailKiit,
      emailNonKiit,
      phone,
      internshipType,
    } = req.body;

    //imput validation 

    // Check mandatory fields
    if (!firstName || !lastName || typeof isFromKiit !== "boolean" || !phone || !internshipType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Validate first and last name 
    //only letter allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return res.status(400).json({
        success: false,
        message: "Name should contain only alphabets and spaces.",
      });
    }

    // phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format. Must be a 10-digit number starting with 6-9.",
      });
    }

    //email validation

    if (isFromKiit) {
      // KIIT students must provide a KIIT email
      if (!emailKiit) {
        return res.status(400).json({
          success: false,
          message: "KIIT email is required for KIIT students.",
        });
      }

      // KIIT email must end with @kiit.ac.in
      const kiitEmailRegex = /^[a-z0-9._%+-]+@kiit\.ac\.in$/i;
      if (!kiitEmailRegex.test(emailKiit)) {
        return res.status(400).json({
          success: false,
          message: "Invalid KIIT email format. Must end with '@kiit.ac.in'.",
        });
      }
    } else {
      // Non-KIIT students must provide a general email
      if (!emailNonKiit) {
        return res.status(400).json({
          success: false,
          message: "Email is required for non-KIIT students.",
        });
      }

      // General email validation
      const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!generalEmailRegex.test(emailNonKiit)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format.",
        });
      }
    }

    // internship type validation

    const validInternshipTypes = [
      "Technical",
      "Non-Technical",
      "Management",
      "Research",
      "Design",
    ];

    if (!validInternshipTypes.includes(internshipType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid internship type. Must be one of: ${validInternshipTypes.join(", ")}`,
      });
    }

    // existing phone no. to check existing registration

    const existing = await Registration.findOne({ phone });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A user with this phone number is already registered.",
      });
    }

    // save to db

    const newRegistration = new Registration({
      firstName,
      lastName,
      isFromKiit,
      emailKiit: isFromKiit ? emailKiit : null,
      emailNonKiit: !isFromKiit ? emailNonKiit : null,
      phone,
      internshipType,
    });

    await newRegistration.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: newRegistration,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration.",
      error: error.message,
    });
  }
};

//export
module.exports={registerUser}