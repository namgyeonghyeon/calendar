const express = require('express'); // express moudule 호출
const app = express(); // 서버에 필요한 기능인 미들웨어를 어플리케이션(app)에 추가한다
const bodyParser = require('body-parser'); // body-parser moudule 호출
const PORT = 8000; // port번호 8000으로 설정
const cors = require('cors'); // cors moudule 호출
const mongoose = require('mongoose'); // mongoose moudule 호출
const config = require('./DB.js'); // DB.js에 있는 데이터 config에 삽입
const postRoute = require('./calendar.controller');// calendar.controller.js에 있는 데이터 postRoute에 삽입
const postRoute2 = require('./user.controller');// user.controller.js에 있는 데이터 postRoute2에 삽입

mongoose.Promise = global.Promise; // 몽구스의 전역객체의 promise를 사용해 connect() 함수 사용
mongoose.connect(config.DB, { useNewUrlParser: true }).then( // db 연결 then을 이용해 처리 결과값을 받음
  () => { console.log('Database is connected') }, // 정상 작동시 db 연결
  err => { console.log('Can not connect to the database'+ err)} // 비정상 작동시 db err message 출력
);

app.use(cors()); // cors 사용
app.use(bodyParser.urlencoded({extended: true})); // body-parser을 이용한 객체안에 파싱하기위해 true로 설정
app.use(bodyParser.json()); // json 사용해 본래 타입 그대로 json 형태로 받음

app.use('/events', postRoute); // postRoute의 calendar db경로 events사용
app.use('/register', postRoute2); // postRoute2의 user db경로 register사용

app.listen(PORT, function(){ // port번호인 8000을 가져와 실행 
  console.log('Server is running on Port:',PORT); // db 연결시 Server is running on Port:8000이 나오도록 설정
});
