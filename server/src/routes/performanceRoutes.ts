import { Router } from 'express';
import { listPerformances, getPerformance } from '../controllers/performanceController';

const router = Router();

// GET /performances → 공연 목록
router.get('/', async (req, res, next) => {
  try {
    res.json(await listPerformances());
  } catch (err) {
    next(err);
  }
});

// GET /performances/1 → 공연 상세
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await getPerformance(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
});

export default router;