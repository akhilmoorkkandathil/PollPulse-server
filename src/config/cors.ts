// CORS Configuration

const allowedOrigins = "*" // Include your frontend URL

const corsOptions = { 
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
};

export default corsOptions;
