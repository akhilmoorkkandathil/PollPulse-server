// CORS Configuration

const allowedOrigins = [process.env.BASE_URL_CLIENT || 'http://localhost:4200'];

const corsOptions = { 
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (allowedOrigins.includes(origin || '')) {
        callback(null, true);
      } else {
        console.log('BASE_URL_CLIENT:', process.env.BASE_URL_CLIENT);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  };
  

  export default corsOptions;