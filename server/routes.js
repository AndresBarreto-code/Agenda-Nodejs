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
Router.post('/events/new',(peticion,respuesta) => {
    let newEvent = new EventModel();
    if(peticion.body.allDay=='true'){
        newEvent = new EventModel({
            title: peticion.body.title,
            start: peticion.body.start,
            allDay: peticion.body.allDay,
            id_user: peticion.session.user.userId
        });
    }else{
        newEvent = new EventModel({
            title: peticion.body.title,
            start: peticion.body.start,
            startTime: peticion.body.startTime,
            end: peticion.body.end,
            endTime: peticion.body.endTime,
            allDay: peticion.body.allDay,
            id_user: peticion.session.user.userId
        });
    }
    console.log(newEvent)
    newEvent.save((error) => {
        if(error){
            respuesta.status("500")
            respuesta.json(error)
        }else{
            respuesta.send("Se creo evento")
        }
    });
});

module.exports = Router;