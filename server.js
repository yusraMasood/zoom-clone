const express =require('express')
const {v4:uuidv4} =require('uuid') 
const app=express()
// const server=require('http').Server(app)


app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId: req.params.room})

})
app.listen(3030,()=>{
    console.log('hiii');
})