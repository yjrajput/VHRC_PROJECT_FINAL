import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import serviceRoutes from './routes/services.js';
import serviceDetailRoutes from './routes/serviceDetails.js';
import departmentRoutes from './routes/departments.js';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Compression Middleware to compress HTTP responses
app.use(compression());

// Security Middleware - adjusted for production to allow serving frontend assets
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow serving images cross-origin if needed
  contentSecurityPolicy: false, // Disable CSP so frontend assets (scripts, styles) load correctly
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs (increased for production SPA)
  message: { message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter); // Apply rate limiter to all API routes

// CORS - configured for production domain
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
  : ['http://localhost:5173', 'http://localhost:5001'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // To fix Vercel/Render deployment issues, we allow all origins.
    // If you want to restrict it later, you can add your Vercel URL 
    // to the CORS_ORIGIN environment variable on Render.
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-details', serviceDetailRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'VHRC Backend API is running', environment: process.env.NODE_ENV || 'development' });
});

// ============ SERVE FRONTEND IN PRODUCTION ============
// In production (Hostinger VPS), the backend serves the built React frontend
if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendDistPath));

  // SPA fallback: any route not matching /api or /uploads serves index.html
  app.get(/.*/, (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      const indexPath = path.join(frontendDistPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send('VHRC Backend API is running successfully. Please use the Vercel frontend URL to access the website.');
      }
    }
  });
}

// Global Error Handler Middleware (Catches all uncaught exceptions and prevents Information Disclosure)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 VHRC Backend running on http://localhost:${PORT}`);
    console.log(`📋 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    if (process.env.NODE_ENV === 'production') {
      console.log(`📁 Serving frontend from: ../frontend/dist`);
    }
  });

  // Graceful shutdown for PM2
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('🛑 SIGINT received. Shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed.');
      process.exit(0);
    });
  });
});
