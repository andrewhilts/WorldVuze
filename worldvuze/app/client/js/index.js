notify: function(input){
  alert(input);
},

Meteor.methods({

});



//////
////// Initialization
//////

Meteor.startup(function () {
  // Allocate a new player id.
  //
  // XXX this does not handle hot reload. In the reload case,
  // Session.get('player_id') will return a real id. We should check for
  // a pre-existing player, and if it exists, make sure the server still
  // knows about us.
 // var player_id = Players.insert({name: '', idle: false});
  //Session.set('player_id', player_id);

  // subscribe to all the players, the game i'm in, and all
  // the words in that game.
  //Meteor.autosubscribe(function () {
   // Meteor.subscribe('players');

//    if (Session.get('player_id')) {
 //     var me = player();
 //     if (me && me.game_id) {
  //      Meteor.subscribe('games', me.game_id);
  //      Meteor.subscribe('words', me.game_id, Session.get('player_id'));
  //    }
  //  }
  //});

  // send keepalives so the server can tell when we go away.
  //
  // XXX this is not a great idiom. meteor server does not yet have a
  // way to expose connection status to user code. Once it does, this
  // code can go away.
//  Meteor.setInterval(function() {
 //   if (Meteor.status().connected)
   //   Meteor.call('keepalive', Session.get('player_id'));
  //}, 20*1000);
});
