import express, { Request, Response, NextFunction } from 'express';
import { supabase } from './lib/supabase';
import performanceRoutes from './routes/performanceRoutes';
import reservationRoutes from './routes/reservationRoutes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'TICKETFLOW API 서버' });
});

app.use('/performances', performanceRoutes);
app.use('/reservations', reservationRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message ?? '서버 오류가 발생했습니다.' });
});

const PORT = Number(process.env.PORT) || 3001;

async function start() {
  const { error } = await supabase.from('performances').select('id').limit(1);
  if (error) {
    console.error('Supabase 연결 실패:', error.message);
    process.exit(1);
  }
  console.log('Supabase 연결 확인 완료');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`서버 시작: http://localhost:${PORT}`);
  });
}

start();