const mongoose = require('mongoose'); // db 연결
const Schema = mongoose.Schema;

// db안에 넣을 테이블
let Post = new Schema({
  userid: {type: String},
  password: {type: String},
  birth: {type: String},
},{
    collection: 'user' // db안에 넣을 테이블 이름
});

module.exports = mongoose.model('User', Post);