var AddedImage = Class.create( {
	initialize : function(id, name, className) {
		this.id = id;
		this.name = name;
		this.opacity = 1;
		this.className = className; 
		this.imageElement = new Element('img');

		// HARDCODE THIS WIDTH FOR THE SLIDER TO WORK INITIALLY
		this.opacitySliderContainer = new Element('div');
		this.opacitySliderContainer.setHeight(3);
		this.opacitySliderContainer.setWidth(100);
		this.opacitySliderContainer.writeAttribute('id',
				'opacitySliderContainer_' + this.id);
		this.opacitySliderContainer.addClassName('slider');

		this.opacitySliderHandle = new Element('div');
		this.opacitySliderHandle.setHeight(9);
		this.opacitySliderHandle.setWidth(3);
		this.opacitySliderHandle.writeAttribute('id',
				'opacitySliderHandle_' + this.id);
		this.opacitySliderHandle.addClassName('handle');

		this.opacitySliderContainer.insert(this.opacitySliderHandle);

	},
	getAppropriateSizeURL : function() {
		console.log('get url');
		if(!this.className){
			console.log('no classname');
			return (base_path + 'imageLoader/byMaxWidthHeight/original/'
				+ ($('big_images').getWidth() - 2) + '/'
				+ ($('big_images').getHeight() - 2) + '/' + this.id);
		}else if(this.className == "casam.pdm"){
			return (base_path + 'imageLoader/byMaxWidthHeight/overlay/'
					+ ($('big_images').getWidth() - 2) + '/'
					+ ($('big_images').getHeight() - 2) + '/' + this.id);
		}
	},
	setOpacityForImage : function(opacityValue) {
		this.opacity = opacityValue;
		this.imageElement.setOpacity(this.opacity);
	},
	makeNonActive: function(activeImage){
		$('mainDiv_' + this.id).setStyle({border: 'none',
																			backgroundColor: ''});
		
		// Make measurements inactive (green and fire LoadMMDD on click)
		for(var i = 0; i < measurements.length; i++){
			if(measurements[i].imageid == this.id) {
				
				// Make green and non-draggable
				measurements[i].nonActive();			
				
				// Redirect a click
				measurements[i].pinDiv.observe('click', function(e) {
					hideLandmarkTooltip(e);
					LoadMMDD('', addedImages[0].id);
				});
			}
		}
		
		$('zoomImage').setAttribute('src', '');
		$('zoomImage').hide();
	},
	makeActive: function(){
		$('mainDiv_' + this.id).setStyle({border: '1px red dashed',
																			backgroundColor: '#ffdddd'});

		// Zoom image
		$('zoomImage').writeAttribute('src', base_path + 'imageLoader/byRatio/original/150/' + this.id);
		$('zoomImage').show();

		if(this.imageElement.parentNode){
			this.imageElement.remove();
		}
		$('big_images').insert( { bottom : this.imageElement	});

		// Restore potential measurement pins
		var mm_array = $$('img.mmPointer')
		for(var i = 0; i < mm_array.length; i++){
			mm_array[i].show();
		}

		for(var i = 0; i < measurements.length; i++){
			if(measurements[i].imageid == this.id) {
				
				measurements[i].pinDiv.stopObserving('click');
				
				measurements[i].setActive();							
			}
		}
	},
	addSelfToImages: function(full) {
		
		// We need this for the observer and the slider
		parentAddedImageObject = this;
		this.imageElement.stopObserving();
		//because of slow servers we need to empty the src
		this.imageElement = new Element('img');
		this.imageElement.writeAttribute('id', 'addedImage_' + this.id);
		this.imageElement.addClassName('big_image_sibling');
		this.imageElement.setOpacity(this.opacity);
		
		this.imageElement.writeAttribute('src', this.getAppropriateSizeURL());
		makeImageObservers(this, full);
		
		$('big_images').insert( { bottom : this.imageElement	});
		
		// Create a slider
		$('sliderDiv_' + this.id).update();
		addSlider($('sliderDiv_' + this.id),this);
	}
});

// Do this when the image is fully loaded
function makeImageObservers(image, full){
	image.imageElement.observe('load', function() {
	
		// Resize the measurements and load them in the tabs
		if (full){
			getImageMeasurements(image.id);
			getImageBitmaps(image.id);
		}
		resizeMeasurements(image.id);
		
		//resizeBigImages();
	});
		
	image.imageElement.observe('click', function() {
		LoadMMDD('', image.id);
	});	
	
}

