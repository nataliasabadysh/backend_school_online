// Core
import rateLimit from 'express-rate-limit';

// MiddleWare
export const limiter = (numRequest, resetIn) => rateLimit({
    windowMs: resetIn, // on reset milsec
    max:      numRequest, // max request, during windowMs
    headers:  false, // 
});
// Что бы не нагружать наш endpoints