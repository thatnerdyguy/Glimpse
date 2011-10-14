﻿tollbarController = function () {
    var //Support
        wireListeners = function() {
            pubsub.subscribe('action.open', open);
            pubsub.subscribe('action.minimize', function() { close(false); });
            pubsub.subscribe('action.close', function() { close(true); }); 
        },
            
        //Main 
        open = function () {
            settings.open = true;
            pubsub.publish('state.persist');

            elements.opener.hide(); 
            $.fn.add.call(elements.holder, elements.spacer).show().animate({ height : settings.height }, 'fast');   
        },
        close = function (remove) {
            settings.open = false;
            pubsub.publish('state.persist');

            var panelElements = $.fn.add.call(elements.holder, elements.spacer).animate({ height : '0' }, 'fast', function() {
                    panelElements.hide();

                    if (remove) {
                        elements.scope.remove();
                        pubsub.publish('state.persist');
                    }
                    else
                        elements.opener.show(); 
                });
        },  
        init = function () {
            wireListeners();
        };
    
    init(); 
} ()