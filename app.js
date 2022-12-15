const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');
const Post = require('./models/Post');

const app = express();

// connect DB

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAdd);
app.get('/posts/edit/:id', pageController.getEditPage);

app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
