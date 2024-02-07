import path from "path";
import { fileURLToPath} from "url";
import morgan from "morgan";
import express from 'express';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname+'/public'));
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
app.get("/", (req, res) => { // req: 요청정보를 담은 객체, res : 응답정보를 담은 객체
  res.sendFile(path.join(__dirname, "/public/result.html"));
});
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
