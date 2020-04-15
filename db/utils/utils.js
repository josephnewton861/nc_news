exports.formatDates = list => {
    if(!Object.keys(list).length) return []

    const newListArr = list.map((listObj) => {
        const clonedList = {...listObj}

        let newTimeStamp = new Date(clonedList.created_at)
           
            let title = clonedList.title
            let topic = clonedList.topic
            let author = clonedList.author
            let body = clonedList.body
            let created_at = newTimeStamp

        const newList = {
            title,
            topic,
            author,
            body,
            created_at
        }
        return newList
    })
return newListArr
};

exports.makeRefObj = list => {

    const refObj = {}
  if(!list.length) return refObj

  list.forEach((listObj) => {

    let key = listObj.title

    let value = listObj.article_id

    refObj[key] = value

    return refObj
  })
  return refObj
};

exports.formatComments = (comments, articleRef) => {
    if(!comments.length) return [];

   const formattedComments = comments.map(comment => {
        let key = comment.belongs_to


        let value = articleRef[key]

        let newTimeStamp = new Date(comment.created_at)

        let body = comment.body
        let article_id = value
        let author = comment.created_by
        let votes = comment.votes
        let created_at = newTimeStamp

        const newComment = {
            body,
            article_id,
            author,
            votes,
            created_at
        }

        return newComment
    })
    return formattedComments
};
