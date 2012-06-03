Handlebars.registerHelper('nested_activities', function() {
  return maketree(getQuestions(Session.get('WorldVuze').teacher_id));
}),



getQuestions= function(teacher_id){
  teacher_id = "6736d5a9-56f6-4117-b5a7-179f3a76994b";
  questions = Teacher.findOne(teacher_id).activities;
  //id, subject, text,replies,username,collapsed,list_of_activites
  //comments = id, text,replies,username,collapsed
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

maketree= function(list_of_activities){
  var out = '<section class="question_container"> <h2>Discussions</h2> <ul class="topic-list unstyled span5">';
  var q = list_of_activities;
  alert(list_of_activities);
 for(i=0;i<q.length; i++)
 {
  alert("^^^");
  out +=  '<li class="thread well' + q[i].collapsed + '"id="{{uid}}">';
  out +=  '<h3 class="question">'+q[i].subject+'</h3>';
  out +=  '<div class="user">'+q[i].username+'</div>';
  out +=  '<a href="#" class="watch"><i class="icon-eye-open watch"></i></a>';
  out +=  '<div class="control-box">';
  out +=  '<span class="comments"><i class="icon-comment"></i>'+q[i].replies+'</span>';
  out +=      '<button class="btn cta btn-inverse discuss">Discuss &raquo;</button>';
  out +=      '<div class="meta">';
  out +=      '<div class="countries"><i class="icon-globe"></i>Participants from 3 countries.</div>';
  out +=   '</div>';
  out +=  '</div>';
  if (q[i].hasReplies){
      out +=  '<div class="replies">';
      out +=    '<div class="thread well'+q[i].collapsed+'">';
      out +=      '<h3 class="question">'+q[i].subject+'</h3>';
      out +=      '<div class="user">'+q[i].username+'</div>';
      out +=    '</div>';
      out += '<ul class="unstyled replies-list">';
            for(j=0;j<q[i].list_of_activities.length; j++)
            {
                 out += '<li>';
                 out+= '<div class="user">'+q[i].list_of_activities[j].username+'</div>';
                  out+= '<div class="text">'+q[i].list_of_activities[j].text+'</div>';
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

