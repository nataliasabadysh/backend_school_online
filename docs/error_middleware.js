

 app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        switch (name) {
            case 'ValidationError':
                  res.status(400).json({ message: message });
                break;

            default:
                res.status(status).json({ message: message });
                break;
        }
    });