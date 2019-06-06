import gorilla = require("gorilla/gorilla");

// You don't need the line below (it will just stop the compiler from complaining!)
var jsPsych;
// GORILLA SUPPORT: I don't know why this wasn't working before but putting tap here seems to work now


gorilla.ready(function() {
    
    gorilla.populate('#gorilla', 'exp', {});
    var timeline = [];
      var ins_1 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;">In this task, you can earn up to &#163;5. <br> The task will last approximately 15 mins. </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;">Press space to continue with instructions.</p>'
  }

  var ins_2 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;">In the first section of the task you will see a box that says "Get Ready". <br><br><br><br> After a few seconds it will change to "Go". <br/> When this happens start pressing the DOWN key on the keyboard </br> as fast as you can for 13 seconds. </p>',
    choices: [32],
    prompt: '<br><br><br><p style="color: white; font-size: 30px;">Try and react as fast as you can after the box changes to "Go". <br> Press space to continue with instructions.</p>'
  }
  
  var ins_3 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;"> You will have 13 seconds to press as many times as you can. <br><br><br><br> Please use your dominant index finger at all times. <br/><br><br><br> You will have three attempts and will be rewarded <br> with 1 pence for every press on your best effort. </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }
   timeline.push(ins_1, ins_2, ins_3);
    
    //     /* start the experiment */

    jsPsych.init({
        display_element: $('#jspsych-target')[0],
        timeline: timeline,
        on_finish: function() {
           gorilla.finish();
        },
        on_data_update: function(data) {
            gorilla.metric(data);
        }    
    });
});
      