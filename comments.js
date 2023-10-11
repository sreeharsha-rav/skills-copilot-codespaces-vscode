// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors'); // cross origin resource sharing

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments
const commentsByPostId = {};

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []); // send back empty array if no comments
});

// Create comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // generate random id
  const { content } = req.body; // get content from body
  const comments = commentsByPostId[req.params.id] || []; // get comments from post id

  comments.push({ id: commentId, content }); // add new comment to comments array
  commentsByPostId[req.params.id] = comments; // add comments to commentsByPostId object

  res.status(201).send(comments); // send back new comments
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});