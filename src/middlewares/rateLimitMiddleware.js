import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'failed',
    message: 'Too many requests, please try again later',
  },
})

const dailyCheckInLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'failed',
    message: 'Too many daily check-in requests, please try again later',
  },
})

export { authLimiter, dailyCheckInLimiter }