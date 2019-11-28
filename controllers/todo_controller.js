var parser=require('body-parser');
var mongoose=require('mongoose');
 var urlencodedparser=parser.urlencoded({extended:false});
mongoose.connect('mongodb://localhost/do',
 {useNewUrlParser: true,
useUnifiedTopology:true});

mongoose.connection.once('open', function(){
console.log('the connection is made');
});
var schema= new mongoose.Schema({
item:String,
done:Boolean,
date: Date
});

var todo= mongoose.model('todos', schema);

module.exports=function(app){
app.get('/todo', function(req,res){

todo.find({}, function(err,data) {
if(err) throw err ;
    res.render('index',{data:data});
});
});

app.post('/todo', urlencodedparser, function(req,res){
  var new_data=  todo( { item: new String((req.body).item),
                      done:(req.body.done),
                      date: Date.now()});

              new_data.save(function(err,data){
                        if (err) throw console.log("there is an err");
  res.json(data);
});
});
app.delete('/todo/:item', function(req,res){
 todo.findOneAndDelete({item: req.params.item.replace("-", " ")} , false, function(err, data){
 //console.log( "this is the deleted data" , data.item);
if (err) throw err
res.json(data);
});
});
//"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"

function updating( element,bool ,res){
  todo.findOneAndUpdate(element, {$set:{done:bool}}, false, function(err,data) {
  if(err) throw err;

  res.json(data);
  });
}


app.put('/todo/:item', function(req, res ){
var element={item:req.params.item.replace("-"," ")};
var done=false;
todo.find(element, function(err, data){
if(data[0]!== undefined){
if(data[0].done===false){
done=true;
console.log( "for false done =="+ done);
updating(element,true,res);

}else if ((data[0].done===true)){
done=false;
console.log( "for true done =="+ done);
updating( element,false,res);
}
}
});

});

}
