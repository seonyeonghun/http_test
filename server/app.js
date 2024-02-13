import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import db from './db.json' assert { type: 'json' };
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // req: 요청정보를 담은 객체, res : 응답정보를 담은 객체
  res.sendFile(__dirname + '/public/result.html');
});
app.get('/srch', (req, res) => {
  const obj = req.query;
  const entries = Object.entries(obj);
  let keywords = [];
  let results = [];
  for (const [key, value] of entries) {
    console.log(`key : ${key}, value: ${value}`);
    keywords = value.split(' ');
  }

  for (const food of db.foods) {
    let isMatch = true;
    for (const keyword of keywords) {
      if (!food.region.includes(keyword) && !food.title.includes(keyword)) {
        isMatch = false;
        break;
      }
    }
    // 일치하는 항목을 결과에 추가
    if (isMatch) {
      console.log('================ matched ==============');
      results.push(food);
    }
  }
  console.log(results);
});

app.post('/add', (req, res) => {
  const { id, pw } = req.body;
  const foundUser = users.filter((user) => {
    if (id === user.userId && pw === user.userPw) {
      res.json({
        message: 'success',
        data: foundUser,
      });
    } else {
      res.json({
        message: 'fail',
      });
    }
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
