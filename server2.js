const express = require('express');

//On importe body-parser pour qu'il puisse analyser le body de nos requetes
const bodyparser = require("body-parser")
const server = express();

const PORT = 3000;
// on change le const en let pour qu'on soit en mesure de donner une nouvelle valeur à users
let users = [{
    id: 1,
    nom: 'Lisangola',
    prenom: 'Christian',
    email: '',
    poste: 'Homme de ménage',
    numeroTelephone: ['+243908888888'],
    estMarie: false,
    pays: 'RDCongo',
  },
  {
    id: 2,
    nom: 'Motoba',
    prenom: 'Claude',
    email: 'claude@gmail.com',
    poste: 'Architecte infrastructures',
    numeroTelephone: ['+243818885454', '+243844457484'],
    estMarie: true,
    pays: 'Liban',
  },
  {
    id: 3,
    nom: 'Nyembo',
    prenom: 'Thesy',
    email: 'thesy.nyembo@gmail.com',
    poste: 'DevOPS & Développeuse Fullstack',
    numeroTelephone: ['+2438108488888', '+243844145444'],
    estMarie: false,
    pays: 'Djibouti',
  },
  {
    id: 4,
    nom: 'Gael',
    prenom: 'Mapwata',
    email: 'mapwata.gael@gmail.com',
    poste: 'Administrateur systèmes & Réseaux',
    numeroTelephone: ['+243818897188', '+243844445744'],
    estMarie: true,
    pays: 'Inde',
  },
  {
    id: 5,
    nom: 'Makengo',
    prenom: 'Stanislas',
    email: 'makengo.stanislas@gmail.com',
    poste: 'Chef de projet digital',
    numeroTelephone: ['+243814428888', '+243844446734'],
    estMarie: true,
    pays: 'Algérie',
  },
  {
    id: 6,
    nom: 'Ndovia',
    prenom: 'Ruth',
    email: 'ruth.ndovia@gmail.com',
    poste: 'Administrateur systèmes & Réseaux',
    numeroTelephone: ['+24381458888', '+243844434444'],
    estMarie: false,
    pays: 'RDCongo',
  },
  {
    id: 7,
    nom: 'Bondjali',
    prenom: 'Chris',
    email: '',
    poste: 'Cordonier',
    numeroTelephone: ['+24390999898'],
    estMarie: true,
    pays: 'RDCongo',
  },
];

//EXERCICE
//Ajouter la possibilité de 
// - supprimer un object du tableau au travers de son ID
//   Mais il faudra utiliser la methode "delete" de express
//- D'ajouter un nouvelle element dans le tableau
//  Il faut utiliser la methode POST
//Pour tester pour devez utiliser postman

//Voici les indices
// - cors
// - Ajouter un middleware qui mettre les informations envoyées avec POST dans la methode BODY
//   à voir express.bodyparser(...)
//Expliquer chaque ligne de code par un brief commentaire et expliquer son utilité et problème qu'il résoud
/**
 * Il y a des commentaires qui expliquent tous ce que vous devez faire.Mais le fichier je l'ai envoyé seul
 *  sans le fichier "package.json" ou autre chose.C'est à de faire tout ce qu'il faut pour faire tourner le
 *  projet et après vous allez m'envoyer un dossier zip avec votre projet.Mais dans votre ZIP ne mettez pas
 *  le dossier "node_modules"
 * 
 */

//On dit à notre server de mettre les information json envoyer dans req.body
server.use(bodyparser.json());

 
server.get('/', function (req, res) {
  res.send("Bienvenu dans notre page")
});

server.get('/api/users', (req, res) => {
  res.send(users);
});


server.get('/api/users/:matricule', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.matricule));
  res.send(user);
});


server.delete("/api/users/:matricule", (req, res) => {
  /**
   * on recupere le parametre entré et on stock dans la contante id
   * si l'utilisateur existe on donne a users la valeur d'un tableau contenant tous ses elements sauf l'ement qu'on veux supprimer 
   * Si l'utilisateur n'existe pas dans le tableau on envoi un message au client
   */
  const id = parseInt(req.params.matricule)
  if (id <= users.length + 1) {
    users = users.filter((user) => user.id != id);
    res.send(users);
  }
  else
  {
    res.send("Vous voulez supprimer un utilisateur qui n'existe pas");
  }
})


/**
 * on stock les indormations envoyées par l'utilisateur dans la constante data 
 * on verifie si les données envoyées par l'utilisateur contienent tous les champs
 * si oui on on ajoute un id aux données envoyées, on insert ces données dans le tableau et on envoye à l'utilisateur le tableau à jour
 * si non envoie un message d'erreur à l'utilisateur
 * */  
server.post("/api/users", (req, res) => {
  const data =  req.body;
  if (data.nom && data.prenom && data.pays && data.email && data.poste && data.numeroTelephone) 
  {
    if (data.estMarie === true || data.estMarie === false) 
    {
      data.id = users.length + 1;
      users.push(data);
      res.send(users)
    }    
  }
  else
  {
    res.send("Vous avez entrer des données erronées");
  }
})
server.listen(PORT, function () {
  console.log(`Le serveur écoute sur le PORT ${PORT}`);
})


