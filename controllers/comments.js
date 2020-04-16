const {updateCommentsByCommentId} = require('../models/comments')

exports.patchCommentsByCommentId = (req, res, next) => {
    const {comment_id} = req.params
    const {inc_votes} = req.body

    updateCommentsByCommentId(comment_id, inc_votes).then((comment) => {
        res.status(200).send({comment})
    }).catch(next)
}