const jwt = require('jsonwebtoken');
const authConfig = require('src/config/auth'); // Note: This path might need adjustment based on your config file

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) { // Corrected from the image for proper logic
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, authConfig.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Adiciona os dados do usuário decodificados ao objeto req
    next();
  });
};

module.exports = authenticateToken;