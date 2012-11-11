var root = window || exports;

root.User = Backbone.Model.extend({

    urlRoot: "api/users",

    initialize: function () {
        this.validators = {};
        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
        this.validators.email = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an email address"};
        };
        this.validators.mobile = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a mobile number"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    validateAll: function () {
        var messages = {};
        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        name: "",
        email: "",
        mobile: "",
        description: "",
        picture: null
    }
});

root.UserCollection = Backbone.Collection.extend({
    model: User,
    url: "api/users"
});