// Attach events to keydown, keyup, and blur on "New list" input box.
Template.login.events = {
  'submit form[name=login]': function(event) {
    event.preventDefault();
    //invoke the signup user method
    //sign_up_user: function(username, name, password, type){
    var form = $('form[name=login]')[0];
    Meteor.call('sign_up_user', form.username.value, form.password.value, form.type.value);
  }
}


//////
////// Initialization
//////

Meteor.startup(function () {
  if (Session.get('WorldVuze')) {
    console.log("logged in")
  } else {
    console.log('not logged in')
  }
});
