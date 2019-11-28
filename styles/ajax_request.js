$(document).ready(function(){

$('form').on('submit', function(){
 var item=$('form input');
var todo={item: item.val() ,
          done:false};
   $.ajax({
type:'POST',
url:'/todo/',
data: todo,
success: function(data){
location.reload();
}});
return false;
});


$('.item i').click(function(){
 var item=$(this).parent().text().replace(' ','-');
   $.ajax({
type:'DELETE',
url:'/todo/'+item,
success:function(data){

location.reload();

}
});
});

$('.item p').click(function(){
var item=$(this).text().replace(' ','-');
 $.ajax({
type:'PUT',
url:'/todo/'+item,
success:function(data){
  //alert(data);
location.reload();
}
});
});

});
