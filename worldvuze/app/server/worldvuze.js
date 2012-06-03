User = new Meteor.Collection('users');

Meteor.methods({
  sign_up_user: function(username, name, password, type){
      var current_user = User.findOne({'username': username});
      if (!current_user) {
        current_user = Meteor.call('create_user',username, name, password, type);
      } else if (current_user.password != password) {
        notify("Incorrect password");
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
