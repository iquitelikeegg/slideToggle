function slideToggle(elementSelector, options, callback) {
    this.$element;
    this.$input;
    this.$internal;
    this.$on;
    this.$off;
    this.$switch;
    this.cbOptions = options.cbOptions;
    this.callback  = (callback) ? callback : function() {};
    
    this.mousePos = {};
    
    this.defaultStyle = {
        'margin': 0,
        'border': 0,
        'padding': 0,
        'height': '20px',
        'width': '50px',
        'font-size': '1em',
        'color': 'white'
    };
    
    this.currentState = options.state;
    
    this.toggleOn = function() {
        this.$switch.animate({
            'left' : '30px'
        }, 100, 'linear');
        
        this.$internal.animate({
            'margin-left' : '0px'
        }, 100, 'linear');
        
        this.currentState = 'ON';
        this.$input.attr('checked', 'checked');
    };
    
    this.toggleOff = function() {
        this.$switch.animate({
            'left' : '0px'
        }, 100, 'linear');
        
        this.$internal.animate({
            'margin-left' : '-30px'
        }, 100, 'linear');
        
        this.currentState = 'OFF';
        this.$input.attr('checked', null);
    };
    
    this.getPos = function(event) {
        return event.pageX - self.$element.offset().left;
    };
    
    this.getSwitchPos = function(event) {
        var left = this.getPos(event) - 9;
        
        if (left > 30) left = 30;
        if (left < 0)  left = 0;
        
        return left;
    };
    
    this.setDefaultStyles = function($wrapper) {
        $wrapper.css(this.defaultStyle);
    };
    
    this.substituteElement = function($newElement) {
        this.$element.replaceWith($newElement);
        this.$element = $newElement;
    };
    
    this.buildHtml = function() {
        $on = jQuery('<span />', {
            'class' : 'on',
            'unselectable' : 'on'
        })  
            .html('ON');
        
        $off = jQuery('<span />', {
            'class' : 'off',
            'unselectable' : 'on'
        })
            .html('OFF');
        
        $internal = jQuery('<span />', {
            'class' : 'internal'
        }).append($on, $off);
        
        $switch = jQuery('<span />', {
            'class' : 'switch'
        });
        
        $element = jQuery('<div />', {
            'class' : 'slideToggle element'
        }).append($internal, $switch);
        
        $slider = jQuery('<div />', {
            'class' : 'slideToggle slider-whole'
        }).append($element);
        
        return $slider;
    };
    
    this.init = function() {
        if (!elementSelector) {
            console.log('please pass the jQuery selector for the desired input element to be replaced');
        }
        
        this.$element = jQuery(elementSelector);
        
        var $slider = this.buildHtml();
        
        var $input = jQuery('<input />', {
            'type'    : 'checkbox',
            'name'    : this.$element.attr('name'),
            'id'      : this.$element.attr('id'),
            'class'   : this.$element.attr('class'),
            'checked' : this.$element.attr('checked'),
            'css' : {
                'display' : 'none'
            }
        });
        
        if (!options.id) {
            console.log('the options obj must have the "id" property');
        }
        
        var $sliderWrap = jQuery('<div />', {
            'class' : 'slideToggle wrap',
            'id'    : 'slideToggle_' + options.id
        }).append($slider, $input);
        
        this.setDefaultStyles($sliderWrap);
        
        //add user-defined styles
        if (options.css) {
            $sliderWrap.css(options.css);
        }
        
        this.substituteElement($sliderWrap);
        
        this.$input    = $input;
        this.$internal = jQuery(this.$element.find('.internal'));
        this.$on       = jQuery(this.$element.find('.on'));
        this.$off      = jQuery(this.$element.find('.off'));
        this.$switch   = jQuery(this.$element.find('.switch'));
        
        this.currentState = (this.$input.attr('checked') === 'checked') ? 'ON' : 'OFF';
        
        var self = this;
        
        jQuery('body').on('mouseup', function() {
            self.$element.off('mousemove');
            self.$element.off('mouseleave');
        });
    };
    
    var self = this;
    
    this.init();
    
    setTimeout(function() {
        if (self.currentState !== 'ON') {
            self.toggleOff();
        };
    }, 500);
    
    this.$element.bind(':toggle', function() {
        if (self.currentState === 'ON') {
            self.toggleOff();
        } else {
            self.toggleOn();
        }
        
        self.callback(self.cbOptions);
    });
    
    //eventHandles
    this.mouseDownTime;
    
    this.$element.on('mouseup', function() {
        
        clearTimeout(self.mouseDownTime);
        self.$element.off('mousemove');
        self.$element.off('mouseleave');
        
        setTimeout(function() {
            self.$element.trigger(':toggle');
        }, 200);
    });
    
    this.$element.on('mousedown', function(event) {
        self.$element.on('mousemove', function(event) {
            event.preventDefault;

            self.$switch.animate({
                'left' : self.getSwitchPos(event) + 'px'
            }, 10, 'linear');
            
            self.$internal.animate({
                'margin-left' : (self.getSwitchPos(event) - 30) + 'px'
            }, 10, 'linear');
            
        });

        self.$element.on('mouseleave', function(event) {
            self.$element.off('mousemove');
            self.$element.trigger(':toggle');
        });
    });
    
    this.$element.on('mouseleave', function() {
        self.$element.off('mousemove');
    });
}