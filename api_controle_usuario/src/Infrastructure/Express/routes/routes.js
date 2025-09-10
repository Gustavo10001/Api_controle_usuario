const { Router } = require('express');
const AuthController = require("../controllers/AuthController");
const validate = require("../middlewares/validationMiddleware");
const { registerSchema, loginSchema } = require('src/Infrastructure/Express/validationSchemas/authSchemas');
const JWTProvider = require('src/Infrastructure/Providers/JWTProvider');

module.exports = (registerUserCase, loginUserUseCase, logoutUserUseCase) => {
    const router = Router();
    const authController = new AuthController(registerUserCase, loginUserUseCase, logoutUserUseCase);
    const jwtProvider = new JWTProvider();
    const authMiddleware = require('../controllers/authMiddleware')(jwtProvider);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));
    router.post('/logout', authMiddleware, authController.logout.bind(authController));

    return router;
};