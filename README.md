# Splattr
![Splatter](https://i.imgur.com/D9n1rGm.png)
Hi all and welcome to the GitHub Repo for Splattr.
Splattr is a social media platform for sharing digital drawings.
The idea is that this platfor can allow people to communicate and express themselves differently than they can on traditional social media platforms.

The front end repository for this project is located at https://github.com/freef/capstone-client.
The back end is located at https://github.com/freef/capstone-api.
The deployed site is at https://freef.github.io/capstone-client/#/.
The deployed back-end is hosted at https://agile-tor-41397.herokuapp.com/.

## Description
Very very briefly Google Hangouts added a small pencil icon to their chat program. The button opened up a small doodle pad and it provided hours of entertainment for myself and those I regularly chat with. Like many Google features, it mysteriously vanished. I miss it, and to recreate it I decided to start a new social media platform where people can chat using MS Paint like doodles. I'm hoping that this little forum will grow to be both silly and charming.

## Technology
### Front End
- [HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [ReactJS](https://reactjs.org/)
- [React Router](https://github.com/ReactTraining/react-router)

### Back End
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [ExpressJS](https://expressjs.com/)

## How it works
The front end mostly consists of an HTML Canvas & a component that retreives images from an AWS S3 Bucket.
The client will call toDatUrl on the HTML canvas and send it to the database on Heroku using Axios.
The server will send the image to an AWS S3 bucket and store the location.
the API is a RESTful API built MongoDB and ExpressJS. It queries the database and returns a JSON.
JavaScript parses the JSON and renders pieces of it on the page using ReactJS. That HTML is stylized using CSS and a small amount of React Bootstrap.
For Patch requests the image redraws the image onto the Canvas. The deployed site is whitelisted to avoid CORS issues.

## Planning
Entering this project I was wrestling a lot with Scope. Many of the ideas I had were not achievable in the timeframe of the project. Entering the weekend I discovered the Canvas tag In HTML 5 and decided to try my hand at making a forum where users could communicate only using Images.

I streamlined my planning for this project, opting for a basic wireframe and using a backend configuration that I was most familiar and comfortable with. Express was selected as making alterations to the data models is a much less involved process than rails.

React was selected for the front end as I enjoyed the structure of React and wanted more experience using the framework.

In the original 4 days of the project, getting Amazon S3 to work smoothly with my project turned out to be quite a hassle. Editing an image from AWS caused a CORS security error and it took a great deal of time to resolve. Ulimately I had to whitelist my deployed client for users to update images.

The event loop also posed a challenge to this project. Redrawing images from AWS to the Canvas during patch requests often took longer than redrawing the newly added lines, resulting in the original drawing being placed over the new lines. This was solved by adding a set timeout to the canvas redraw action when updating images.

## Problem solving
The following are tips for solving any problems:
- Check that the problem is a requirment
- Double check that its actually a requirement
- Read the error message
- Check for plurlalization/capitalization
- Check syntax
- Check if the code thats giving you trouble works somewhere else
- Simplify the code/process
- console log paramaters
- console log output
- try running code again
- Try do do it differently if none of the above worked and you still get the same error message


## Entity Relationship Diagram
Current ERD
```
|users|-|-<|Drawings|

Comments coming soon!
```

## Known Issues
- The Undo button only removes the latest point from the drawing, not the latest action
- There is no usermanual
- Performance drops noticably when using a background color
  - This should be solved by adding a background color to the draw Array rather than invoking it as a canvas fill outside the normal draw cycle.

## Wirerames
![Wireframe](https://i.imgur.com/K4JTFNM.png)

## User stories
As a user I would like to click on the canvas to create lines to create drawings
as a user i would like to be able to title my drawing to tell people what it is
as a user i would like to be able create an account with a username, email and password
as a user i would like to sign in with a username email and password
as a user i would like to save my images as a post so others can see them
as a user i would like to be able to view all posts
as a user i would like to be able to comment on posts

## Potential Future Improvements
- Meta
  - find a better way to identify and catalog necessary UX improvements
- UI Improvements
  - Fix Navbar in Mobile
  - Create tile layout for desktop
  - Create profile page

- Features
  - View all posts by an author
  - Add replies
  - Mke a copy and "deface" another user's drawings
  - allow for nested replies
  - add likes on comments

-DB Changes
  - Allow for nested replies
  - Allow for likes on comments

## Set Up and Contributing

All are welcome to contribute to this project.
Please look at the list of future improvements for places to get started. Performance optimization for the canvas and new canvas tools are high priority.
To get started:

### Front End
- Fork this repository
- Clone to a local folder.
- NPM Install
- Run npm start to run local server.

### Back End
- Fork the back end repository
- Clone to local folder
- NPM install
- NPM Run Server to run local server

Documenataion for libraries and languages is available up above.

## API

Scripts are included in [`curl-scripts`](curl-scripts) to test built-in actions. Add your
own scripts to test your custom API. As an alternative, you can write automated
tests in RSpec to test your API.

### Authentication

| Verb   | URI Pattern            | Controller#Action             |
|--------|------------------------|-------------------------------|
| POST   | `/sign-up`             | `users.post/sign-up`          |
| POST   | `/sign-in`             | `users.post/sign-in`          |
| PATCH  | `/change-password`     | `users.patch/change-password` |
| DELETE | `/sign-out`            | `users.delete/sign-out`       |

#### POST /sign-up

Request:

```sh
curl https://mdhs--backend.herokuapp.com/sign-up \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "handle": "'"${HANDLE}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'
```

```sh
EMAIL=ava@bob.com PASSWORD=hannah curl-scripts/auth/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "ava@bob.com"
  }
}
```

#### POST /sign-in

Request:

```sh
curl https://mdhs--backend.herokuapp.com/sign-in \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'
```

```sh
EMAIL=ava@bob.com PASSWORD=hannah curl-scripts/auth/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "ava@bob.com",
    "token": "BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f"
  }
}
```

#### PATCH /change-password

Request:

```sh
curl --include --request PATCH "https://agile-tor-41397.herokuapp.com/change-password" \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'
```

```sh
OLDPW='hannah' NEWPW='elle' TOKEN='BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f' sh curl-scripts/auth/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out

Request:

```sh
curl https://agile-tor-41397.herokuapp.com/sign-out \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN='BAhJIiVlZDIwZTMzMzQzODg5NTBmYjZlNjRlZDZlNzYxYzU2ZAY6BkVG--7e7f77f974edcf5e4887b56918f34cd9fe293b9f' sh curl-scripts/auth/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```


### Drawings
| Verb    | URI Pattern           | Route Action      |
|---------|-----------------------|-------------------|
| POST    | `/drawings`              | `create`          |
| GET     | `/drawings`              | `drawings#index`     |
| GET     | `/drawings/:id`          | `drawings#show`      |
| PATCH   | `/drawings/:id`          | `drawings#update`    |
| DELETE  | `/drawings/:id`          | `drawings#destroy`   |
| PATCH   | `/likes/:id`          | `drawings#update`    |
#### POST /drawings
Request:

```sh
curl "https://agile-tor-41397.herokuapp.com/drawings" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "draw": {
      "title": "'"${TITLE}"'",
      "img": "'"${BODY}"'"
    }
  }'
```

#### GET /drawings
Request:
```sh
curl "https://agile-tor-41397.herokuapp.com/drawings" \
  --include \
  --request GET \
  ```

#### GET /my-drawings
Request:
```sh
curl "https://agile-tor-41397.herokuapp.com/my-drawings" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}"
  ```
Response:
#### GET /drawings/:id
Request:
```sh
curl "https://agile-tor-41397.herokuapp.com/drawings/${ID}" \
  --include \
  --request GET \
  ```

#### PATCH /drawings/:id
Request:
```sh
curl "https://agile-tor-41397.herokuapp.com/drawings/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "draw": {
      "title": "'"${TITLE}"'",
      "img": "'"${BODY}"'"
    }
  }'
```

#### DELETE  /drawings/:id
Request:
```sh
curl "https://agile-tor-41397.herokuapp.com/drawings/${ID}" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --request DELETE \
```

#### PATCH  /likes/:id
Request:
```sh
curl "https://agile-tor-41397.herokuapp.com/drawings/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
--data '{
    "draw": {
      "id": "'"${LIKES}"'"
    }
  }'
```
## Acknowledgements
A particular thank you to the following blog posts:
- http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/ was incredibly helpful in learning to create a working paint application.
- https://h3manth.com/content/convert-any-image-html5-canvas was incredibly helpful in geting update to work.


-- Freef
