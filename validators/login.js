import { body } from 'express-validator';

export const loginValidator = [
  body('email', 'Ivalid eMail Format!').isEmail(),
  body('password', 'Password to short, please change your password.').isLength({ min: 5 }),
];
