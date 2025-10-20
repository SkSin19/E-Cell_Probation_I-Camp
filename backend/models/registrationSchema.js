const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isFromKiit: { type: Boolean, required: true },
    emailKiit: { type: String },
    emailNonKiit: { type: String },
    phone: { type: String, required: true },
    internshipType: { 
      type: String, 
      required: true,
      enum: ["Technical", "Non-Technical", "Management", "Research", "Design"], //  predefined options
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
//exporting the model
module.exports=Registration;
