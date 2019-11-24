var express= require("express");
var todo_controller= require("./controllers/todo_controller.js");
var app=express();

app.set("view engine", 'ejs');
//using the middleware
app.use('/styles', express.static(__dirname+'/styles'));


todo_controller(app);
app.listen(3000);
console.log("listning to port 3000");
