// This file is a work in progress

(function(){

  function Carousel(components) {
    console.log("components:",components);
    this.container = components["view_container"];
    this.items = components["scroll_container"];
    // Optionally:
    this.button = components["button"];
    this.count = components["count"]; 
    this.initialize();
  }

  // Private/Helper methods

  function stifle(e)
  {
    e.preventDefault();
    e.stopPropagation();
  }

  function translate(obj, x) {
    obj.style.webkitTransform = "translate3d(" + x + "px, 0px, 0px)";
  }

  //// Public Methods ////

  Carousel.prototype = {
    initialize: function() {
      // TODO:
      // add an internal event handler to handle all events on the container:
      // x$(this.container).on("event",this.handleEvent);

      this.touch = false;
      if(xui.touch) {
	this.touch = true;
        x$(this.items).on("touchstart",(function(obj){return function(e){obj.start_swipe(e)};})(this));
        x$(this.items).on("touchmove",(function(obj){return function(e){obj.continue_swipe(e)};})(this));
        x$(this.items).on("touchend",(function(obj){return function(e){obj.finish_swipe(e)};})(this));
      } else {
        x$(this.items).on("mousedown",(function(obj){return function(e){obj.start_swipe(e)};})(this));
        x$(this.items).on("mousemove",(function(obj){return function(e){obj.continue_swipe(e)};})(this));
        x$(this.items).on("mouseup",(function(obj){return function(e){obj.finish_swipe(e)};})(this));
      }
      x$(this.container).attr("data-ur-touch", this.touch ? "enabled" : "disabled");      

      x$(this.button["prev"]).on("click", (function(obj){return function(){obj.move_to(1)};})(this));
      x$(this.button["next"]).on("click", (function(obj){return function(){obj.move_to(-1)};})(this));

      this.item_index = 0;
      this.adjust_spacing();
      this.item_index = -1; // Hacky
      this.update_index();


      window.setInterval(function(obj){return function(){obj.resize();}}(this),1000);
    },

    get_transform: function(obj) {
      var transform = window.getComputedStyle(obj).webkitTransform;
      if (transform != "none") {
        transform = new WebKitCSSMatrix(transform);
        return transform.m41;
      } else {
        console.log("no webkit transform");
        return 0;
      }
    },

    resize: function(){
      // When I have multi-item carousels, I'll just need to need to make a calculate_snap_width method
      if (this.snap_width != this.container.offsetWidth) {
        this.adjust_spacing();
      }
    },
      
    adjust_spacing: function() {
      // Will need to be called if the container's size changes --> orientation change

      var visible_width = this.container.offsetWidth;
      var cumulative_offset = 0;
      var items = x$(this.items).find("[data-ur-carousel-component='item']");
      this.item_count = items.length;

      // For the multi-pane case --> I'll set the snap_width to the width of a single element
      this.snap_width = visible_width;

      cumulative_offset -= this.snap_width*this.item_index; // initial offset
      translate(this.items, cumulative_offset);

      x$().iterate(
        items,
        function(item, i) {
          var offset = cumulative_offset;
          if ( i != 0 ) {
            offset += visible_width - items[i-1].offsetWidth;
          }
          translate(item, offset);
          cumulative_offset = offset;
        }
      );
    },

    get_event_coordinates: function(e) {
      if(this.touch) {
        if(e.touches.length == 1)
        {
          return {x: e.touches[0].clientX, y: e.touches[0].clientY};
        }
      } else {
        return {x: e.clientX, y: e.clientY};
      }
      return null;
    },
    update_buttons: function() {
      if(this.item_index == 0) {
        console.log("prev button", this.button["prev"]);
        if (this.button["prev"] !== undefined) {
          x$(this.button["prev"]).attr("data-ur-state","disabled")
        }
        if (this.button["next"] !== undefined) {
          x$(this.button["next"]).attr("data-ur-state","enabled")
        }
      } else if (this.item_index == this.item_count - 1) {
        if (this.button["next"] !== undefined) {
          x$(this.button["next"]).attr("data-ur-state","disabled")
        }
        if (this.button["prev"] !== undefined) {
          x$(this.button["prev"]).attr("data-ur-state","enabled")
        }
      } else {
        if (this.button["next"] !== undefined) {
          x$(this.button["next"]).attr("data-ur-state","enabled")
        }
        if (this.button["prev"] !== undefined) {
          x$(this.button["prev"]).attr("data-ur-state","enabled")
        }
      }
    },

    update_index: function(displacement) {
      this.item_index -= this.sign(displacement);
      if (this.item_index < 0) {
        this.item_index = 0;
      } else if(this.item_index >= this.item_count) {
        this.item_index = this.item_count - 1;
      }
      
      if(this.count !== undefined) {
        this.count.innerHTML = this.item_index + 1 + " of " + this.item_count;
      }

      this.update_buttons();
    },

    start_swipe: function(e)
    {
      if(this.increment_flag)
        return false;

      console.log("started touch");

      this.touch_in_progress = true; // For non-touch environments

      var coords = this.get_event_coordinates(e);
      if(coords !== null)
      {
        this.start_pos = coords;
        var x_transform = this.get_transform(this.items);
        this.starting_offset = x_transform;
      }
      this.click = true;
    },
    
    continue_swipe: function(e)
    {
      console.log("move touch");
      stifle(e);

      if(!this.touch_in_progress) // For non-touch environments
        return

      var coords = this.get_event_coordinates(e);
      if(coords !== null)
      {
        this.end_pos = coords;
        var dist = this.swipe_dist() + this.starting_offset;
        translate(this.items, dist);
      }
      this.click = false;    
    },
    
    finish_swipe: function(e)
    {
      console.log("finished touch");
      if(!this.click)
        stifle(e);

      this.touch_in_progress = false; // For non-touch environments
      
      if(!this.touch || e.touches.length == 0)
      {    
        var swipe_distance = this.swipe_dist();
        var sign = this.sign(swipe_distance);
        var displacement = this.zero_ceil(swipe_distance/this.snap_width)*this.snap_width;
        this.snap_to(displacement);
      }
    },

    snap_to: function(displacement) {
      this.update_index(displacement);
      this.destination_offset = displacement + this.starting_offset;        
      
      if ( this.destination_offset < -1*(this.item_count - 1)*this.snap_width || this.destination_offset > 0 ) {
        this.destination_offset = this.starting_offset;
      }
      
      this.momentum();  
    },

    // I'll need a move_to_index function for external callbacks
    move_to: function(direction) {
      this.starting_offset = this.get_transform(this.items);
      this.snap_to(this.zero_ceil(direction/this.snap_width)*this.snap_width);
    },

    sign: function(v) 
    { 
      return (v >= 0) ? 1 : -1;
    },

    zero_ceil: function(num) {
      return (num <= 0) ? Math.floor(num) : Math.ceil(num);
    },

    zero_floor: function(num)
    {
      return (num >= 0) ? Math.floor(num) : Math.ceil(num);
    },

    momentum: function()
    {
      if (this.touch_in_progress)
      {
        return;
      }
      
      this.increment_flag = false;	
      var x_transform = this.get_transform(this.items);
      var distance = this.destination_offset - x_transform;
      var increment = distance - this.zero_floor(distance / 1.1);

      translate(this.items, increment + x_transform);

      if(increment != 0)
      {
	this.increment_flag = true;
      }

      if(this.increment_flag)
      {
        setTimeout(function(obj){return function(){obj.momentum()}}(this),16);		    
      }
    },    

    swipe_dist: function()
    {
      if (this.end_pos === undefined)
        return 0;
      var sw_dist = this.end_pos['x'] - this.start_pos['x'];
      return sw_dist;
    }
  }

  // Private constructors
  var ComponentConstructors = {
    "button": function(group, component, type) {
      if (group["button"] === undefined) {
        group["button"] = {};
      }
      
      var type = x$(component).attr("data-ur-carousel-button-type")[0];
      if(type === undefined) {
        // Declaration error
        console.log("Uranium declaration error: Malformed carousel button type on:" + component.outerHTML);
      }

      group["button"][type] = component;

      // Maybe in the future I'll make it so any of the items can be the starting item
      if (type == "prev") {
        x$(component).attr("data-ur-state","disabled");
      } else {
        x$(component).attr("data-ur-state","enabled");
      }

    }
  }

  function CarouselLoader(){}
  
  CarouselLoader.prototype.initialize = function() {
    var carousels = x$().find_elements('carousel', ComponentConstructors);
    this.carousels = {};
    for (name in carousels) {
      var carousel = carousels[name];
      this.carousels[name] = new Carousel(carousel);
    }
  }

  CL = new CarouselLoader();

  window.addEventListener('load', function(){ CL.initialize(); }, false);

})();