import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/hashHelper.js";
import JWT from "jsonwebtoken";


//User Registration Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, key, password, phone } = req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    };
    if (!key) {
      return res.send({ message: "Secret Key is required" });
    };


    //user checking
    const existingUser = await userModel.findOne({ email });
    //Existing user
    if (existingUser) {

      return res.status(200).send({
        success: false,
        message: "You are already registered kindly Login",

      });

    }

    //User Registration Password
    const hashedPassword = await hashPassword(password);
    //Save
    const user = await new userModel({
      name,
      email,
      phone,
      key,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//User Login Controller -POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    // eslint-disable-next-line no-undef
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role : user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//ForgotPassword Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, key, newPassword } = req.body
    if (!email) {
      res.status(400).send({
        message: "Email is required",
      });
    }
    if (!key) {
      res.status(400).send({
        message: "Secret-Key is required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New Password is required",
      });
    }
    //user validation
    const user = await userModel.findOne({ email, key })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Secret-Key"
      })
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, { password: hashed })
    res.status(200).send({
      success: true,
      message: "Password Reset Successful"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Invalid",
      error,
    });
  }
};

//Test Controller
export const testController = (req, res) => {
  res.send("Protected Route");
};

//Update User Profile Controller
export const updateProfileController = async(req,res) => {
  try {
    const {name,email,password,phone} = req.body
    const user = await userModel.findById(req.user._id)
    //Password
    if(password && password.length < 6){
      return res.json({error:"Password is required and must be 6 characters long"})
    }
     const hashedPassword = password ? await hashPassword(password) : undefined
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
       name: name || user.name,
       email: email || user.email,
       phone: phone || user.phone,
       password: hashedPassword || user.password
      }, {new: true})

      res.status(200).send({
         success:true,
         message: "Profile Updated Successfully",
         updatedUser,
      })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message: "Error while updating profile",
      error
    })
  }
}