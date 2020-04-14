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

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
