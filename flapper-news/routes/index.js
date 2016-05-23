var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /posts - return a list of posts and associated metadata */
router.get('/posts', function(req, res, next){
	Post.find(function(err, posts){
		if(err){return next(err); }
		res.json(posts);
	});
});

/* POST /posts - create a new post */
router.post('/posts', function(req, res, next){
	var post = new Post(req.body);

	post.save(function(err, post){
		if(err){ return next(err); }

		res.json(post);
	});
});

/* GET /posts/:id - 
return an individual post with associated comments */
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function (err, post){
		if (err) { return next(err); }
		if(!post) { return next(new Error('can\'t find post'));
			}

		req.post = post;
		return next();
	});
});

/* Test to get post with ID */
router.get('/posts/:post', function(req, res) {
	res.json(req.post);
});

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

module.exports = router;
