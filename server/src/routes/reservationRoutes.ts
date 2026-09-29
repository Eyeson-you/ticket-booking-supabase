import { Router } from 'express';
import { createReservation, cancelReservation } from '../controllers/reservationController';
import { getReservationsByEmail } from '../controllers/userController';

const router = Router();

// GET /reservations?email=... → 이메일로 예매 내역 조회
router.get('/', async (req, res, next) => {
  try {
    res.json(await getReservationsByEmail(String(req.query.email ?? '')));
  } catch (err) {
    next(err);
  }
});

// POST /reservations → 예매하기
router.post('/', async (req, res, next) => {
  try {
    res.json(await createReservation(req.body ?? {}));
  } catch (err) {
    next(err);
  }
});

// PATCH /reservations/1/cancel → 예매 취소
router.patch('/:id/cancel', async (req, res, next) => {
  try {
    res.json(await cancelReservation(Number(req.params.id), req.body?.customerEmail));
  } catch (err) {
    next(err);
  }
});

export default router;