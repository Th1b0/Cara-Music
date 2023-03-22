<div align="center">
  <h1>music.thibokuijpers.be</h1>
  <h2> First version under development</h2>
</div>

<div align="center">

  [![](https://img.shields.io/badge/license-mit-black?style=for-the-badge)](LICENSE.md)
![](https://img.shields.io/github/issues/Th1b0/music.thibokuijpers.be?style=for-the-badge)
![](https://img.shields.io/github/stars/Th1b0/music.thibokuijpers.be?style=for-the-badge)
![](https://img.shields.io/github/v/release/Th1b0/music.thibokuijpers.be?style=for-the-badge)
![](https://img.shields.io/website?down_color=red&down_message=ofline&label=music.thibokuijpers.be&style=for-the-badge&up_color=dark%20green&up_message=online&url=https%3A%2F%2Fmusic.thibokuijpers.be)

</div>


## Overview

Music.thibokuijpers.be is a web application that enables users to stream music from YouTube Music and connect with Spotify to listen to their playlists. This free service provides users with a convenient way to enjoy their favorite music without any additional fees.

## Features

- Stream music from YouTube Music
- Connect with Spotify
- Listen to your Spotify playlists

## How it Works

The application works by querying the Spotify API for the user's playlists and the tracks within them. The tracks are then rendered on the site. When a user selects a track to play, the server looks for it on YouTube. If the Spotify track and the YouTube track match, it is streamed from YouTube Music to the app.

## Future Plans

- Rewrite the code using better frameworks and strategies suited for our use cases.
- Add more basic functionality and fix known bugs.
- Add download functionality for offline listening.
- Add search functionality.
- Optimize code to improve load times.
- Add user protection features.
- Add YouTube Music connection to play music from YT Music playlists.
- Add import playlists from other sources functionality.
- Add playlist manager for YT Music and Spotify.
- Develop an android app
- Develop an IOS app

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
2. Download all necessary packages for the app: `npm install`.
3. Obtain a client ID and secret ID from Spotify and update the values in `/api/controller/authController.js:5`.
4. Lastly update the callback url to the url you wish to use for the app for example `https://example.com/api/auth/callback` or `https://192.168.1.1/api/auth/callback`.

```js
const client_secret = "HERE_COMES_CLIENTSECRET";
const client_id = "HERE_COMES_CLIENTID";
const callback_url = "http://localhost:3000/api/auth/callback";
```
> To get a client ID and secret ID from Spotify, follow this guide on how to register an app on Spotify:
[Register an app](https://developer.spotify.com/documentation/general/guides/authorization/app-settings).
> Make sure the callback url matches the redirect url in the spotify app settings
## Start the app
To host the app you can use your own computer or an old computer used as a server and port forward it trough your home internet or another solution is to host it on a cloud server.
### steps
1. You will need to navigate to the directory where the app lives.
2. You can start it by doing `node index.js` or `npm start`, but an approach that I more like is by starting it with pm2 `pm2 start index.js -n music.thibokuijpers.be`. If pm2 is not installed you can install it by doing `npm install pm2 -g`.
3. Once started you can open a browser and navigate to the ip or domain of the server.

### Usefull pm2 commands
- Start the app: `pm2 start music.thibokuijpers.be`
- Stop the app: `pm2 stop music.thibokuijpers.be`
- Check status: `pm2 status`
- Delete app from pm2: `pm2 delete music.thibokuijpers.be`

## License
The application is licensed under the terms of the MIT Open Source license and is available for free.
## Links
[portfolio](https://thibokuijpers.be)<br>
[github](https://github.com/Th1b0)