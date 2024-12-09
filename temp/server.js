const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './forum.db',
});

// Models
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Relationships
Post.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Post);

// Sync database
sequelize.sync();

// Serve static files
app.use(express.static('static'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['votes', 'DESC']], include: 'comments' });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.post('/api/posts/:postId/comments', async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  if (!content) {
    return res.status(400).json({ error: 'Missing content' });
  }
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const newComment = await Comment.create({ content, PostId: postId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

app.post('/api/posts/:postId/vote', async (req, res) => {
  const { direction } = req.body;
  const { postId } = req.params;
  if (!direction || !['up', 'down'].includes(direction)) {
    return res.status(400).json({ error: 'Invalid vote direction' });
  }
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.votes += direction === 'up' ? 1 : -1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to vote on post' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
