'use strict';

const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validationSchemas/authSchemas');
const authenticateToken = require('../middlewares/authMiddleware');

module.exports = (registerUserUseCase, loginUserUseCase) => {
  const router = Router();
  const authController = new AuthController(registerUserUseCase, loginUserUseCase);

  router.post('/register', validate(registerSchema), authController.register.bind(authController));
  router.post('/login', validate(loginSchema), authController.login.bind(authController));
  router.post('/logout', authenticateToken, authController.logout.bind(authController));
  router.post('/logout', authController.logout.bind(authController));
  return router;
};