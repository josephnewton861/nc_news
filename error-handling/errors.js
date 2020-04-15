exports.handles400s = (err, req, res, next) => {
    const codes = ["22P02", '42703'];
    if (codes.includes(err.code)) {
      res.status(400).send({ msg: "Bad request" });
    } else {
        next(err)
    }
}

exports.handlesCustoms = (err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
}


exports.handles500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Server error!'})
} 

// Invalid method controller
exports.handles405s = (req, res, next) => {
    res.status(405).send({msg: 'Invalid method used'})
}