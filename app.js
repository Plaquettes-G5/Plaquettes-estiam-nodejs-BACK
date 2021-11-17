const express = require("express");
const app = express();
const db = require('./kernel/db');


const router = express.Router();
const titleAndImageController = require("./controllers/titleAndImageController");

/* Ce fichier sert à appeler les contrôleurs de modèles et présenter la donnée en réponse 
aux requêtes entrantes. La gestion d'accès se fera en appelant une fonction de contrôle d'accès
depuis chaque route de ce fichier */

db.connect();

router.get('/', (req, res) => {
    res.write('Root');
    res.write(`
        /get-partners to search some partners or get the full list
        /add-partners to insert partners in DB
        /update-partner to edit a partner
        /delete-partner will delete one of serveral partners
        
        Pour tester l'API, utiliser Postman, Insomnia ou autre moyen
        permettant d'inclure un body avec les requêtes HTTP.
    `);
    res.send();
})

router.post('/add-partners', (req, res) => {
    titleAndImageController.insertMultipleDocuments(req.body, 'Partner').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.get('/get-partners', (req, res) => {
    titleAndImageController.readDocuments(req.body, 'Partner').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.post('/update-partner', (req, res) => {
    titleAndImageController.updateDocument(req.body, 'Partner').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.post('/delete-partners', (req, res) => {
    titleAndImageController.deleteDocuments(req.body, 'Partner').then(resp => {
        console.log('got',resp)
        res.write(JSON.stringify(resp));
        res.send();
    })
});

app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use('/', router);
app.use('/add-partners', router);
app.use('/get-partners', router);
module.exports = app;