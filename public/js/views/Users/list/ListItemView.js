﻿define([
    'text!templates/Users/list/ListTemplate.html'
],

function (ListTemplate) {
    var ListItemView = Backbone.View.extend({
        el: '#listTable',

        initialize: function(options) {
            this.collection = options.collection;
            this.startNumber = options.startNumber;
        },

        render: function() {
            this.$el.append(_.template(ListTemplate, { usersCollection: this.collection.toJSON(), startNumber: this.startNumber }));
        }
    });

    return ListItemView;
});