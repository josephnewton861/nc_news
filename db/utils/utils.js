exports.formatDates = (list) => {
  const newList = list.map((obj) => {
    const newObj = { ...obj };
    let newTimestamp = new Date(newObj.created_at);
    newObj.created_at = newTimestamp;
    return newObj;
  });
  return newList;
};

exports.makeRefObj = (list) => {
  const refObj = {};

  list.forEach((listObj) => {
    let key = listObj.title;
    let value = listObj.article_id;

    refObj[key] = value;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (!comments.length) return [];

  const formattedComments = comments.map((comment) => {
    let key = comment.belongs_to;
    let value = articleRef[key];
    let newTimeStamp = new Date(comment.created_at);

    let body = comment.body;
    let article_id = value;
    let author = comment.created_by;
    let votes = comment.votes;
    let created_at = newTimeStamp;

    const newComment = {
      body,
      article_id,
      author,
      votes,
      created_at,
    };

    return newComment;
  });
  return formattedComments;
};
