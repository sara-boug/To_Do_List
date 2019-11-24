var parser=require('body-parser');
var mongoose=require('mongoose');
var data = [{item:"buying all the flowers"}];
var urlencodedparser=parser.urlencoded({extended:false});
mongoose.connect('mongodb://sara:sara@mongodb1-shard-00-00-5eild.mongodb.net:27017,mongodb1-shard-00-01-5eild.mongodb.net:27017,mongodb1-shard-00-02-5eild.mongodb.net:27017/test?ssl=true&replicaSet=mongodb1-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true,
useUnifiedTopology:true
}).catch(error => handleError(error));
mongoose.connection.once('open', function(){
console.log('the connection is made');
});

var schema= new mongoose.Schema({
item:String});

var todo= mongoose.model('todos', schema);

var item= todo({item:'buyflower'}).save(function(err){
  console.log("no error apeared");

if (err) throw err


});


module.exports=function(app){
app.get('/todo', function(req,res){
res.render('index',{data:data});

});
app.post('/todo', urlencodedparser, function(req,res){

data.push(req.body);
res.json(data);

});

app.delete('/todo/:item', function(req,res){
 data= data.filter(function(items){
return items.item.replace(" ","-")!== req.params.item;
});

 res.json(data);

});


}
