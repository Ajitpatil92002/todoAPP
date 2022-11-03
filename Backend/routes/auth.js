import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import user from "../models/User.js";
import dotenv from "dotenv";
import VerifyToken from "../middlewares/authMiddleware.js";

const router = express();
dotenv.config();

router.post(
  "/register",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({
          status: "error",
          msg: "register UnSuccessfull",
          errors: errors.array(),
        });
      }
      const { name, email, password } = req.body;
      const UserFound = await user.findOne({ email });
      if (UserFound) {
        res.status(401).json({
          status: "error",
          msg: "Please Enter Correct Credentials",
          data: {},
        });
      } else {
        const User = await user.create({ name, email, password });
        const Token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
        res.json({
          status: "Success",
          msg: "register Successfully",
          data: {
            Token,
            user: {
              name: User.name,
              email: User.email,
            },
          },
        });
      }
    } catch (err) {
      res.status(401).json({
        status: "error",
        msg: err.message,
        data: { err },
      });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await user.login(email, password);
    const Token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
    res.json({
      status: "Success",
      msg: "Login Successfully",
      data: {
        Token,
        user: {
          name: User.name,
          email: User.email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "error",
      msg: err.message,
      data: { err },
    });
  }
});

router.get("/getUser/:id", VerifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    const User = await user.findById(id);
    res.json({
      status: "Success",
      msg: "User",
      data: {
        User,
      },
    });
  } catch (err) {
    res.json({
      status: "error",
      msg: err.message,
      data: { err },
    });
  }
});

export default router;
