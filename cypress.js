/**
*	Cypress jQuery Plugin
*
*	@author	Christopher McLean
*	@version 1.0 
*/

(function($)
{	
	var methods = {
		init : function(params)
		{
			/*
				Add custom settings and arguments to the settings variable.
			*/
			settings = $.extend({
				'position' : 0
			}, params);
		},
		build : function()
		{
			/*
				Build the image container window in the div tag with an id of "gallery"
			*/
			$("<div class='container' id='image-container'></div>").appendTo("div#gallery").hide();
			$("<img src='" + settings.images[settings.position].normal + "' alt='' id='gallery-image'/>").appendTo("div#image-container");
			$("div#image-container").append("<h2>" + settings.images[settings.position].title + "</h2>");
			$("div#image-container").append("<ul id='nav-list'></ul>");
			$("ul#nav-list").append("<li><a href='prev' id='prev'>prev</a></li>");
			$("ul#nav-list").append("<li><a href='next' id='next'>next</a></li>");
			$("div#image-container").append("<a href='back' id='back'>back</a>");
			
			

			/*
				Build the gallery container window int he div tag with an id of "gallery"
			*/
			$("div#gallery").append("<div class='container' id='gallery-container'></div>");
			$("div#gallery-container").append("<ul></ul>");
			for(x=0; x<settings.images.length; x++)
			{
				$("div#gallery-container ul").append("<li><a href='#' data-role='" + x + "'><img src='" + settings.images[x].thumb + "' alt='" + settings.images[x].desc + "'/></a></li>");
			}
			$("div#gallery-container").append("<div class='clear'></div>");

			
			
			/* 
				Bind a click event to all anchor tags which resets the current position 
				in the array of objects, and transitions to the image container window.
			*/
			$("div#gallery-container ul li a").bind("click", function(event)
			{
				event.preventDefault();
				settings.position = $(this).attr("data-role");
				$("img#gallery-image").attr("src", settings.images[$(this).attr("data-role")].normal);
				$("div#gallery-container").fadeOut(function()
				{
					$("div#image-container").fadeIn();
				});
			});

			

			/* 
				Bind a click event to the back link which transitions to the image container window.
			*/
			$("#back").bind("click", function(event)
			{
				event.preventDefault();
				$("div#image-container").fadeOut(function()
				{
					$("div#gallery-container").fadeIn();
				});
			});



			/* 
				Bind a click event to the prev link which reduces the placement in the 
				image array and switches to the appropriate image.
			*/
			$("#prev").bind("click", function(event)
			{
				event.preventDefault();
				settings.position--;
				if(settings.position < 0)
				{
					settings.position = settings.images.length - 1;
				}
				$("img#gallery-image").attr("src", settings.images[settings.position].normal);
				$("#image-container h2").html(settings.images[settings.position].title);
			});

			

			/* 
				Bind a click event to the next link which increments the placement in the 
				image array and switches to the appropriate image.
			*/
			$("#next").bind("click", function(event)
			{
				event.preventDefault();
				settings.position++;
				if(settings.position == settings.images.length)
				{
					settings.position = 0;
				}
				$("img#gallery-image").attr("src", settings.images[settings.position].normal);
				$("#image-container h2").html(settings.images[settings.position].title);
			});

			

			/* 
				Bind a click event to the keyboard which listens for 
				keystrokes of the left and right arrow keys to either increase
				position in the image array or decrease it. You then switch to the 
				appropriate image.
			*/
			$("html").keydown(function(event)
			{
				if(event.keyCode == 37)
				{
					settings.position--;
					if(settings.position < 0)
					{
						settings.position = settings.images.length - 1;
					}
					$("img#gallery-image").attr("src", settings.images[settings.position].normal);
					$("#image-container h2").html(settings.images[settings.position].title);
				}
				else if(event.keyCode == 39)
				{
					settings.position++;
					if(settings.position == settings.images.length)
					{
						settings.position = 0;
					}
					$("img#gallery-image").attr("src", settings.images[settings.position].normal);
					$("#image-container h2").html(settings.images[settings.position].title);
				}			
			});
		},
	};

	

	/*
		Controls method calls of the jQuery plugin. Method names are passed in as
		arguments and called from an the object named methods.

		If the parameter is not a method, but is an object, run the init method 
		with the object as the argument.
	*/
	$.fn.cypress = function(method)
	{
    	if(methods[method])
    	{
      		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    	}
    	else if(typeof method === 'object' || ! method)
    	{
      		return methods.init.apply(this, arguments);
    	} 
    	else 
    	{
     		$.error('Method' +  method + 'does not exist on jQuery.cypress');
    	}    
	};
	
})(jQuery); 
