(function(){
var quizDiv = $("#qDiv");
var quizValues = JSON.parse($('.data').attr('quizValues'));
var quizInfo = JSON.parse($('.data').attr('quizInfo'));
var counter = 0;
var selections = []; 
nextQ();
var scoreServer;
var outOf;

$('#home').on('click', function(e) {
    
      $.ajax({
         url: '/addscore',
         type: 'POST',
         data: {
             userScore: scoreServer,
             categoryName: $('#categoryName').text(),
             correct: outOf
         },
         success: function(){
             console.log('send data success');
             location.href = "/welcome"
         }
      });
});
$('#next').on('click', function (e) {
   
    
    // Suspend click listener during fade animation
    if(quizDiv.is(':animated')) {        
      return false;
    }
    
    choose();
    // If no user selection, progress is stopped
    if (typeof selections[counter] === 'undefined') {
      alert('Please make a selection!');
    } else {
      counter++;
      nextQ();
    }
  });
  
$('#prev').on('click', function (e) {
    e.preventDefault();
    if(quizDiv.is(':animated')) {
      return false;
    }
    choose();
    counter--;
    nextQ();
});
  function choose() {
    selections[counter] = $('input[name="answer"]:checked').val();
    
  }
function nextQ(){
    quizDiv.fadeOut(function(){
       $('#question').remove();
     
       if(counter < quizInfo.results.length){
          
           var nextQuestion = createQuestionElement();
           quizDiv.append(nextQuestion).fadeIn();
           if (!(isNaN(selections[counter]))) {
               $('input[value='+selections[counter]+']').prop('checked', true);
           }
           if(counter === 1){
               $('#prev').show();
               
           } else if(counter  === 0){
               $('#prev').hide();
               $('#next').show();
               $('#home').hide();
               
           } /*else if(counter >= ) {
               var scoreElem = displayScore();
               quiz.append(scoreElem).fadeIn();
               $('#next').hide();
               $('#prev').hide();
               $('#home').show();
           }*/
       }else{
           
        var scoreElem = displayScore();
        quizDiv.append(scoreElem).fadeIn();
           $('#next').hide();
           $('#prev').hide();
           $('#home').show();
       }
       
    });
    
}
function displayScore(){
    var score = $('<p>',{id: 'score'});
    var totalScore = 0;
    var numCorrect = 0;

    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === quizInfo.results[i].correct_answer) {
          var dif = quizInfo.results[i].difficulty;
          var typ = quizInfo.results[i].type;
          totalScore+=quizValues[dif][typ];
        numCorrect++;
      }
      
    }
    scoreServer = totalScore;
    outOf = numCorrect + '/' + selections.length;
    score.append('You got ' + numCorrect + ' questions out of ' +
                 selections.length + ' right!!!<br>'+
                 'Points Earned: ' + totalScore);
                 
    return score;
    
}
function createQuestionElement(){
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (counter+1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(quizInfo.results[counter].question);
    qElement.append(question);
    //qElement.append('<ul><li>`<input type="radio" name="answer" value=1/<li><ul>')
    
    var radioButtons = createRadios();
    qElement.append(radioButtons);
    
   return qElement;
}

function createRadios() {
    var radioList = $('<ul>');
    var item;
    var input = '';
    var choices = quizInfo.results[counter].incorrect_answers;
    choices.push(quizInfo.results[counter].correct_answer);
    for (var i = 0; i < choices.length; i++) {
      item = $('<li>');
      input = `<input type="radio" name="answer" value="${choices[i]}"/>`;
      input += `<label>${choices[i]}</label>`;
      item.append(input);
      radioList.append(item);
    }
    
    return radioList;
  }
  

})();