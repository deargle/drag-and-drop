/*!
  * drag-and-drop v0.0.1 (https://github.com/deargle/drag-and-drop)
  * Copyright 2011-2019 @deargle (https://github.com/deargle)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
// https://park.glitch.me/ for the html5 drag interface example

// dropzones can have a 'on-drop' data propery function
class dragAndDrop {
    
    constructor(options){
        this.dragged = null;
        this.dropzones = options.dropzones;
        this.draggables = options.draggables;
        
        var that = this;
        
        this.dropzones.each(function(i){
            var $el = $( this );
            $el.on('drop.dragAndDrop', that.onDrop.bind(that));
            $el.on('dragenter.dragAndDrop', that.onDragEnter.bind(that));
            $el.on('dragleave.dragAndDrop', that.onDragLeave.bind(that));
            $el.on('dragover.dragAndDrop', that.onDragOver.bind(that));
        });
        this.draggables.each(function(i){
            var $el = $(this);
            $el.on('dragstart.dragAndDrop', that.onDragStart.bind(that));
            $el.on('dragend.dragAndDrop', that.onDragEnd.bind(that));
        });
        return this
    };
    
    onDrop(event = window.event) {
        event = event.originalEvent
        const target = this.validateTarget(event.target);
        const dragged = this.dragged;
        if (dragged && target) {
            target.style.backgroundColor = '';
            
            event.preventDefault();
            // Get the id of the target and add the moved element to the target's DOM
            dragged.parentNode.removeChild(dragged);
            dragged.style.opacity = '';
            
            target.appendChild(dragged);
            //target.style.backgroundImage = '/static/images/check-circle-cropped.png';
            
            
            var on_drop = $(target).data('on-drop');
            if ( on_drop ) {
                on_drop.bind(target)();
            }
        }
    };
    
    onDragEnter(event = window.event) {
        event = event.originalEvent
        const target = this.validateTarget(event.target);
        const dragged = this.dragged;
        if (dragged && target) {		
            event.preventDefault();
            // Set the dropEffect to move
            event.dataTransfer.dropEffect = 'linkMove'
            $(target).addClass('hover');
        }
    };
    
    onDragLeave(event = window.event) {
        event = event.originalEvent
        const target = this.validateTarget(event.target);
        $(target).removeClass('hover');
    };
    
    onDragOver(event = window.event) {
      event = event.originalEvent
      // Prevent default to allow drop
      event.preventDefault();
    };
    
    validateTarget(target) {
        const dropZone = this.dropzones
        if ( $.inArray(target.parentNode, dropZone) !== -1 ) {
            return target.parentNode
        }
        else if ( $.inArray(target, dropZone) !== -1 ) {
            return target
        }
        else {
            return null;
        }
    };
    
    onDragStart(event = window.event) {
        event = event.originalEvent;
        let target = event.target;
        if (target && target.nodeName == 'IMG') {
            // Store a ref. on the dragged elem
            this.dragged = target;
            event.dropEffect = 'linkMove';

            event.dataTransfer.setData('text/plain', target.nodeName);

            // Make it half transparent
            event.target.style.opacity = .5;
        }
    };

    onDragEnd(event = window.event) {
        event = event.originalEvent
        if (event.target && event.target.nodeName == 'IMG') {
            // Reset the transparency
            event.target.style.opacity = '';
        }
    };   
}

/*
* Add it to Jquery
*/
(function ( $ ) {
    $.extend({
        dragAndDrop: function(options){
            return new dragAndDrop(options);
        }
    });
    
}( jQuery ));