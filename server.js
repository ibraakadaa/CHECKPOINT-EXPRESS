//Node js Test 
const path=require('path')
console.log('my first app express with node js')
//import express 
const express=require('express')
// app is an express () instance : associate express methods to a variable
const app=express();
//todat is a an Date() instance 
const today=new Date(Date.now())
// my global middleware 
const day= today.getDay();
const hours=today.getHours();
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
app.get('/outofservice.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','outofservice.html')) 
})
app.use((req,res,next)=>{
    console.log("A new request received at "+ days[day] +" "+ hours +" H" );
(day === 0 || day === 6) || (hours <9 || hours >= 17)  ? // day[0-6] // hours[0-23]
// res.status(404).send('<h1>Only available during working hours (Monday to Friday,  from 9 to 17)</h1>')
res.redirect('/outofservice.html')  // redirect to an html file with new path 
:next();   // to the next middelware! 
})
//rendering static html files ( public: folder that contains our html files and take the index.html as first rendering page )
app.use(express.static(__dirname+'/public'));
app.use('/styleSheets',express.static(__dirname +'/styleSheets'));
//rendering css style 
//app.use(express.static('styleSheets'));
// create the port variable
const port=5000
//listen to the port
app.listen(port,(err)=>{
     err? console.log(err) : console.log('server is running on port 5000')
})