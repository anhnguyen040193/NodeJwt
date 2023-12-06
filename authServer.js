require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const verify = require("./middleware/auth");
const app = express();
app.use(express.json());

let users = [
  {
    id: 1,
    username: "katorj",
    refreshToken: null,
  },
  {
    id: 2,
    username: "nguyen",
    refreshToken: null,
  },
];

const createToken = (payload) => {
  const { id, username } = payload;
  const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ id, username }, process.env.REFRESH_TOKEN, {
    expiresIn: "2h",
  });
  return { accessToken, refreshToken };
};

const updateRefreshToken = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username) {
      return {
        ...user,
        refreshToken,
      };
    }
    return user;
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((item) => item.username === username);
  if (!user) return res.sendStatus(401);
  const token = createToken(user);
  updateRefreshToken(user.username, token.refreshToken);
  console.log(users);
  res.json(token);
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = users.find((user) => user.refreshToken === refreshToken);
  if (!user) return res.sendStatus(403);
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const token = createToken(user);
    updateRefreshToken(user.username, token.refreshToken);
    res.json(token);
  } catch (error) {
    console.log("error", error);
    res.sendStatus(403);
  }
});

app.delete("/logout", verify, (req, res) => {
  const user = users.find((user) => user.id === req.userId);
  updateRefreshToken(user.username, null);
  console.log(users);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening port ${PORT}`));
