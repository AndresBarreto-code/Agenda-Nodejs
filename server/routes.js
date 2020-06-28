const Router = require('express').Router();
const {UserModel,EventModel} = require('./model.js');

Router.post('/login',(peticion, respuesta) =>{
    UserModel.findOne({mail:peticion.body.user,password:peticion.body.pass}).exec((err,doc)=>{
        console.log(peticion.body);
        if(err){
            respuesta.status(500);
            respuesta.json(err);
        }else if(doc){
            respuesta.send("Validado");
        }else{
            respuesta.send("Datos invalidos");
        }
    })
})

module.exports = Router;