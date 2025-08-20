module.exports = (req, res, next) => {
    const { password } = req.body;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    if (!regex.test(password)) {
        return res.status(400).json({
            error: 'La password deve essere lunga 8-20 caratteri e contenere almeno una lettera e un numero.'
        });
    }

    next();
};
