import allowedOrigin from './allowedOrigin.js';

const corsOption = {
    origin: (origin, callback) => {
        if (allowedOrigin.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOption;
