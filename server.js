const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set("view engine",'hbs');

app.use(express.static(__dirname+'/public'));//Middleware

app.use((req,res,next)=>{
    var now = new Date().toString();
    data = now+":"+req.method+req.path;
    console.log(data);
    fs.appendFile('server.log',data+"\n",(err)=>{
      if(err){
          console.log(err);
      }
    });
next();
});

app.use((req,res,next)=>{
res.render('maintenance.hbs',{
    pageTitle:'Maintenance Page'
});
})


hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
    });
app.get("/",(req,res)=>{
// res.send({
//     name : "Manish",
//     likes : [
//         'biking','movies'
//     ]
// });
res.render("home.hbs",{
pageTitle : 'HomePage',
header : 'Home Page',
welcomeMessage : 'Welcome to my Website',
});
});
app.get("/bad",(req,res)=>{
res.send({
    errorCode : 404,
    errorMessage : "Page not found"
})
});
app.get("/about",(req,res)=>{
res.render("about.hbs",{
    pageTitle:'AboutPage',
    header : 'About Page is here',
});
});

app.listen(3000,()=>{
    console.log("Server is up and running on port 3000");
});