function deleteImage(id) {

	$('mainDiv_' + id).remove();

	removeImage(id);

	//delete active image for this image
	checkActiveLayer();
}

function addImage(originalImage) {
	var container = makePictureContainer(originalImage.evalJSON()[0]);
	makePicturesSortable();
}

function showImage(id, name, className) {
	checkAuthenticationAndExecute( function() {
		var newAddedImage = new AddedImage(id, name, className);
		//console.log(newAddedImage);
		$('big_images').insert(this.imageElement);
		addedImages.splice(0, 0, newAddedImage);
		newAddedImage.addSelfToImages(true);
		
		checkActiveLayer();
	});
}

function hideImage(id) {
	checkAuthenticationAndExecute( function() {

		if (addedImages[0].id == id)
			addedImages[0].makeNonActive();

		
		// Remove checkboxes
		removeCheckboxes(id);		
		
		//remove bitmaps
		removeBitmaps(id);

		// Remove measurements
		removeMeasurements(id);

		// Remove changes
		removeChanges(id);
		// Remove image
		removeImage(id);
		// Check for new active layer
		checkActiveLayer();
	});
}

function reloadImages(full) {
	checkAuthenticationAndExecute( function() {

		// .update() clears the contents of the elements
		$('big_images').update();

		for ( var i = 0; i < addedImages.length; i++) {
			if ( i >= 1)
				addedImages[i].makeNonActive();
			addedImages[i].addSelfToImages(full);
		}

		if (addedImages.length > 0) {
			addedImages[0].makeActive();
		}
		makePicturesSortable();
		reloadBitmaps();
	});
}

function updateImageList() {
	checkAuthenticationAndExecute( function() {
		id_array = Sortable.sequence("pictures");
		new_list = new Array();
		for ( var i = 0; i < id_array.length; i++) {
			for ( var j = 0; j < addedImages.length; j++) {
				if (id_array[i] == addedImages[j].id) {
					new_list.push(addedImages[j]);
					break;
				}
			}
		}
		addedImages = new_list;
		
		checkActiveLayer();

	});
}

function removeCheckboxes(imageID){
	for(var i = 0; i < checkboxes.length; i++){
		if ((checkboxes[i].type == 's') || (checkboxes[i].type == 'b')){
			if(checkboxes[i].item.imageid == imageID){
				checkboxes.splice(i,1);
				i = i - 1;
			}
		}
	}
}

function removeChanges(imageID){
	for ( var i = 0; i < changes.length; i++) {
		if (changes[i].imageid == imageID) {
			changes[i].changeDiv.remove();
			changes.splice(i, 1);
			i = i - 1;
		}
	}
}

function removeImage(imageID){
	for ( var i = 0; i < addedImages.length; i++){
		if (addedImages[i].id == imageID){
			addedImages.splice(i, 1);
			break;
		}
	}
	Element.remove($('addedImage_'+imageID))
	
	$('sliderDiv_' + imageID).update();
	if ($('rightDiv_' + imageID).childElements()[0].innerHTML != "PDM-Overlay"){
		$('bottomDiv_' + imageID).update();
	}
}

function checkActiveLayer(){
	// $('zoomImage').hide();
	console.log('active layer check');
	console.log(''+addedImages.length);

	if (addedImages.length > 0) {
		addedImages.each(function(item){
			item.makeNonActive();
		});
		console.log('active layer check2');

		addedImages[0].makeActive();
		console.log('active layer check3');
		
		// Set sequence so that active layer is always on top
		id_array = Sortable.sequence("pictures");
		var temp = "";
		for ( var i = 0; i < id_array.length; i++) {
			if (id_array[i] == addedImages[0].id) {
				temp = id_array[i];
				id_array.splice(i, 1);
				break;
			}
		}
		
		id_array.splice(0, 0, temp);
		Sortable.setSequence("pictures", id_array);
	}
	else{
		$('zoomImage').hide();
	}
	
}

function addSlider(div, object){
	div.update();
	div.insert( { top : object.opacitySliderContainer });
	new Control.Slider(
		object.opacitySliderHandle,
		object.opacitySliderContainer, 
		{ minimum : 0,
			maximum : 1,
			sliderValue : object.opacity,
			onSlide : function(value) {
				object.setOpacityForImage(value);
			}}
	);
}

function makePicturesSortable(){
	Sortable.create("pictures", {
		tag : 'div',
		only : 'projectPictureDiv',
		onUpdate : updateImageList
	});
}
