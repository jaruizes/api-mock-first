module.exports = function(req, res, next) {
    if (req.path.startsWith('/pets')) {
        if (req.method === 'POST') {
            const body = req.body;
            if (body.name === "wrong name") {
                res.status(500).send({
                    "code": 11111,
                    "message": "Server Error"
                });
            } else {
                next();
            }
        } else if (req.method === 'GET') {
            if (req.path.startsWith('/pets/10')) {
                res.status(404).send({
                    "code": 189998,
                    "message": "Pet not found"
                });
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
};
