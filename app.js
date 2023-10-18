import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { check , validationResult } from "express-validator";
import bcrypt from "bcrypt";
const _dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");

async function main(){

    const app = express();
    const port = 3000;

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static("public"));

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true , "please enter valid name"]
        },
        email: {
            type: String,
            required: [true , "please enter valid email"]
        },
        password: {
            type: String,
            required: [true , "please enter valid password"]
        },
        number: {
            type: String,
            required: [true , "please enter valid phone number"]
        },
        termsAndConditions: Boolean
    });

    const User = new mongoose.model("User" , userSchema);

    app.get("/", (req , res)=>{
        res.sendFile(_dirname + "/public/index.html");
    });

    app.get("/signup" , (req , res)=>{
        res.sendFile(_dirname + "/public/signup.html");
    });

    app.post("/signup" ,  [
        // Express-validator validation rules
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
        check('number').isMobilePhone().withMessage('Invalid phone number'),
        check('termsAndConditons').toBoolean().isBoolean().withMessage('Terms and conditions must be accepted'),
      ] , async (req , res)=>{
        // console.log(req.body);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, number, termsAndConditions } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect('/signup?message=User already exists');
        }
    
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
            name,
            email,
            password: hashedPassword,
            number,
            termsAndConditions,
          });
    
          await user.save();
          res.redirect('/');
        } catch (error) {
          console.error(error);
          res.status(500).send('Error registering user');
        }
    });

    app.get("/login" , (req , res)=>{
        res.sendFile(_dirname + "/public/login.html");
    });

    app.post("/login", [
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')], 
        async (req , res)=>{

        // console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find a user with the provided email
        const user = await User.findOne({ email });
      
        // Check is user exists or not
        if (!user) {
          // Redirect to the login page with an error message
            return res.redirect("/login?error=User not found");
        }
      
        // If exists, Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
      
        if (passwordMatch) {
           // Redirect to the login page with a success message
            return res.redirect("/");
        } else {
          // Redirect to the login page with an error message
            return res.redirect("/login?error=Incorrect password");
        }

    });

    app.get("/search" , (req , res)=>{
        res.sendFile(_dirname + "/public/search.html");
    });

    app.get("/product" , (req , res)=>{
        res.sendFile(_dirname + "/public/product.html");
    });

    app.listen(port , () => {
        console.log(`Server running on port ${port}`);
    });   

}
main().catch(err => {
    console.log(err);
}); 