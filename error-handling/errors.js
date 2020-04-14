exports.handles500s = (err, req, res, next) => {
    res.status(500).send({msg: 'Server error!'})
}