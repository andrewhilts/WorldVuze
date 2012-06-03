// Attach events to keydown, keyup, and blur on "New list" input box.
Template.login.events = {
  'submit form[name=login]': function(event) {
    event.preventDefault();
    //invoke the signup user method
    //sign_up_user: function(username, name, password, type){
    var form = $('form[name=login]')[0];
    Meteor.call('sign_up_user', form.username.value, form.password.value, form.type.value);
  }
};

Template.nav.events = {
  'click .logout': function(event) {
    event.preventDefault();
    $(document).find('[role=main]').replaceWith(Template.login());
    Session.set('WorldVuze', null);
  }
}

Template.location.locations = function(){
  var list_of_locs = [];

  var get_location = function(location){
   // #add api to get latitude and longitude and return a hash with lat: and lng:

  };

  for(i=0; i< Teacher.count; i++){
    list_of_locs.push(get_location(Teacher[i].location));
  }
  return list_of_locs;
};


Template.location.build_map = function(lat,lng){
  //gmap.js library
  map.addMarker({
  'lat': lat, 'lng': lng});
};


Template.question.getQuestions = function(){
  questions = [];
  for(i=0; i<10; i++){
    questions.push({
      uid: Math.floor((Math.random()*10000)+1),
      subject: "What's life like where I live?",
      replies: 12,
      username: 'zim',
      collapsed: "",
      list_of_activities: {}
    });
  }
  comments = [];
  for(i=0; i<5; i++){
    comments.push({
      uid: Math.floor((Math.random()*10000)+1),
      text: "Wgdfyteasdf  dsaf asdf asf asf as asdaf as fdsaf dsaf dsafsa",
      replies: 12,
      username: 'zim',
      collapsed: ""
    });
  }
  questions[3].collapsed = "collapsed";
  questions[4].list_of_activities = comments;
  for(i in questions){
    if(questions[i].list_of_activities.length > 0){
      questions[i].hasReplies = true;
    }
    else{
      questions[i].hasReplies = false;
    }
  }
  return questions;
};

//////
////// Initialization
//////

Meteor.startup(function () {
});

