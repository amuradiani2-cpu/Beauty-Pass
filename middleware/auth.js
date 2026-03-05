const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Авторизация требуется' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password -twoFACode -twoFACodeExpires');
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: 'Аккаунт заблокирован' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Токен истёк' });
    }
    return res.status(401).json({ message: 'Неверный токен' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Авторизация требуется' });
  }
  if (req.user.isAdmin || req.user.userType === 'admin' || req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Доступ запрещен: требуются права администратора' });
};

const salonOwnerMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Авторизация требуется' });
  }
  if (req.user.userType === 'salon') {
    return next();
  }
  return res.status(403).json({ message: 'Доступ запрещен: только для владельцев салонов' });
};

module.exports = { authMiddleware, adminMiddleware, salonOwnerMiddleware };
