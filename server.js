const express = require('express');
const pokemon = require('./models/pokemon');
const logger = require('morgan');

//initialize the apps
const app = express();
const methodOverride = require("method-override")

//Middleware
app.set("view engine", "ejs")
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
// mount our routes

// INDUCES 
/*
  Index
  New
  Delete
  Update
  Create
  Edit
  Show
*/

//Index Route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        allPokemon: pokemon,
    });
});

//New Route
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
});

//Delete Route
app.delete("/pokemon/:indexOfPokemonArray", (req, res) => {
    pokemon.splice(req.params.indexOfPokemonArray, 1)
    res.redirect("/pokemon")
});

//Update Route
app.put("/pokemon/:indexOfPokemonArray", (req, res) => {
    req.body = {
        name: req.body.name,
        type: [req.body.type],
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            
          }}
    pokemon[req.params.indexOfPokemonArray] = req.body;
    res.redirect('/pokemon')
});

//Create Route
app.post('/pokemon', (req, res) => {
    req.body = {
        name: req.body.name,
        type: [req.body.type],
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            
          }}


    console.log(req.body);
    pokemon.push(req.body);
    res.redirect('/pokemon');
});

//Edit Route
app.get("/pokemon/:indexOfPokemonArray/edit", (req,res) => {
    res.render(
        "edit.ejs",
        {
            pokemon: pokemon[req.params.indexOfPokemonArray],
            index: req.params.indexOfPokemonArray
        }
    )
});

//Show Route
// SHOW
app.get('/pokemon/:indexOfPokemonArray', (req, res) => {
    res.render('show', { 
        pokemon: pokemon[req.params.indexOfPokemonArray], 
        index: req.params.indexOfPokemonArray
    });
});

const port = 3005

// process.env is an object that lives in the node environment
// we use it to store environment variable

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});