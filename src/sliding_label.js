//ported to prototype from http://www.csskarma.com/lab/slidinglabels/
function formatSliderLabels(form){
    form = $(form);
    var labelColor = '#999';
    var restingPosition = 5;
    var topPosition = 6;
    var duration = 0.2;
    var labelAdjust = 10;
    form.select('.slider label').each(function(el){
        // style the label with JS for progressive enhancement
        el.setStyle({
            'color': labelColor,
            'position': 'absolute',
            'top': topPosition + 'px',
            'left': restingPosition + 'px',
            'display': 'inline',
            'z-index': '99'
        });
        // grab the input value
        var input = el.next('input');
        var inputval = input.getValue();
        
        // grab the label width, then add 5 pixels to it
        var labelwidth = el.getWidth();
        var labelmove = labelwidth + labelAdjust;
        
        //onload, check if a field is filled out, if so, move the label out of the way
        if (inputval !== '') {
            new Effect.Move(el, {
                x: -labelmove,
                duration: duration
            });
        }
        // if the input is empty on focus move the label to the left
        // if it's empty on blur, move it back
        input.observe('focus', function(ev){
            var label = $(this).previous('label');
            var width = label.getWidth();
            var adjust = width + labelAdjust;
            var value = $(this).getValue();
            
            if (value === '') {
                new Effect.Move(label, {
                    x: -adjust,
                    duration: duration
                });
            }
            else {
                label.setStyle({
                    'left': (-adjust) + 'px'
                });
            }
        }).observe('blur', function(ev){
            var label = $(this).previous('label');
            var value = $(this).getValue();
            
            if (value === '') {
                new Effect.Move(label, {
                    x: restingPosition,
                    y: topPosition,
                    mode: 'absolute',
                    duration: duration
                });
            }
        });
    });
}
