﻿define([
    'text!templates/Projects/list/ListTemplate.html',
    "common"
],

function (listTemplate) {
    var projectsListItemView = Backbone.View.extend({
        el: '#listTable',

        initialize: function(options) {
            this.collection = options.collection;
            this.startNumber = options.startNumber;
        },
        
        render: function() {
            this.$el.append(_.template(listTemplate, { projectsCollection: this.collection.toJSON(), startNumber: this.startNumber }));
        }
    });

    return projectsListItemView;
});
