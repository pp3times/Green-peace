#GAME

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/pp3times/Green-peace

# go into game project directory
$ cd game

# install app's dependencies
$ npm install
```


### Basic usage

``` bash
# dev server with hot reload at http://localhost:8080
$ npm start
```

### Build

``` bash
$ npm build
```


## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
GAME
├── public/          #static files
│   └── index.html   #html template
│   resources/       #resources files
│   └── index.html   #html template
├── src/             #game project root
│   ├── components/  #components game source
│   ├── controller   # game controller source
│   ├── config/      #config
│   ├── map/         #game map source
│   ├── styles/      #user css source
│   ├── views/       #views source
│   ├── App.js
│   └── index.js
├── webpack.config.js
└── package.json
```