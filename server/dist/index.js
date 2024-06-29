"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Use CORS middleware
app.use((0, cors_1.default)());
const corsOptions = {
    origin: 'http://localhost:5173', // Allow specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    credentials: true, // Allow cookies
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}
// Authentication middleware
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
// User routes
app.post('/api/users/register', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
});
app.post('/api/users/login', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').exists(), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure to use secure flag in production
            maxAge: 3600000, // 1 hour
        });
        res.json({ message: 'Login successful' });
    }
    catch (err) {
        next(err);
    }
});
app.get('/api/users', authenticateToken, async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
// House routes
app.post('/api/houses', authenticateToken, async (req, res, next) => {
    const { title, description, location, price } = req.body;
    try {
        const house = await prisma.house.create({
            data: { title, description, location, price, ownerId: req.user?.userId?.toString() ?? '' },
        });
        res.status(201).json(house);
    }
    catch (err) {
        next(err);
    }
});
app.get('/api/houses', async (req, res, next) => {
    try {
        const houses = await prisma.house.findMany();
        res.json(houses);
    }
    catch (err) {
        next(err);
    }
});
// Booking routes
app.post('/api/bookings', authenticateToken, async (req, res, next) => {
    const { startDate, endDate, houseId } = req.body;
    try {
        const booking = await prisma.booking.create({
            data: { startDate, endDate, userId: req.user?.userId?.toString() ?? '', houseId },
        });
        res.status(201).json(booking);
    }
    catch (err) {
        next(err);
    }
});
app.get('/api/bookings', authenticateToken, async (req, res, next) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    }
    catch (err) {
        next(err);
    }
});
// Error handling middleware should be added last
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
