import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const token = req.header.Authorization.split(" ")[1] || req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(404).json({
      status: false,
      message: "Token not found , Please login again",
    });
  }
  jwt.verify(token, process.send.JWT_SECRET, (decode, err) => {
    if (err) {
      return res.json({
        status: false,
        message: "You are not authenticated ",
        error: err.message,
      });
    }
    
  req.user = decode;
  next();
  });

};


export default userAuth;