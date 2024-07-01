import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Use CORS middleware
app.use(cors());

const corsOptions = {
  origin: ['http://localhost:5173', 'https://house-booking-platform.vercel.app'], // Allow specific origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
  credentials: true, // Allow cookies
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export interface JwtPayload {
  userId: number;
  email: string;
}

// Error handling middleware
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

// Authentication middleware
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as JwtPayload;
    next();
  });
}

// User routes
app.post('/api/users/register', 
  body('email').isEmail(), 
  body('password').isLength({ min: 6 }), 
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
});

app.post('/api/users/login', 
  body('email').isEmail(), 
  body('password').exists(), 
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure to use secure flag in production
        maxAge: 3600000, // 1 hour
      });
      res.json({ message: 'Login successful', token, isAdmin: user.isAdmin });
    } catch (err) {
      next(err);
    }
});

app.get('/api/users', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// House routes
app.post('/api/houses', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, location, price } = req.body;
  try {
    const house = await prisma.house.create({
      data: { title, description, location, price, ownerId: req.user?.userId?.toString() ?? '' },
    });
    res.status(201).json(house);
  } catch (err) {
    next(err);
  }
});

app.get('/api/houses', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const houses = await prisma.house.findMany();
    res.json(houses);
  } catch (err) {
    next(err);
  }
});

// Booking routes
app.post('/api/bookings', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate, houseId } = req.body;
  try {
    const booking = await prisma.booking.create({
      data: { startDate, endDate, userId: req.user?.userId?.toString() ?? '', houseId },
    });
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

app.get('/api/bookings', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware should be added last
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
