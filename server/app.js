import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mock data
const users = [
  {
    userNo: 1,
    userId: 'test',
    userPw: 'test1004',
    userEmail: 'test@example.com',
    userPhone: '010-1111-2222',
  },
  {
    userNo: 2,
    userId: 'hello',
    userPw: 'hello1004',
    userEmail: 'hello@example.com',
    userPhone: '010-2222-3333',
  },
  {
    userNo: 3,
    userId: 'seon',
    userPw: 'seon1004',
    userEmail: 'seon@example.com',
    userPhone: '010-3333-4444',
  },
];
app.post('/', (req, res) => {
  const { id, pw } = req.body;
  for (const user of users) {
    if (user.userId === id && user.userPw === pw) {
      return res.json({
        statusCode: 200,
        statusMessage: 'success',
      })
    } else {
      return res.json({
        statusCode: 200,
        statusMessage: 'fail'
      })
    }
  }
});

app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
