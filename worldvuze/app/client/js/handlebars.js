Handlebars.registerHelper('nested_activities', function(list_of_activities) {
  var out = "<ul>";
  if (list_of_activities.length == 0)
  {
    return;
  }
  else{
     for(var i=0; i<list_of_activities.length ; i++) {
        var current_activity = Activity.find(list_of_activities[i]);
        out = out + "<li>" + current_activity.text + "</li>";
        Handlebars.nested_activities(current_activity.list_of_activities);
    }
  }
  return out + "</ul>";
});
