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
    // console.log(key)

    let value = listObj.article_id
    // console.log(value)

    refObj[key] = value

    return refObj
  })

//   console.log(refObj)
  return refObj
};

exports.formatComments = (comments, articleRef) => {
    if(!comments.length) return [];

    
};
