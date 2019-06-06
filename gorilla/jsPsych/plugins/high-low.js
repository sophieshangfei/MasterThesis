import gorilla = require("gorilla/gorilla");

// You don't need the line below (it will just stop the compiler from complaining!)
var jsPsych;
// GORILLA SUPPORT: I don't know why this wasn't working before but putting tap here seems to work now
var tap = 0;
var n = 0;

gorilla.ready(function() {    

    gorilla.populate('#gorilla', 'exp', {});
    var timeline = [];
    var instruction = [];

   var ins_h_1 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;"> You will play both parts of the task one after the other. <br><br><br> Please, tap throughout the task but go as fast or as slow as you want. <br><br><br> Remember: everytime you tap you will catch a fish, <br> but the price you are paid for fish will change. </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>'
  }
  
  var ins_h_2 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 28px;">This is Part 1 of the task <br/> In this part you can earn &#163;4 of the possible &#163;5. <br> You will be asked to play two rounds of the fisherman game <br> Each round will last approximately 2-3 mins. <br><br><br><br><br> If you collect all &#165;3000 in this part you will be paid &#163;4.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>'
  }
  
  var ins_h_3 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 28px;">Please, tap throughout the task but go <br/> as fast or as slow as your want. <br> Remember: everytime you tap you will catch a fish, <br> but the value of that fish will change. <br> If your rod break press the RIGHT button 5 times to fix it. <br> While your rod is broken you are losing time to earn money. </p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space when you are ready to start this round.</p>'
  }
  
    var ins_h_4 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 28px;">In this part - if you collect all &#165;3000 you will be paid &#163;4.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space when you are ready to start this round.</p>'
  }
timeline.push(ins_h_1, ins_h_2, ins_h_3, ins_h_4);




      var ins_l_1 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">This is Part 2 of the task <br/> In this part you can earn &#163;0.5 of the possible &#163;5. <br> You will be asked to play two rounds of the fisherman game <br> Each round will last approximately 2-3 mins. <br><br><br><br><br> If you collect all &#165;3000 in this part you will be paid &#163;0.5.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }
  
  var ins_l_2 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">Please, tap throughout the task but go <br/> as fast or as slow as your want. <br> Remember: everytime you tap you will catch a fish, <br> but the value of that fish will change. <br> If your rod break press the RIGHT button 5 times to fix it. <br> While your rod is broken you are losing time to earn money. </p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space when you are ready to start this round.</p>'
  }
  
    var ins_l_3 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">In this part - if you collect all &#165;3000 you will be paid &#163;0.5.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space when you are ready to start this round.</p>'
  }
timeline.push(ins_l_1, ins_l_2, ins_l_3);
    
    //     /* start the experiment */

    jsPsych.init({
        display_element: $('#jspsych-target')[0],
        timeline: instruction,
        on_finish: function() {
           gorilla.finish();
        },
        on_data_update: function(data) {
            gorilla.metric(data);
        }    
    });
});
