// Inspired by http://www.csskarma.com/lab/slidinglabels/
// Prototype port by http://tfluehr.com and http://robsterner.com

(function(){
  // TODO: check for Prototype/scripty2
  // TODO: support overriding of default options
  
  // TODO: tests
  SlidingLabels = Class.create({
    initialize: function(elementId, options){
      form = $(elementId);
      // default options list.
      var defaultOptions = {
        labelInColor: '#999',
        labelOutColor: '#000',
        morphPosition: 5,
        crossPosition: 6,
        morphOffset: 5,
        effectDuration: 0.2,
        labelAdjustment: 10,
        direction: 'left'
      };
      this.options = Object.extend(defaultOptions, options);
      
      
      this.internalOptions = {
        morphIdent: 'label',
        morphProp: 'left',
        crossProp: 'top'
      };
      switch (this.options.direction){
        case 'right':
          break;
        case 'bottom':
          this.options.morphPosition = 6;
          this.options.crossPosition = 5;
          this.internalOptions.morphIdent = 'input';
          this.internalOptions.morphProp = 'margin-bottom';
          this.internalOptions.crossProp = 'left';
          break;
        case 'top':
          this.options.morphPosition = 6;
          this.options.crossPosition = 5;
          this.internalOptions.morphIdent = 'input';
          this.internalOptions.morphProp = 'margin-top';
          this.internalOptions.crossProp = 'left';
          break;          
        //default:
      }
      
      form.select('.slider label').each((function(label){
        // style the label with JS for progressive enhancement
        var elements = {};
        elements.label = label;
        var propVal = parseInt(label.getStyle('this.internalOptions.morphProp'), 10);
        propVal = isNaN(propVal) ? 0 : propVal;
        label.store('origVal', propVal);
        var styles = '';
        styles += 'color:' +this.options.labelInColor+';';
        styles += 'position:absolute;';
        styles += 'display:inline;';
        styles += 'z-index:99;';
        styles += this.internalOptions.crossProp + ':' +this.options.crossPosition + 'px;';
        styles += this.internalOptions.morphProp + ':' +this.options.morphPosition + 'px;';
        elements.label.setStyle(styles);
        
        // grab the input value
        var input = label.next('input'), inputval = input.getValue();
        elements.input = input;
        // grab the label width, then add 5 pixels to it
        var labelwidth = label.getWidth(), labelmove = labelwidth + this.options.labelAdjustment;
        
        //onload, check if a field is filled out, if so, move the label out of the way
        if (!inputval.blank()) {
          //this.options.morphPosition - labelmove
          label.morph('color:' + this.options.labelOutColor + ';',{
            duration: this.options.effectDuration,
            position: 'parallel'
          });
          elements[this.internalOptions.morphIdent].morph(this.internalOptions.morphProp+':' + (this.calculateMove(elements, true)) + 'px;',{
            duration: this.options.effectDuration,
            position: 'parallel'
          });
        }
        
        // if the input is empty on focus move the label to the left
        // if it's empty on blur, move it back
        input.observe('focus', (function(ev){
          var input = ev.element();
          var label = input.previous('label');
          var elements = {};
          elements.label = label;
          elements.input = input;
          var value = input.getValue();
          var styles;
          //var width = label.getWidth();
          //var adjust = width + this.options.labelAdjustment;
          if (value.blank()) {
            //this.options.morphPosition - adjust
            label.morph('color:' + this.options.labelOutColor + ';',{
              duration: this.options.effectDuration,
              position: 'parallel'
            });
            elements[this.internalOptions.morphIdent].morph(this.internalOptions.morphProp+':' + (this.calculateMove(elements, true)) + 'px;',{
              duration: this.options.effectDuration,
              position: 'parallel'
            });
          }
          else {
            styles = {
              'color': this.options.labelOutColor
            };
            style[this.internalOptions.morphProp] = (-adjust) + 'px';
            elements[this.internalOptions.morphIdent].setStyle(styles);
          }
        }).bindAsEventListener(this)).observe('blur', (function(ev){
          var input = ev.element();
          var label = input.previous('label');
          var elements = {};
          elements.label = label;
          elements.input = input;
          var value = input.getValue();
          var styles;
          if (value.blank()) {
            label.morph('color:' + this.options.labelInColor + ';',{
              duration: this.options.effectDuration,
              position: 'parallel'
            });;
            elements[this.internalOptions.morphIdent].morph(this.internalOptions.morphProp+':' + (this.calculateMove(elements)) + 'px;',{
              duration: this.options.effectDuration,
              position: 'parallel'
            });
          }
        }).bindAsEventListener(this));
      }).bind(this));
    },
    calculateMove: function(elements, isFocus){
      var val = 0;
      if (!isFocus){
        //val += this.options.morphPosition;
        switch (this.options.direction) {
          case 'right':
            val += this.options.morphOffset;
            break;
          case 'bottom':
            break;
          case 'top':
            //val -= elements.label.getHeight();
            //val -= this.options.morphPosition;
            //val += elements.label.retrieve('origVal');
            break;
          default:
            val += this.options.morphOffset;
        }
      }
      else{
        switch (this.options.direction) {
          case 'right':
            val += elements.input.getWidth();
            //val += this.options.morphPosition;
            val += this.options.morphOffset;
            break;
          case 'bottom':
            val += elements.input.getHeight();
            break;
          case 'top':
            val += elements.label.getHeight();
            val += this.options.morphPosition;
            val += this.options.morphOffset;
            val -= elements.label.retrieve('origVal');
            break;
          default:
            val -= elements.label.getWidth();
            val -= this.options.morphPosition;
            val -= this.options.morphOffset;
        }
      }
      return val;
    }
  });
})();
