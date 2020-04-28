
// Core
import Ajv from 'ajv';

// validation for the payload 
export const validator = (schema) => (req, res, next) => {
    const ajv = new Ajv({ allErrors: true }); // * examplar validate , true - all errors will be return
    const validate = ajv.compile(schema);
    const valid = validate(req.body); // validation  for the req.body

    if (valid) {// if 'payload' is valid 
        return next();
    }

    const errors = validate.errors.map(({ message }) => message).join(', ');
        // format changed to text with join(', ')
    console.log('validate.errors', validate.errors);
    res.status(400).json({ message: errors});

    // const body = JSON.stringify(req.body, null, 2);
    // next(new ValidationError(`${req.method}: ${req.originalUrl} [ ${errors} ]\n${body}`, 400));
};

//2


// schema.js then we should get as fields

export const createUser = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        role: {
            type: 'string',
            enum: [ 'newbie', 'student', 'teacher' ],
        },
        sex: {
            type: 'string',
            enum: [ 'f', 'm' ],
        },
    },
    required:             [ 'name', 'email', 'phone', 'password', 'sex' ],
    additionalProperties: false, // to not allaued add any values then no in schema obj  
};

// 3.**  in user router will use it 
router.post('/', [ validator(createUser) ], post); // 

// 4 ***  for the server we should add 

import express from 'express';
const app = express();
app.use(express.json({ limit: '10kb' })); // payload not more then 10 kb 
