

// MiddleWare
// Core
import rateLimit from 'express-rate-limit';

//1) MiddleWare
export const limiter = (numRequest, resetIn) => rateLimit({
    windowMs: resetIn, // on reset milsec
    max:      numRequest, // max request, during windowMs
    headers:  false, // 
});
// Что бы не нагружать наш endpoints

// 2) then we can import 

//_ '5' request from 1 api adress 
router.get('/', [ limiter(5, 60 * 1000) ], get);


// express-rate-limit by default take API
// we can change on token, .. 