(function($)
{	
	var methods = {
		init : function(params)
		{
			settings = $.extend({
				'position' : 0
			}, params);
		},
		build : function()
		{
			
			$("<div class='container' id='image-container'></div>").appendTo("div#gallery").hide();
			$("<img src='" + settings.images[settings.position].normal + "' alt='' id='gallery-image'/>").appendTo("div#image-container");
			$("div#image-container").append("<h2>" + settings.images[settings.position].title + "</h2>");
			
			$("div#image-container").append("<ul id='nav-list'></ul>");
			$("ul#nav-list").append("<li><a href='prev' id='prev'>prev</a></li>");
			$("ul#nav-list").append("<li><a href='next' id='next'>next</a></li>");
			$("div#image-container").append("<a href='back' id='back'>back</a>");
			
			$("div#gallery").append("<div class='container' id='gallery-container'></div>");
			$("div#gallery-container").append("<ul></ul>");
			for(x=0; x<settings.images.length; x++)
			{
				$("div#gallery-container ul").append("<li><a href='#' data-role='" + x + "'><img src='" + settings.images[x].thumb + "' alt='" + settings.images[x].desc + "'/></a></li>");
			}
			$("div#gallery-container").append("<div class='clear'></div>");

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

			$("#back").bind("click", function(event)
			{
				event.preventDefault();
				$("div#image-container").fadeOut(function()
				{
					$("div#gallery-container").fadeIn();
				});
			});

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
