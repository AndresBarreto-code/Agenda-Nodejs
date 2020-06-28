const {UserModel,EventModel} = require('./model.js');
let user1 = new UserModel({
    userId:106,
	full_name:'Mail 1 Mail',
    mail:'mail@mail.com',
    password:'Apple123',
	bod:'1996-06-20'
});
let user2 = new UserModel({
    userId:107,
	full_name:'Mail 2 Mail',
    mail:'mail1@mail.com',
    password:'Banana456',
	bod:'2013-01-12'
});
let user3 = new UserModel({
    userId:108,
	full_name:'Mail 3 Mail',
    mail:'mail2@mail.com',
    password:'Orange789',
	bod:'2014-07-14'
});
user1.save((error)=>{
    if(error){
        console.log({status:500,error:error})
    }else{
        console.log({status:200,msg:'Usuario creado'})
    }
});
user2.save((error)=>{
    if(error){
        console.log({status:500,error:error})
    }else{
        console.log({status:200,msg:'Usuario creado'})
    }
});
user3.save((error)=>{
    if(error){
        console.log({status:500,error:error})
    }else{
        console.log({status:200,msg:'Usuario creado'})
    }
});

let eventExample1 = new EventModel({
    title:"Ejemeplo 1",
    start:"2020-06-20",
    allDay:true,
    id_user:106
});
let eventExample2 = new EventModel({
    title:"Ejemeplo 2",
    start:"2020-06-8",
    startTime:"07:00",
    end:"2020-06-12",
    endTime:"08:00",
    allDay:false,
    id_user:106
});
eventExample1.save((error)=>{
    if(error){
        console.log({status:500,error:error})
    }else{
        console.log({status:200,msg:'Evento creado'})
    }
});
eventExample2.save((error)=>{
    if(error){
        console.log({status:500,error:error})
    }else{
        console.log({status:200,msg:'Evento creado'})
    }
});