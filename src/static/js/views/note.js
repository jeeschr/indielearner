
var app = app || {};

(function(){
	'use strict';
	app.NoteView = Backbone.View.extend({
		
		el: 'body',

		template: _.template($('#new-note-template').html()),

		events: {
			'click .highlighter-container': 'createOnClick'
		},

		initialize: function(){
			// console.log('initialized: ',this);
			// this.render();
		},

		render: function(model){
			// console.log('rendering');
			// this.$el.html(this.template({
			// 	content: 'boo'
			// }));
			$('#note-row').append(this.template({
				content: model.attributes.content
			}));
			return this;
		},

		createOnClick: function(event){

			console.log('clicked, app: ',app.note);
			// console.log('clicked, this: ',this);
			// console.log('clicked, event: ',event);
			app.Notes.create({
				content: app.note
			});
			// addOne(app.Notes);
			var length = app.Notes.models.length;
			console.log(app.Notes.models[length-1]);
			this.render(app.Notes.models[length-1]);
		}

		// addOne: function(note){

		// }
	});
})();