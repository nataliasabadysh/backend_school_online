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
