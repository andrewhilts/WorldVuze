Handlebars.registerHelper('nested_activities', function() {
  return maketree(getQuestions(Session.get('WorldVuze').teacher_id));
}),



getQuestions= function(teacher_id){
  questions = Teacher.findOne(teacher_id).activities;
  //id, subject, text,replies,username,collapsed,list_of_activites
  //comments = id, text,replies,username,collapsed
  for(i in questions){
    if(Activity.find(questions[i]).list_of_activities){
      questions[i].hasReplies = true;
    }
    else{
      questions[i].hasReplies = false;
    }
  }
  return questions;
};

maketree= function(list_of_activities){
  var out = '<section class="question_container"> <h2>Discussions</h2> <ul class="topic-list unstyled span5">';
  var q = list_of_activities;
 for(i=0;i<q.length; i++)
 {
  var z = Activity.findOne(q[i].toString());
  out +=  '<li class="thread well' + z.collapsed + '"id='+z._id+'>';
  out +=  '<h3 class="question">'+z.text+'</h3>';
  out +=  '<div class="user">'+z.username+'</div>';
  out +=  '<a href="#" class="watch"><i class="icon-eye-open watch"></i></a>';
  out +=  '<div class="control-box">';
  out +=      '<button class="btn cta btn-inverse discuss">Discuss &raquo;</button>';
  out+= '<button class="new_comment pull-right btn btn-primary">Post New Comment</button>';
  out +=      '<div class="meta">';
  out +=   '</div>';
  out +=  '</div>';

  if (z.hasReplies){
      out +=  '<div class="replies">';
      out +=    '<div class="thread well'+z.collapsed+'">';
      out +=      '<h3 class="question">'+z.subject+'</h3>';
      out +=      '<div class="user">'+z.username+'</div>';
      out +=    '</div>';
      out += '<ul class="unstyled replies-list">';

            for(j=0;j<z.list_of_activities.length; j++)
            {
                 out += '<li>';
                 out+= '<div class="user">'+z.list_of_activities[j].username+'</div>';
                  out+= '<div class="text">'+z.list_of_activities[j].text+'</div>';
                out+= '</li>';
            }
        out += '</ul>';
        out += '</div>';
     }

    out +='</li>';
 }
 out +='</ul>';
out +='</section>';
return out;

}

