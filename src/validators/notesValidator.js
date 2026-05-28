import Joi from 'joi';

const createNotesSchema = Joi.object({
    title: Joi.string().trim().min(1).max(100).required(),
    content: Joi.string().trim().min(1).max(3000).required(),
    color: Joi.string().trim().max(30).default('yellow'),
    isPinned: Joi.boolean().default(false),
}).unknown(false);

const updateNotesSchema = Joi.object({
    title: Joi.string().trim().min(1).max(100),
    content: Joi.string().trim().min(1).max(3000),
    color: Joi.string().trim().max(30),
    isPinned: Joi.boolean(),
})
    .min(1)
    .unknown(false);

export { createNotesSchema, updateNotesSchema };
