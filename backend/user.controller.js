const express = require('express');
const postRoutes2 = express.Router();

// post설정
let Post = require('./user.model');

// 경로설정
postRoutes2.route('/signup').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(() => {
      res.status(200).json({'business': '데이터베이스에 등록성공'});
    })
    .catch(() => {
      res.status(400).send("데이터베이스에 등록실패");
    });
});

//데이터베이스 가져오기
postRoutes2.route('/').get(function (req, res) {
    Post.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

module.exports = postRoutes2;

