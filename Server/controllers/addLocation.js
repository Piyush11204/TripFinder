
const Location = require("../models/addLocation")

async function handleAllLocation(req,res){
    try{
        const locations = await Location.find()
        res.status(200).send(locations)
    }catch(e){
        res.status(500).send(e)
    }
}

module.exports = {
    handleAllLocation,
};