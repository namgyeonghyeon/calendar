const express = require('express');
const postRoutes = express.Router();

// post설정
let Post = require('./calendar.model');

// 경로설정
postRoutes.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(() => {
      res.status(200).json({'business': '데이터베이스에 등록성공'});
    })
    .catch(() => {
      res.status(400).send("데이터베이스에 등록실패");
    });
});

// 데이터베이스 가져오기
postRoutes.route('/').get(function (req, res) {
    Post.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

// 일정 제거
postRoutes.route('/delete/:id').delete(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('제거완료');
    });
});

module.exports = postRoutes;
