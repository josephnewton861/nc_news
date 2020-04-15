exports.handlesCustoms = (err, req, res, next) => {
    res.status(404).send({msg: err.msg})
}


exports.handles500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Server error!'})
}