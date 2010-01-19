(function(){
  
  document.observe('dom:loaded', function(){
    $$('form#info .slider label').each(function(label){
      
      var labelColor = '#999';
    	var restingPosition = '5px';

    	// style the label with JS for progressive enhancement
    	label.setStyle({
    		'color' : labelColor,
  		 	'position' : 'absolute',
  	 		'top' : '6px',
  			'left' : restingPosition,
  			'display' : 'inline',
      	'z-index' : '99'
    	});

    	// grab the input value (assumes it's following it in the DOM — grab from siblings instead?)
    	var inputval = $F(label.next('input'));

    	// grab the label width, then add 5 pixels to it
    	var labelwidth = label.getWidth();
    	var labelmove = labelwidth + 5;

    	//onload, check if a field is filled out, if so, move the label out of the way
    	if(inputval !== ''){
    		$(this).morph({ 'left':'-'+labelmove }, {duration:0.3});
    	}    	

    	// if the input is empty on focus move the label to the left
    	// if it's empty on blur, move it back
    	
    	// robnote: assumes input is the only input child of it and label's parent in the DOM
    	var input = label.up().down('input');
    	
    	if(input){
    	  input.observe('focus', function(input){
      		var label = input.previous('label'), width = label.getWidth(), adjust = width + 5, value = $F(input);

      		if(value.blank()){
      			label.morph({ 'left':'-' + adjust }, {duration:0.3});
      		} else {
      			label.setStyle({ 'left':'-' + adjust });
      		}
      	})

      	input.observe('blur', function(input){
      		var label = input.prev('label'), value = $F(input);

      		if(value.blank()){
      			label.morph({ 'left': restingPosition }, {duration:0.3});
      		}
      	});
    	}
    });
  });
  

})();

	