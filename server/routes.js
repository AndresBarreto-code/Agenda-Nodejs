const Router = require('express').Router();
const {UserModel,EventModel} = require('./model.js');

Router.post('/login',(peticion, respuesta) =>{
    UserModel.findOne({mail:peticion.body.user,password:peticion.body.pass}).exec((err,doc)=>{
        console.log(doc)
        if(err){
            respuesta.status(500);
            respuesta.json(err);
        }else if(doc){
            peticion.session.user = doc;
            respuesta.send("Validado");
        }else{
            respuesta.send("Datos invalidos");
        }
    })
});

Router.get('/events/all',(peticion,respuesta) => {
        console.log(peticion.session.user)
    EventModel.find({id_user:peticion.session.user.userId}).exec((err,doc)=>{
        if(err){
            respuesta.status(500);
            respuesta.json(err);
        }else{
            let eventos=[];
            doc.forEach(evento=>{
                if(evento.allDay){
                    eventos.push({
                        title:evento.title,
                        start:evento.start,
                        allDay:evento.allDay
                    })
                }else{
                    eventos.push({
                        title:evento.title,
                        start:evento.start + " " +evento.startTime,
                        end:evento.end + " " +evento.endTime,
                        allDay:evento.allDay
                    })
                }
            })
            respuesta.json(eventos);
        }
    })    
});

module.exports = Router;