User = new Meteor.Collection('users');

Meteor.methods({
  sign_up_user: function(username, password, type){
      var current_user = User.findOne({'username': username});

      if (!current_user) {
        current_user = Meteor.call('create_user',username, type);
      } else if (current_user.password != password) {
        //change the login template to display invalid password
        throw new Meteor.error(404, 'Password Incorrect');
        return 'Password Incorrect';
      }

      Meteor.call('login_user', current_user, password, function(error, result){
       if(error) {
          throw new Meteor.error('500', result)
        }
      });
  },
  create_user: function(username, type){
      new_user = {'username': username, 'type': type};
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
      if (Meteor.is_server) {
        User.insert({'type_id': current_user.id, 'username': current_user.username, 'password': current_user, 'type': current_user.type});
      }
  }
});
