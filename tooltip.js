(function($) {

    $.fn.tzTooltip = function( options ) {

        // Establish our default settings
        var settings = $.extend({
            position     : 'top'
        }, options);

        return this.each( function() {
            
            $('#tzTooltip_holder').hide();
            
            $(this).hover(function() {
                
                var tip_text = $(this).attr('title');
                if(tip_text == ''){
                    tip_text = $(this).data('title');
                }else{
                    $(this).data('title' , tip_text);
                    $(this).attr('title', '');
                }
                
                var data = $(this).data('tooltip');
                if(typeof data !== "undefined"){
                    data = data.replace("{","");
                    data = data.replace("}","");
                    data = data.replace(/'/g,"");
                    data = data.split(', ');

                    var s_position = data[0].split(': ');                    
                    var s_offset = data[1].split(': ');
                    s_offset[1] = s_offset[1].split(',');   
                    
                    
                    var top_offset = s_offset[1][0];
                    var left_offset = s_offset[1][1];
   
                }else{
                var left_offset = 0;
                var top_offset = 0;
                }
                
                console.log(data);
                /*
                console.log(s_position[0]);
                console.log(s_offset[0]);
                console.log(s_position[1]);
                console.log(s_offset[1]);
                */

                var tzTooltip = $('#tzTooltip_holder');
                tzTooltip.find('.tzTooltip_text').text(tip_text);
                
                tzTooltip.css({ 'display': 'block'});

                var tzTooltipWidth = tzTooltip.outerWidth();
                var tzTooltipHeight = tzTooltip.outerHeight();
                
                tzTooltip.css({ 'display': 'none'});

                var position = $(this).position();

                $(this).text( settings.text );

                var offsetTop = position.top;
                var offsetLeft = position.left;
                
                
                tzTooltip.addClass('tzTooltip_arrow');

                if ( settings.position == 'top' ) {
                    //if is top heighttion tooltip div above the position shown by the height of the new tooltip div
                    offsetTop = parseInt(offsetTop)-parseInt($(this).outerHeight());
                    offsetLeft = parseInt(offsetLeft)+(parseInt(tzTooltipWidth)/2);
                    
                    var top = parseInt(tzTooltipHeight)-11;
                    var left = (parseInt(tzTooltipWidth)/2);
                    $('head').append('<style class="destroyme">.tzTooltip_arrow:before{left:'+left+'px; top:'+top+'px;}</style>');

                }
                if ( settings.position == 'bottom' ) {
                    //if is top position tooltip div below the position shown by the height of the new tooltip div
                    offsetTop = parseInt(offsetTop)+parseInt($(this).outerHeight())+30;
                    var halfTip = parseFloat(parseInt($(this).outerHeight()));
                    offsetLeft = parseInt(offsetLeft)+(parseInt(tzTooltipWidth)/2);
                    
                    var top = parseInt(tzTooltipHeight)-(parseInt(tzTooltipHeight)+8);
                    var left = (parseInt(tzTooltipWidth)/2);
                    $('head').append('<style class="destroyme">.tzTooltip_arrow:before{left:'+left+'px; top:'+top+'px;}</style>');

                }
                if ( settings.position == 'left' ) {
                    //if is top position tooltip div left of the position shown by the height of the new tooltip div
                    offsetLeft = parseInt(offsetLeft)-parseInt(tzTooltipWidth);
                    offsetTop = parseInt(offsetTop)+(parseInt($(this).outerHeight())/2);
                    
                    var top = parseInt(tzTooltipHeight);
                    $('#tzTooltip_holder').css('padding-right', '17px');
                    var left = parseInt(tzTooltipWidth)-7;//+16+7;
                    $('head').append('<style class="destroyme">.tzTooltip_arrow:before{left:'+left+'px; top:12px;}</style>');


                }
                if ( settings.position == 'right' ) {
                    //if is top position tooltip div right of the position shown by the height of the new tooltip div
                    offsetLeft = parseInt(offsetLeft)+parseInt($(this).width());
                    offsetTop = parseInt(offsetTop)+(parseInt($(this).height())/2);
                    
                    var top = parseInt(tzTooltipHeight);
                    var left = parseInt(tzTooltipWidth)+8;
                    $('head').append('<style class="destroyme">.tzTooltip_arrow:before{left:-7px; top:12px;}</style>');

                }
                
                //Add extra adjust from settings data offset
                offsetLeft = parseInt(parseInt(offsetLeft)+parseInt(left_offset));
                offsetTop = parseInt(parseInt(offsetTop)+parseInt(top_offset));
                
                tzTooltip.css({ 'top': offsetTop+'px', 'left': offsetLeft+'px'});
                tzTooltip.fadeIn();
            });
            
            $(this).mouseout(function() {
              $('#tzTooltip_holder').hide();
              $('#tzTooltip_holder').find('tzTooltip_text').text('');
              $('#tzTooltip_holder').css({ 'top': '-100px', 'left': '-100px', 'padding-right': '15px', 'display': 'none'});
              $('#tzTooltip_holder').attr('class', '');
                
              $(".destroyme").each(function() {
                $(this).remove();
              });
             
            });

        });

    }

}(jQuery));