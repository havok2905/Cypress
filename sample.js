$(document).ready(function()
{
	// Add a gallery with the following images
	$("html").cypress({"images":[
			{
				"title" 	  : "Zombies Run up a Wall",
				"desc" 		  : "Screenshot from the film where zombies pile up over a wall",
				"thumb" 	  : "img/gallery01_thumb.png",
				"normal" 	  : "img/gallery01.png",
			},
			{
				
				"title" 	  : "City Shot",
				"desc" 		  : "Screenshot of the film showing Manhatten",
				"thumb" 	  : "img/gallery02_thumb.png",
				"normal" 	  : "img/gallery02.png",
			},
		]
	});
	$("html").cypress("build");
});