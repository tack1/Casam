var Bitmap = Class.create( {
	initialize : function(bm, bmid, imageid) {
		this.bitmap = bm;
		this.id = bmid;
		this.imageid = imageid;
	},
	getAppropriateSizeURL : function() {
		return (base_path + 'imageLoader/byMaxWidthHeight/bitmap/'
				+ ($('big_images').getWidth() - 2) + '/'
				+ ($('big_images').getHeight() - 2) + '/' + this.id+'?time='+new Date().getTime());
	},
	resize : function() {
		this.bitmap.writeAttribute('src', this.getAppropriateSizeURL());
		this.bitmap.observe('load', function() {
			//big_images need to be resized again when the bitmaps are loaded 
			// the javascript continues while this.getAppropriateSizeURL()
			// is still
			// finding the correct size for the bitmap
			resizeBigImages();
		});
	}
});

function addBitmap(bmid, imgid, potid, min_x, max_x, min_y, max_y) {
	
	// Create html-elementes
	var bitmapDiv = new Element('div', {
		'id' : 'bitmapDiv_' + bmid
	});
	
	bitmapDiv.addClassName('projectImageBitmapDiv');

	checkbox = new Element('input', {
		'type' : 'checkbox',
		'name' : bmid,
		'id' : 'showbm' + bmid
	});

	var bitmap = new Element('img', {
		'id' : 'bitmap_' + bmid
	});

	var bm = new Bitmap(bitmap, bmid, imgid)
	bitmaps.push(bm);

	bitmap.writeAttribute('src', '');
	bitmap.writeAttribute('src', bm.getAppropriateSizeURL());
	bitmap.addClassName('big_image_sibling_bitmap');
	$('big_images').insert(bitmap);
	bitmap.hide();

	bitmap.setOpacity(0.5);

	/*
	 * var opacitySliderContainer = new Element('div'); //HARDCODE THIS WIDTH
	 * FOR THE SLIDER TO WORK INITIALLY opacitySliderContainer.setWidth(140);
	 * opacitySliderContainer.writeAttribute('id','bitmapOpacitySliderContainer_'+bmid);
	 * opacitySliderContainer.addClassName('bitmapSlider');
	 * 
	 * var opacitySliderHandle = new Element('div');
	 * opacitySliderHandle.writeAttribute('id','bitmapOpacitySliderHandle_'+bmid);
	 * opacitySliderHandle.addClassName('bitmapHandle');
	 * 
	 * opacitySliderContainer.insert(opacitySliderHandle);
	 */

	var check = new Check('b', bmid, checkbox, bm);

	// when called insert, IE defaults his checkboxes to the default value
	// (which is false).
	// so set the default to true
	check.setDefault();
	check.watch();

	checkboxes.push(check);

	textspan = new Element('span', {
		'id' : 'spanbm_' + bmid
	});
	textspan.update($('potmeas_'+potid).down('div').innerHTML);
	editlink = new Element('a', {'href':'javascript:loadEditScreen(\''+imgid+'\', \''+potid+'\', \''+bmid+'\', \''+min_x+'\', \''+max_x+'\', \''+min_y+'\', \''+max_y+'\')'});
	editimg = new Element('img');
	editimg.writeAttribute('src', base_path + 'media/img/pencil.gif');
	editimg.addClassName('smallPictureButton');
	editlink.insert(editimg);
	textspan.insert(editlink);
	bitmapDiv.insert(checkbox);
	bitmapDiv.insert(textspan);

	return bitmapDiv;
}

function reloadBitmaps() {
	
	for ( var i = 0; i < checkboxes.length; i++) {
		if ((checkboxes[i].type == 'b')) {

			checkboxes[i].item.resize();

			$('big_images').insert(checkboxes[i].item.bitmap);
			checkboxes[i].item.bitmap.hide();
			if (checkboxes[i].checked)
				checkboxes[i].item.bitmap.show();
		}
	}
}

function removeBitmaps(imageID){
	for(var i = 0; i < bitmaps.length; i++){
		if(bitmaps[i].imageid == imageID){
			Element.remove($('bitmap_' + bitmaps[i].id));
			bitmaps.splice(i, 1);
			i = i - 1;
		}
	}
}