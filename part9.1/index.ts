import express from 'express';
import diaryRoutes from './routes/diaries';
const app = express();
app.use(express.json());

const PORT = 3000;
app.get('/ping', (_req, res) => {
  console.log('si');
  
  res.send('pon');
});
app.use('/api/diaries',diaryRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

