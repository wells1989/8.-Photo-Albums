# Photo Album React-Redux

This project is a basic photo / album collection App, utilising React on the front end and Redux for the state management and Api Requests.

## Installation / dependencies

```bash
cd albums
npm install
```

```javascript
"dependencies": {
        "@faker-js/faker": "^8.2.0",
        "@reduxjs/toolkit": "^1.9.7",
        "@testing-library/jest-dom": "^5.17.0",
        "@testing-library/react": "^13.4.0",
        "@testing-library/user-event": "^13.5.0",
        "axios": "^1.6.1",
        "classnames": "^2.3.2",
        "json-server": "^0.17.4",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-icons": "^4.11.0",
        "react-redux": "^8.1.3",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4"
      },
      "devDependencies": {
        "tailwindcss": "^3.3.5"
      }
```

## Usage

### Available

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run start:server`

Runs the server on http://localhost:3005

### Api requests

Users:
-  fetchUsers: GET http://localhost:3005/users
-  addUser: POST GET http://localhost:3005/users

```
parameters(newName)

body: {
        name: newName
      }
```

-  removeUser: DELETE `http://localhost:3005/users/:id`

Albums:
- fetchAlbums: GET http://localhost:3005/albums/:id

```javascript
query: (user) => {
       return {
          url: '/albums',
          params: {
              userId: user.id
                  },
          method: 'GET',
         };
}  
```

- addAlbum: POST http://localhost:3005/albums

```javascript
 query: ({user, localState}) => {
         return {
           url: '/albums',
           method: 'POST',
           body: {
                 userId: user.id,
                 title: localState.newAlbum
                 }
                 }
}
```
- removeAlbum: DELETE http://localhost:3005/albums/:id

```javascript
query: (album) => {
      return {
        url: `/albums/${album.id}`,
        method: 'DELETE'
              };
}
```

Photos:
- fetchPhotos GET http://localhost:3005/photos

```javascript
query: (album) => {
     return {
        url: '/photos',
        params: {
                 albumId: album.id
                },
        method: 'GET'
             };
}
```

- addphoto POST http://localhost:3005/photos

```javascript
query: ({album, localState}) => {
    return {
         url: '/photos',
         method: 'POST',
         body: {
           url: localState.url,
           albumId: album.id,
                },  
           }
  }
```

### Front End UI

![Screenshot (439)](https://github.com/wells1989/Full-stack-blog/assets/122035759/14222723-f64c-427c-9fd1-d50e64d39087)

![Screenshot (440)](https://github.com/wells1989/Full-stack-blog/assets/122035759/9447d6fb-0b4c-45d5-8d8a-dfeaf11f7800)

![Screenshot (441)](https://github.com/wells1989/Full-stack-blog/assets/122035759/49196cf6-93ae-4bd2-a2b5-c607315a922d)

## Project Notes
- The purpose of this project was to practice advanced state management techniques using both AsynThunks and RTK, hence the use of both of these in this project
- Due to the above focus the styling is basic but functional (future additions to functionality could include logging in as a user, then viewing others albums if marked private etc.)
- The course was the final part of a course on Udemy by Stephen Grider, who helped provide walkthroughs of the more difficult state managemement parts. However there were numberous extra functionalities added after finishing the course (for instance the searching functions and the option to add either random images or specific image urls)
- Json server was used in this project as again the focus was on advanced state management in React-Redux



