//Session:
//current_user: Object

Teacher = new Meteor.Collection('teachers');
// teachers = {id: number,username: string, name: string, classrooms: [list of id], students: [array of id], location:string, language: locales, activities: [array of id], password: text}
//inside classrooms: topics :[list of ids of topics]
Student = new Meteor.Collection('students');
// students = {id: number, classrooms: [list of id], activities: [array of id]}

Classroom = new Meteor.Collection('classrooms');
// classrooms = {classroom_id: number, creator_id:number , activities: [array of id], students: [list of ids]}

Activity = new Meteor.Collection('activities');
//{type: comment|question}

Meteor.methods({
  notify: function(type, message) {}
});

//Publish initial templates here and create public interface in case not logged in and check session
if (Meteor.is_server) {

  Meteor.publish('players', function () {
    return Players.find({idle: false});
  });

  // publish single games
  Meteor.publish('games', function (id) {
    return Games.find({_id: id});
  });

  // publish all my words and opponents' words that the server has
  // scored as good.
  Meteor.publish('words', function (game_id, player_id) {
    return Words.find({$or: [{game_id: game_id, state: 'good'},
                             {player_id: player_id}]});
  });

}

