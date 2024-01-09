require("dotenv").config();
const express = require("express");
const verify = require("./middleware/auth");
const connectDB = require("./connectDB");
const app = express();
app.use(express.json());

const posts = [
  {
    id: 1,
    post: `katorj's post`,
  },
  {
    id: 2,
    username: `nguyen's post`,
  },
];

connectDB().catch(console.dir);

app.get("/posts", verify, (req, res) => {
  const post = posts.find((post) => post.id === req.userId);
  res.json(post);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is listening port ${PORT}`));
