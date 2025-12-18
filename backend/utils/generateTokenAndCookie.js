import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res,userId) => {
  const token = jwt.sign({ id:userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite:"None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateTokenAndSetCookie;
