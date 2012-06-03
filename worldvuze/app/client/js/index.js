$(document).ready(function(){
  
  $(document).delegate('.new_topic', 'click', function(event){
    event.preventDefault();
    $(document).find('[role=main]').replaceWith(Template.new_topic());
  })

  $(document).delegate('form[name=new_topic]', 'submit', function(event){
      event.preventDefault();
      var form = $('form[name=new_topic]')[0];
      Meteor.call('post_new_question', form.question.value, Session.get('WorldVuze'));
  })

})

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
  },

  'click .profile': function(event) {
    event.preventDefault();
    $(document).find('[role=main]').replaceWith(Template.user_profile({
      'username': Session.get('WorldVuze').username
    }));
  },

  'click .dashboard': function(event) {
    event.preventDefault();
    console.log('hjere');
    $(document).find('[role=main]').replaceWith(Template.dashboard({
      'username': Session.get('WorldVuze').username,
      'activities': Activity.find({})
    }));
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

Template.question.events = {
  'click .discuss': function(event) {
    event.preventDefault();
  }
}

Template.question.getQuestions = function(){
  questions = [];
  for(i=0; i<10; i++){
    questions.push({
      _id: Math.floor((Math.random()*10000)+1),
      subject: "What's life like where I live?",
      question: "What's life like where I live?",
      replies: 12,
      username: 'zim',
      collapsed: "",
      list_of_activities: {}
    });
  }
  comments = [];
  for(i=0; i<5; i++){
    comments.push({
      _id: Math.floor((Math.random()*10000)+1),
      comment: "Wgdfyteasdf  dsaf asdf asf asf as asdaf as fdsaf dsaf dsafsa",
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

Template.user_profile.getProfile = function(){
  return {
    username: "Jane Doe",
    age: 12,
    location: "Toronto, ON",
    school: "Bishop Strachan School"
  };
};

//////
////// Initialization
//////

Meteor.startup(function () {
  if (!Teacher.find({'username': 'admin'}).fetch().length) {
    teacher_id = Teacher.insert({'username': 'admin'});
    activity_id = Activity.insert({'type': 'question', 'creator_id': teacher_id, 'text': 'What is the problem with water quality in Ontario?', 'username': 'admin', 'user_type': 'teacher'})
    Teacher.update({'_id': teacher_id}, {$addToSet: {'activities': [activity_id]}});
  }

  if(Session.get('WorldVuze')) {
    $(document).find('[role=main]').replaceWith(Template.dashboard({
      'username': Session.get('WorldVuze').username,
      'activities': Activity.find({})
    }));
  }
});

