import { body } from 'express-validator';

export const postCreateValidator = [
  body('title', 'Please enter header of article!').isLength({ min: 5 }).isString(),
  body('text', 'Enter text of article!').isLength({ min: 10 }).isString(),
  body('tags', 'Wrong format of tags. ').optional().isArray(),
  body('imageUrl', 'Ivalid URL format.').optional().isURL(),
];
