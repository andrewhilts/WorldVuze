Handlebars.registerHelper('nested_activities', function(list_of_activities) {
  return maketree(list_of_activities);
}),

getQuestions = function(){
  questions = [];
  for(i=0; i<10; i++){
    questions.push({
      _id: Math.floor((Math.random()*10000)+1),
      subject: "What's life like where I live?",
      text: "What's life like where I live?",
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
      text: "Wgdfyteasdf  dsaf asdf asf asf as asdaf as fdsaf dsaf dsafsa",
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

maketree= function(list_of_activities){
  var out = '<section class="question_container"> <h2>Discussions</h2> <ul class="topic-list unstyled span5">';
  var q = getQuestions();
 for(i=0;i<q.length; i++)
 {
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

