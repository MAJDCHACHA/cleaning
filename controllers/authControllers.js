import db from "../config/index.js";
const { User, Admin } = db;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Controllers_admin
const register_admin = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: `Bad Request` });
    }

    const foundUser = await Admin.findOne({
      where: {
        name: name,
        password: password,
      },
    });

    if (foundUser) {
      return res.status(401).json({ message: `User already exists` });
    } else {
      const newUser = await Admin.create({
        name: name,
        password: password,
      });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: newUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: newUser.id,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res
        .status(201)
        .json({ accessToken: accessToken, name: newUser.name, id: newUser.id });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const login_admin = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: `Bad Request` });
    }

    const foundUser = await Admin.findOne({
      where: {
        name: name,
        password: password,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ message: `User does not exist` });
    } else {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        accessToken: accessToken,
        name: foundUser.name,
        id: foundUser.id,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const refresh_admin = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    res.status(401).json({ message: ` unauthorized` });
  } else {
    const refresh_Token = cookie.jwt;
    jwt.verify(
      refresh_Token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: `Forbidden` });
        const foundUser = await Admin.findByPk(decoded.UserInfo.id);
        if (!foundUser)
          return res.status(401).json({ massage: `Unauthorized` });
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return res.json({ accessToken: accessToken });
      }
    );
  }
};
const logout_admin = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(204).json({ message: "No content to log out" }); // Use 204 (No Content) for empty responses
    } else {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(200).json({ message: "Logout successful" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// Controllers_user
const register_user = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: `Bad Request` });
    }

    const foundUser = await User.findOne({
      where: {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
    });

    if (foundUser) {
      return res.status(401).json({ message: `User already exists` });
    } else {
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
      });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: newUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: newUser.id,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        accessToken: accessToken,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        id: newUser.id,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: `Bad Request` });
    }

    const foundUser = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ message: `User does not exist` });
    } else {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        accessToken,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        email: foundUser.email,
        id: foundUser.id,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const refresh_user = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    res.status(401).json({ message: ` unauthorized` });
  } else {
    const refresh_Token = cookie.jwt;
    jwt.verify(
      refresh_Token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: `Forbidden` });
        const foundUser = await User.findByPk(decoded.UserInfo.id);
        if (!foundUser)
          return res.status(401).json({ massage: `Unauthorized` });
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return res.json({ accessToken: accessToken });
      }
    );
  }
};
const logout_user = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(204).json({ message: "No content to log out" }); // Use 204 (No Content) for empty responses
    } else {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(200).json({ message: "Logout successful" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default {
  register_admin,
  login_admin,
  refresh_admin,
  logout_admin,
  register_user,
  login_user,
  refresh_user,
  logout_user,
};
