import Joi from 'joi';

const createDailyCheckInSchema = Joi.object({
  weekday: Joi.string().trim().required(),
  time: Joi.string()
    .trim()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'time must use HH:mm format',
    }),
  sub_mood: Joi.string().trim().required(),
  activities: Joi.array().items(Joi.string().trim().min(1)).min(1).required(),
  journal: Joi.string().trim().allow('', null),
  use_insight: Joi.boolean().default(false),
}).unknown(false);

export { createDailyCheckInSchema };
