import bcrypt from 'bcrypt';
import dbConfig from '../config/dbConfig.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenGenerator.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await dbConfig.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid credentials',
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid credentials',
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await dbConfig.authentication.create({
      data: {
        token: refreshToken,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const authentication = await dbConfig.authentication.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!authentication) {
      return res.status(401).json({
        message: 'Refresh token not found',
      });
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
      username: payload.username,
    });

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch {
    res.status(401).json({
      message: 'Invalid refresh token',
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await dbConfig.authentication.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Logout successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { login, refresh, logout };
