const express = require('express');
const fetch = require('cross-fetch');

const app = express();

const getUsers = async () => {
    try {
        const usersReq = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersReq.json();
        //console.log(users)
        return users;
    } catch {
        console.error('Error occured while getting users!');
        return;
    }
}

const getAlbums = async () => {
    try {
        const albumsReq = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albums = await albumsReq.json();
        //console.log(albums)
        return albums;
    } catch {
        console.error('Error occured while getting albums!');
        return;
    }
}

const getUserIdByName = (users, name) => {
    for (let i = 0; i < users.length; i++)
        if (users[i].name.includes(name,0))
            return users[i].id;
    return;
}

const getAlbumsByUserId = (albums, userId) => {
    let userAlbums = [];
    for (let i = 0; i < albums.length; i++)
        if (albums[i].userId === userId)
        userAlbums.push(albums[i].title);
    return userAlbums;
}
var users;
var albums;

(async () => {
    try {
        users = await getUsers();
        albums = await getAlbums();
    } catch {
        console.error('Error in main function!');
        return;
    }
})();

    app.set('view-engine', 'ejs');    
    app.use(express.urlencoded({extended: false}));

    app.get('/albums/:userName', (req, res) => {
        const id = getUserIdByName(users, req.params['userName']);
        const userAlbums = getAlbumsByUserId(albums, id);

        res.send(userAlbums);
    });

    app.get('/users', (req, res) => {
        res.send(users);
    });
    app.get('/client',(req, res) =>{
        let names = [];
        for(var i = 0; i < users.length; i++){
            names.push(users[i].name);
        }
        res.render("list.ejs",{users:names});
    });
    app.post('/albums', (req, res) => {
        const id = getUserIdByName(users, req.body.names);
        const userAlbums = getAlbumsByUserId(albums, id);

        res.send(userAlbums);
    });
    app.listen(3000, () => {
        console.log('The application is available on port 3000');
    });