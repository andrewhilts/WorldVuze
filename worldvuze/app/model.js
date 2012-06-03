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
User = new Meteor.Collection('users');


Meteor.methods({
  notify: function(type, message) {},
    sign_up_user: function(username, password, type){
      var current_user = User.findOne({'username': username});

      if (!current_user) {
        current_user = Meteor.call('create_user',username, type);
      } else if (current_user.password != password) {
        //change the login template to display invalid password
        //throw new Meteor.error(404, 'Password Incorrect');
        //return 'Password Incorrect';
        return false;
      }

      Meteor.call('login_user', current_user, password);//, function(error, result){
      return current_user;
  },
  create_user: function(username, type){
    //temporary teacher
    var teacher = Teacher.findOne({'username': 'admin'});

    var new_user = {'username': username, 'type': type, 'teacher_id': teacher._id};
    var id = null;
    if (type == 'teacher') {
      id = Teacher.insert(new_user);
    } else {
      id = Student.insert(new_user);
    }
    new_user._id = id;
    return new_user;
  },
  login_user: function (current_user, password) {
    User.insert({'type_id': current_user._id, 'username': current_user.username, 'password': password, 'type': current_user.type});
    Session.set('WorldVuze', current_user);
    if (Meteor.is_client) {

      $(document).find('[role=main]').replaceWith(Template.dashboard({
        'username': Session.get('WorldVuze').username,
        'activities': Activity.find({})
      }));
    }
  },

  'post_new_question': function(question, user) {
    var activity_id = Activity.insert({'type': 'question', 'username': user.username, 'user_type': user.type, 'text': question});
    if (Meteor.is_client) {
      $(document).find('[role=main]').replaceWith(Template.question({
        'activity': Activity.findOne({'_id': activity_id})
      }));
    }
  }
});


