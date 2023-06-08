const express= require('express')
const cors =require('cors')
const app=express()
const dotenv=require('dotenv').config()
const db=require('./config/db')
const BotMessage= require('./models/messageModel')

app.use(cors())
// socket io
const socketIO=require('socket.io')

app.use(express.json())

// setup port for server
const PORT=process.env.PORT || 8080
const server=app.listen(PORT,()=>{
    console.log('server running successfully');
})



const io=socketIO(server,{
cors:{
    origin:'http://localhost:3000',
    credentials:true
},
})

// database
db();


// socket io

io.on('connection',async (socket)=>{
    console.log('A user connected');

 try{
const messages= await BotMessage.find({},'text')
messages.forEach((message,index)=>{
 setTimeout(()=>{
socket.emit('chatbot-message',message.text)
},index * 2000)
})

 }catch(error){
    console.log('error fetching messages');
 }
    
    
})


app.use('/api/auth', require('./routes/user'))



