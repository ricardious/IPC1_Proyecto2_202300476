import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import likesRoutes from './routes/likes.routes.js';
import postsRoutes from './routes/posts.routes.js';
import usersRoutes from './routes/users.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Cookie parser
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Frontend/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

// Middlewares
app.use(morgan('dev'));

// JSON
app.use(express.json());

// Routes
app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});
app.use("/api", authRoutes);
app.use("/api", commentsRoutes);
app.use("/api", likesRoutes);
app.use("/api", postsRoutes);
app.use("/api", usersRoutes);


export default app;


