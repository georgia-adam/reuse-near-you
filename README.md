# ReUse Near You

This app provides a platform for users to trade furniture and other large household items with others in their local community. The app is deployed with Firebase hosting [here.](https://reuse-near-you.web.app/)

## Feature Set

### User Authentication

This app uses Firebase authentication to allow users to sign in with their Google account.

### Posting

Once signed in, users will see "create post" in the navigation bar. The route /createpost is protected and cannot be accessed if the user is not authenticated. If the user tries to access the path without being signed in, they will be redirected to the login page.

Posts must include a title, an image, and text details about the item. The submission button will be disabled if any input fields are empty, or the title and/or item details are too lengthy. Once a post is submitted, the user wil be redirected to the homepage where they will see their post.

Posts data is saved to the Firebase Firestore database. Images are saved to Firebase storage.

### Homepage

The homepage displays the posts in the app's database. The most recent posts appear at the top of the page. Posts include a title, a timestamp, an image, text, the user's Google account name, and a mailto button to email the user. If the original poster is signed in, they may click on the &#735; in the top right of the post to delete their post. The &#735; will not be displayed for posts by other users.

## Dependencies

ReUse Near You relies on the following dependencies found in the package.json file:

  "dependencies": {
    "firebase": "^9.9.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "uuid": "^8.3.2",
    "web-vitals": "^2.1.0"
  }

## Installation

1. Clone this repository.
2. Install dependencies by running `yarn install`.
3. After installation finishes successfully, run `yarn start` to start the server.

ReUse Near You was developed by [Ada Developers Academy](https://adadevelopersacademy.org/) cohort 17 student Georgia Adam as her capstone project.