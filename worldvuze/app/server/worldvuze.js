User = new Meteor.Collection('users');

Meteor.methods({
  sign_up_user: function(username, name, password, type){
      var current_user = User.findOne({'username': username});
      if (!current_user) {
        current_user = Meteor.call('create_user',username, name, password, type);
      } else if (current_user.password != password) {
        //change the login template to display invalid password

        return;
      }
      Meteor.call('login_user',current_user, password);
  },
  create_user: function(username, name, type){
      new_user = {'username': username, 'name': name, 'type': type};
      var id = null;

      if (type == 'teacher') {
        id = Teacher.insert(new_user);
      } else {
        id = Student.insert(new_user);
        Meteor.publish('students',function(){this.flush(); return Student.find({});});
      }

      new_user._id = id;
      return new_user;

  },
  login_user: function (current_user, password) {
      Session.set('WorldVuze', current_user);
      console.log('here');
      console.log(Student.find(current_user._id).fetch());
      if (Meteor.is_server) {
        User.insert({'type_id': current_user.id, 'username': current_user.username, 'password': current_user, 'type': current_user.type});
      }
  }
});
////////// Server only logic //////////

Meteor.methods({
  start_new_game: function (evt) {
    console.log('asdas')
    // create a new game w/ fresh board
    var game_id = Games.insert({board: new_board(),
                                clock: 120});

    // move everyone who is ready in the lobby to the game
    Players.update({game_id: null, idle: false, name: {$ne: ''}},
                   {$set: {game_id: game_id}},
                   {multi: true});
    // Save a record of who is in the game, so when they leave we can
    // still show them.
    var p = Players.find({game_id: game_id},
                         {fields: {_id: true, name: true}}).fetch();
    Games.update({_id: game_id}, {$set: {players: p}});


    // wind down the game clock
    var clock = 120;
    var interval = Meteor.setInterval(function () {
      clock -= 1;
      Games.update(game_id, {$set: {clock: clock}});

      // end of game
      if (clock === 0) {
        // stop the clock
        Meteor.clearInterval(interval);
        // declare zero or more winners
        var scores = {};
        Words.find({game_id: game_id}).forEach(function (word) {
          if (!scores[word.player_id])
            scores[word.player_id] = 0;
          scores[word.player_id] += word.score;
        });
        var high_score = _.max(scores);
        var winners = [];
        _.each(scores, function (score, player_id) {
          if (score === high_score)
            winners.push(player_id);
        });
        Games.update(game_id, {$set: {winners: winners}});
      }
    }, 1000);

    return game_id;
  },


  keepalive: function (player_id) {
    Players.update({_id: player_id},
                  {$set: {last_keepalive: (new Date()).getTime(),
                          idle: false}});
  }
});

Meteor.setInterval(function () {
  var now = (new Date()).getTime();
  var idle_threshold = now - 70*1000; // 70 sec
  var remove_threshold = now - 60*60*1000; // 1hr

  Players.update({$lt: {last_keepalive: idle_threshold}},
                 {$set: {idle: true}});

  // XXX need to deal with people coming back!
  // Players.remove({$lt: {last_keepalive: remove_threshold}});

}, 30*1000);
