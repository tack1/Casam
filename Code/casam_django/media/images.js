function ChangeOp(id,value){
//  $('big_image'+id).style.opacity = value;
//  $('big_image'+id).filters.alpha.opacity = value*100;
  $('big_image'+id).setOpacity(value);
}
function hide_image(id){
//  $('big_image'+id).src = "#";
//  $('big_image'+id).style.display = "none";
	$('big_image'+id).hide();

  $('delete_images').removeChild($('delete_photo_'+id));  
}

function show_image(location){
  var insert = 0;
  for(var i = 1; i <= total_images; i++){
    if($('big_image'+i).style.display != 'block')
      insert = i;
  }
  if(insert == 0){
    total_images++;
    insert = total_images;
  }
  
  //To do: make the sliders and the big_images div just like the objects of the delete button
  $('big_images').innerHTML = $('big_images').innerHTML+'<img onclick="saveLandMark('+insert+')" id="big_image'+insert+'" src="#" alt="plaatje" style="display: none; position: absolute; top: 25; left: 225; opacity: 0.4; filter: alpha(opacity=40)" />';
  $('sliders').innerHTML = $('sliders').innerHTML+'<div id="track'+insert+'" style="width:200px; background-color:#ccc; height:10px;"><div id="handle'+insert+'" style="width:10px; height:15px; background-color:#f00; cursor:move;"></div></div><p id="valueopac'+insert+'">&nbsp;</p>';
  
  //creating the delete button
  var newbutton = document.createElement('button');
  newbutton.innerHTML = 'Reset foto '+insert;
  newbutton.onclick = function() { hide_image(insert) };
  newbutton.setAttribute('id','delete_photo_'+insert);
  $('delete_images').appendChild(newbutton);
  for(var i = 1; i <=total_images; i++){
    eval("new Control.Slider('handle"+i+"', 'track"+i+"', {onSlide: function(v) { $('valueopac"+i+"').innerHTML = 'slide: ' + v*100; ChangeOp("+i+",v) },onChange: function(v) { $('valueopac"+i+"').innerHTML = 'changed: ' + v*100;  ChangeOp("+i+",v) },sliderValue: 0.4})");
  } 
  
  $('big_image'+insert).src = location;
  //$('big_image'+insert).style.display = 'block';
  $('big_image'+insert).show();
}