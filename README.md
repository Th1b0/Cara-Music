<div align="center">
  <h1>Cara Music</h1>
</div>

<div align="center">

  [![](https://img.shields.io/badge/license-mit-black?style=for-the-badge)](LICENSE.md)
![](https://img.shields.io/github/issues/Th1b0/music.thibokuijpers.be?style=for-the-badge)
![](https://img.shields.io/github/stars/Th1b0/music.thibokuijpers.be?style=for-the-badge)
![](https://img.shields.io/github/v/release/Th1b0/music.thibokuijpers.be?style=for-the-badge)
![](https://img.shields.io/website?down_color=red&down_message=ofline&label=music.thibokuijpers.be&style=for-the-badge&up_color=dark%20green&up_message=online&url=https%3A%2F%2Fmusic.thibokuijpers.be)

</div>


## Overview

Cara Music is a web application that enables users to stream music from YouTube Music and connect with Spotify to listen to their playlists. This free service provides users with a convenient way to enjoy their favorite music without any additional fees.

## State of Cara Music

At present, this project is being approached with a more serious mindset. Cara Music will be rewritten using high-quality frameworks that are better suited for seamless integration. The codebase will be improved to ensure better quality, enabling this simple project to evolve into a complex application with numerous functionalities. Furthermore, special attention will be given to optimizing performance and facilitating effortless deployment, even allowing users to easily host it on free platforms without any additional costs. Additionally, I will be initiating the development of a mobile app that won't require a server and can be conveniently downloaded from third-party app stores.

### What am i doing now?

Currently, I am in the process of designing the web application and mapping out the user flow. Simultaneously, I am focusing on establishing the interaction and coordination between the client and server components. Moreover, I am actively involved in designing and testing exciting features, with the aim of integrating them seamlessly across multiple backend and frontend frameworks and libraries. This iterative process allows me to explore various possibilities and ensure a robust and comprehensive implementation.

### What will the changes be?

Firstly, I developed this project in under a week without a specific objective, utilizing HTML, CSS, vanilla JavaScript, and a Node.js Express server. Subsequently, React was introduced to enhance the project and facilitate the implementation of more advanced features. In order to elevate the overall quality of the project, enhance the developer experience, and reduce code complexity, I have made the decision to incorporate the following technologies:

__Frontend__:
- Svelte
- Tailwindcss
- Scss
- Typescript

__Backend__:
- Sveltekit
- MongoDB (Not sure)
- Typescript

__Third party APIs__
- Spotify
- Github
- Google oAuth 2.0

## Features

- Stream music from YouTube Music
- Connect with Spotify
- Listen to your Spotify playlists

## How it Works

The application works by querying the Spotify API for the user's playlists and the tracks within them. The tracks are then rendered on the site. When a user selects a track to play, the server looks for it on YouTube Music. If the Spotify track and the YouTube track match, it is streamed from YouTube Music to the app.

## Future Plans

###  App feautures
- Rewrite the code using better frameworks and strategies suited for our use cases.
- Add more basic functionality and fix known bugs.
- Add download functionality for offline listening.
- Add search functionality.
- Add spotify connection is not obliged.
- Optimize code to improve load times.
- Add own authentication
- Add user protection features.
- Add YouTube Music connection to play music from YT Music playlists.
- Add playlist manager for YT Music and Spotify.
- Add import playlists from other sources functionality.
- Develop an android app
- Develop an IOS app

### Selfhosting
- Automate deployment.
- Docker image.

## How to Use It

Users can access the application by visiting the website at music.thibokuijpers.be.

![](https://img.shields.io/website?down_color=red&down_message=ofline&label=music.thibokuijpers.be&style=for-the-badge&up_color=dark%20green&up_message=online&url=https%3A%2F%2Fmusic.thibokuijpers.be)

If the website is offline, or you prefer a homebrew solution, you can host the application yourself. A full installation guide is available in the [installation](#Installation) section below.

## Screenshots

![Screenshot 1](/media/screenshots/1.png)


![Screenshot 2](/media/screenshots/4.png)

## Installation

### Prerequisites

Ensure that you have the latest stable version of Node.js and npm installed.

### Steps

1. Clone the Git repository: `git clone https://github.com/Th1b0/spotify.thibokuijpers.be.git`.
2. Download all necessary packages for the app by doing `cd /backend` then `npm install` and `cd ..` then `cd /frontend` then `npm install`
3. Obtain a client ID and secret ID from Spotify and create a .env file in /backend
4. Lastly enter the callback url to the url you wish to use for the app for example `https://example.com/api/auth/callback` or `https://192.168.1.1/api/auth/callback`. and client secret and client id you got from spotify

```js
const client_secret = HERE_COMES_CLIENTSECRET
const client_id = HERE_COMES_CLIENTID
const callback_url = http://localhost:3000/api/auth/callback
```
> To get a client ID and secret ID from Spotify, follow this guide on how to register an app on Spotify:
[Register an app](https://developer.spotify.com/documentation/general/guides/authorization/app-settings).
> Make sure the callback url matches the redirect url in the spotify app settings
## Start the backend
To host the app you can use your own computer or an old computer used as a server and port forward it trough your home internet or another solution is to host it on a cloud server.
### steps
1. You will need to navigate to the directory where the app lives.
2. You can start it by doing `node index.js` or `npm start`, but an approach that I more like is by starting it with pm2 `pm2 start index.js -n music.thibokuijpers.be`. If pm2 is not installed you can install it by doing `npm install pm2 -g`.
3. Once started you can open a browser and navigate to the ip or domain of the server.
> The app will start on port 3001, but you can change it to whatever you want.

### Usefull pm2 commands
- Start the app: `pm2 start music.thibokuijpers.be`
- Stop the app: `pm2 stop music.thibokuijpers.be`
- Check status: `pm2 status`
- Delete app from pm2: `pm2 delete music.thibokuijpers.be`

## Build and serve the frontend
For serving the frontend you can use something like nginx or npm serve

### Steps
 1. cd into the frontend directory
 2. Build the frontend by doing `npm build`
 3. Serve the app configuring your favourite http server or do `serve -s build` if you have serve installed
> The app will start on port 3000, but you can change it to whatever you want.

## License
The application is licensed under the terms of the MIT Open Source license and is available for free.
## Links
[portfolio](https://thibokuijpers.be)<br>
[github](https://github.com/Th1b0)
