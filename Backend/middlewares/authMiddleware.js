import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const VerifyToken = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default VerifyToken;
