# NC News Backend Express Server

## Important: This project is no longer supported

This project highlights everything learned during the backend section of the Northcoders bootcamp. It includes using RESTful practices, seeding a DB, express, knex and axios. The API gives access to a DB containing articles, comments, topics and users.

## Getting Started

### Feel free to clone the repo, but do not fork it! 

#### git clone https://github.com/josephnewton861/nc_news.git

##### View the hosted API on Heruko on the following link: https://joseph-nc-news.herokuapp.com/api/

## Available Endpoints

### Users: 

#### GET users: https://joseph-nc-news.herokuapp.com/api/users/tickle122
      Responds with a user object with the key of user.
  
### Topics: 

#### GET topics: https://joseph-nc-news.herokuapp.com/api/topics
	Responds with an array of topic object with the key of topics.
  
### Articles: 

#### GET articles: https://joseph-nc-news.herokuapp.com/api/articles
	Responds with an array of article objects with the key of articles.

##### Accepts the following queries:
- `sort_by`, sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `author`, filters the articles by the username value specified in the query
- `topic`,  filters the articles by the topic value specified in the query

#### GET articles by article_id:  https://joseph-nc-news.herokuapp.com/api/articles/1
	Responds with an object of a single article with he key of article.
 
#### PATCH an articles votes by an articles id: https://joseph-nc-news.herokuapp.com/api/articles/1
	Responds with a single article object that has been altered on the key of article.

##### Request body: { "inc_votes": 1 }OR{ "inc_votes": -1 }


### Comments:

#### GET comments by article_id: https://joseph-nc-news.herokuapp.com/api/articles/1/comments
  	Responds with an array of comments related to the article_id inputted on a key of comments.
    
##### Accepts the following queries: 
 - `sort_by`, sorts the comments by any valid column (defaulted to created_at)
 - `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
 
 #### POST a comments by article_id:https://joseph-nc-news.herokuapp.com/api/articles/1/comments 
    Request body: { "username": "tickle122", "body": “Added comment" }
    
 #### PATCH a comment votes by article_id: https://joseph-nc-news.herokuapp.com/api/articles/1/comments
	  Responds with a single article object that has been altered on the key of comment.
	    Request body: { "inc_votes": 1 }OR{ "inc_votes": -1 }
      
#### DELETE a comment by an articles article_id: https://joseph-nc-news.herokuapp.com/api/articles/1/comments
	  Responds with nothing and deletes a comment by its id.

## Running the Tests
#### Testing for each endpoint was implemented using mocha and chai, to run the test file (app.spec.js):
    npm install
    npm t
```
