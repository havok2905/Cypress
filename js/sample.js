$(document).ready(function()
{
	// Add a gallery with the following images
	$("html").cypress({"images":[
		{
			"title": "Country Side",
			"desc": "Picture of rural Texas",
			"thumb": "img/gallery01_thumb.jpg",
			"normal": "img/gallery01.jpg",
		},
		{
			"title": "Airplane Shot",
			"desc": "Picture of lakes over Orlando Florida",
			"thumb": "img/gallery02_thumb.jpg",
			"normal": "img/gallery02.jpg",
		},
		]
	});
	$("html").cypress("build");
});