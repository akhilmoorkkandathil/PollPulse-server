// CORS Configuration

const allowedOrigins = "*" // Include your frontend URL

const corsOptions = { 
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Authorization', 'X-Refresh-Token', 'Content-Type']
};

export default corsOptions;
