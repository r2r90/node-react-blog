import express from 'express';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import multer from 'multer';

import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

import { registerValidator } from './validators/auth.js';
import { loginValidator } from './validators/login.js';
import { postCreateValidator } from './validators/post.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.eegtuvx.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB is OK!!!');
  })
  .catch((err) => console.log('DB Error : ', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);

app.post('/posts', checkAuth, handleValidationErrors, postCreateValidator, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  handleValidationErrors,
  postCreateValidator,
  PostController.update,
);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(3000, (err) => {
  if (err) {
    return console.log('Error server');
  }
  console.log('Server OK!');
});
