// Inspired by http://www.csskarma.com/lab/slidinglabels/
// Prototype port by http://tfluehr.com and http://robsterner.com

(function(){
  // TODO: check for Prototype/scripty2
  // TODO: support overriding of default options
  
  // TODO: tests
  SlidingLabels = Class.create({
    initialize: function(elementId, options) {
      form = $(elementId);
      
      // default options list.
      this.options = Object.extend({
          labelInColor: '#999',
          labelOutColor: '#000',
          restingPosition: 5,
          crossPosition: 6,
          effectDuration: 0.2,
          labelAdjustment: 10,
          orientation: 'horizontal'
      }, options);
      
      if (this.options.orientation == 'vertical'){
          
      }
     form.select('.slider label').each(function(label){
          // style the label with JS for progressive enhancement
          if (this.options.orientation == 'vertical'){
              label.setStyle({
                  'color': this.options.labelInColor,
                  'position': 'absolute',
                  'left': this.options.crossPosition + 'px',
                  'top': this.options.restingPosition + 'px',
                  'display': 'inline',
                  'zIndex': '99'
              });
          }
          else{
              label.setStyle({
                  'color': this.options.labelInColor,
                  'position': 'absolute',
                  'top': this.options.crossPosition + 'px',
                  'left': this.options.restingPosition + 'px',
                  'display': 'inline',
                  'zIndex': '99'
              });
          }
          
          // grab the input value
          var input = label.next('input'), inputval = input.getValue();

          // grab the label width, then add 5 pixels to it
          var labelwidth = label.getWidth(), labelmove = labelwidth + this.options.labelAdjustment;

          //onload, check if a field is filled out, if so, move the label out of the way
          if (!inputval.blank()) {
            label.morph('left:' + (this.options.restingPosition - labelmove) + 'px; color:' + this.options.labelOutColor + ';');
          }
          
          // if the input is empty on focus move the label to the left
          // if it's empty on blur, move it back
          input.observe('focus', function(ev){
              var input = ev.element();
              var label = input.previous('label');
              var value = input.getValue();
                
              if (this.options.orientation == 'vertical') {
                  var width = label.getWidth();
                  var adjust = width + this.options.labelAdjustment;
                  if (value === '') {
                      label.morph('left:' + (this.options.restingPosition - adjust) + 'px;color:' + this.options.labelOutColor + ';');
                  }
                  else {
                      label.setStyle({
                          'left': (-adjust) + 'px',
                          'color': this.options.labelOutColor
                      });
                  }
              }
              else {
                  var width = label.getWidth();
                  var adjust = width + this.options.labelAdjustment;
                  if (value === '') {
                      label.morph('left:' + (this.options.restingPosition - adjust) + 'px;color:' + this.options.labelOutColor + ';');
                  }
                  else {
                      label.setStyle({
                          'left': (-adjust) + 'px',
                          'color': this.options.labelOutColor
                      });
                  }
              }
          }.bindAsEventListener(this)).observe('blur', function(ev){
            var input = ev.element();
            var label = input.previous('label');
            var value = input.getValue();
            
            if (value.blank()) {
              label.morph('left:' + (this.options.restingPosition) + 'px; color:' + this.options.labelInColor + ';');
            }
          }.bindAsEventListener(this));
      }.bind(this));
    }
  });
})();