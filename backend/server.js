const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// --------------- Security middleware ---------------
app.use(helmet());
app.use(morgan('dev'));

// CORS — configurable via env, defaults to Vite dev server
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin.split(',').map(o => o.trim()),
  credentials: true,
}));

// Body parser
app.use(express.json({ limit: '10mb' }));

// Rate limiter on auth routes only (20 requests per 15 min)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later' },
});

// --------------- Mount routes ---------------
app.use('/api/auth',          authLimiter, require('./routes/auth.routes'));
app.use('/api/users',         require('./routes/user.routes'));
app.use('/api/departments',   require('./routes/department.routes'));
app.use('/api/faculty',       require('./routes/faculty.routes'));
app.use('/api/students',      require('./routes/student.routes'));
app.use('/api/leaves',        require('./routes/leave.routes'));
app.use('/api/timetable',     require('./routes/timetable.routes'));
app.use('/api/attendance',    require('./routes/attendance.routes'));
app.use('/api/exams',         require('./routes/exam.routes'));
app.use('/api/syllabus',      require('./routes/syllabus.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/messages',      require('./routes/message.routes'));
app.use('/api/approvals',     require('./routes/approval.routes'));
app.use('/api/committees',    require('./routes/committee.routes'));
app.use('/api/fees',          require('./routes/fee.routes'));
app.use('/api/reports',       require('./routes/report.routes'));
app.use('/api/hod',           require('./routes/hod.routes'));

// --------------- Health check ---------------
app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
});

// --------------- 404 handler ---------------
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// --------------- Global error handler ---------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, error: messages.join(', ') });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    return res.status(400).json({ success: false, error: `Duplicate value for: ${field}` });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: `Invalid ${err.path}: ${err.value}` });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// --------------- Start server ---------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
