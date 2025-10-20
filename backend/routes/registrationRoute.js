const express=require("express")
const { registerUser } =require('../controllers/registrationController')

const router = express.Router();

//  Register new user
router.post("/", registerUser);


module.exports= router;
