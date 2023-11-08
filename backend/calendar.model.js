const mongoose = require('mongoose'); // db 연결
const Schema = mongoose.Schema; // 

// db안에 넣을 테이블
let Post = new Schema({
  name: {type: String},
  details: {type: String},
  start: {type: String},
  end: {type: String},
  color: {type: String}
},{
    collection: 'calendar' // db안에 넣을 테이블 이름
});

module.exports = mongoose.model('Post', Post);