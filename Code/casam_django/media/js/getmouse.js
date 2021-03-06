function getMouseXY(e) {

	if ($('big_images').firstChild != null) {
		var mX = e.clientX
		var mY = e.clientY

		var viewportOffset = $('big_images').viewportOffset();
		$('MouseX').value = mX - viewportOffset.left;
		$('MouseY').value = mY - viewportOffset.top;

	}

	if ($('zoomImage').getAttribute('src') &&
		  $('zoomImage').getAttribute('src') != '') {
		
		var zoomImg = new Image();
		zoomImg.setAttribute('src', $('zoomImage').getAttribute('src'));

		var originalWidth = zoomImg.width / 1.5;
		var originalHeight = zoomImg.height / 1.5;
		// Select only the images in big_images
		var activeImages = $('big_images').select('.big_image_sibling');
		if (!activeImages)
			return;
		// Select the last one of these images, which is the last added
		var activeImage = activeImages[activeImages.length - 1];
		if (!activeImage)
			return;
		var middleImage = new Image();
		middleImage.setAttribute('src', activeImage.getAttribute('src'));
		var resizedWidth = middleImage.width;
		var resizedHeight = middleImage.height;
		// Update the zoom image with the new coordinates
		var zoomRatio = (originalWidth / resizedWidth) * 1.5;
		var newLeft = Math.round(-1 * $('MouseX').value * zoomRatio + 90);
		var newTop = Math.round(-1 * $('MouseY').value * zoomRatio + 90);
		$('zoomImage').setStyle( {
			marginLeft : newLeft + 'px',
			marginTop : newTop + 'px'
		});

	}

}