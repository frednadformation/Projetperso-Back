const mongoose = require("mongoose");

const voitureSchema = mongoose.Schema({
    marque : {type : "String"},
    modele: {type : "String"},
    annee : {type : "Number"},
    immatriculation : {type : "String"},
    description : {type : "String"},
    mise_en_service : {type:"Date"},
    img: {type: "String"}
});

module.exports = mongoose.model('Voiture', voitureSchema);