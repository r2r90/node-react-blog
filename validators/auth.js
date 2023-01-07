import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Ivalid eMail Format!').isEmail(),
  body('password', 'Password to short, please change your password.').isLength({ min: 5 }),
  body('fullName', 'Please Enter your name.').isLength({ min: 5 }),
  body('avatarUrl', 'Ivalid URL format.').optional().isURL(),
];
