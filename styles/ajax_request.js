$(document).ready(function(){

$('form').on('submit', function(){

var item=$('form input');
var todo={item: item.val()};

$.ajax({
type:'POST',
url:'/todo',
data: todo,
success: function(data){
location.reload();
}});
return false;
});


$('.item').click(function(){
 
var item=$(this).text().replace(' ','-');
$.ajax({
type:'DELETE',
url:'/todo/'+item,
success:function(data){
location.reload();

}
});
});
});
