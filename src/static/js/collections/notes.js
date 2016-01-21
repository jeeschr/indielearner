var app = app || {};
(function(){
	'use strict';
	var NoteGroup = Backbone.Collection.extend({
		
		model: app.Note,

		localStorage: new Backbone.LocalStorage("notes-backbone")
		
		// url: function(){
          // return "/bababa/" ;
    	// },
    	// url: 'akakaka'
	});

	app.Notes = new NoteGroup();

})();