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
      
 // post max tapping instructions start here // 
  var ins_5 = {
    type: 'html-keyboard-response-fish',
    stimulus: function(){
        return '<p style="color: white; font-size: 30px; line-height: 36px;"> In this task you can earn up to &#163;3.  <br/><br><br> You will play as a fisherman who earns money, yen, by catching fish.<br/><br><br> At the end of the task the yen you earn will be converted into real money up to &#163;3</p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }
  var ins_6 = {
    type: 'html-keyboard-response-fish',
    stimulus: function () { 
        return '<p style="color: white; font-size: 30px; line-height: 36px;"> You will play two rounds each lasting one minute.  <br/><br><br> During these rounds you catch fish<br/> by repeatedly pressing the DOWN key. <br><br><br> For every fish you catch you will be paid in yen (&#165) <br> However the price you are paid for <br/>each fish will change over time.</p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }
  var ins_7 = {
    type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px; line-height: 36px;"> For example, sometimes the price of the fish is high <br/> The maximum price you could be offered is &#165 6.0 per fish. <br><br><br><br> Sometimes, however, the price of fish will be very low. <br/> The minimum price you could be offered is &#165 0.1 per fish.<br></p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }
  var ins_8 = {
    type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px; line-height: 36px;"> You should tap as fast or as slow as you want <br/> throughout each round to earn yen. <br><br><br><br> You will always be shown the current price of fish <br/> and in each round the maximum number of yen <br/> you can earn is &#165 3000<br></p>'},
    choices: [32], 
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }

  var show_price_first = {
    type: 'call-function-fish',
    func: function(){
      $('#price')[0].style.display = "block";
      $('#price-count')[0].innerHTML = 6.0;
    }
  }
  
  var ins_9 = {
      type: 'image-keyboard-response-practice',
      stimulus: gorilla.stimuliURL('fish.png'),
      background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
      background_spec_repeat: 'no-repeat',
      background_spec_position: 'center center',
      choices: [32],
      prompt: '<p style="color: white; font-size: 28px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">This is what the task looks like. <br> Press space to continue with instructions.</p>'
    }

  var ins_10 = {
      type: 'image-keyboard-response-practice',
      stimulus: gorilla.stimuliURL('fish.png'),
      background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
      background_spec_repeat: 'no-repeat',
      background_spec_position: 'center center',
      choices: [32],
      prompt: '<p style="color: white; font-size: 28px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">The current price is in white. <br> Press space to continue with instructions.</p>'
  }
  
  var ins_11 = {
      type: 'image-keyboard-response-practice',
      stimulus: gorilla.stimuliURL('fished.png'),
      background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
      background_spec_repeat: 'no-repeat',
      background_spec_position: 'center center',
      choices: [32],
      prompt: '<p style="width: 80%; color: white; font-size: 28px; line-height: 32px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">When you catch a fish, you will see the fish move. <br> Press space to continue with instructions.</p>'
  }

  var ins_12 = {
    type: 'image-keyboard-response-practice',
      stimulus: gorilla.stimuliURL('fish.png'),
      background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
      background_spec_repeat: 'no-repeat',
      background_spec_position: 'center center',
      choices: [32],
      prompt: '<p style="color: white; font-size: 28px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">Currently the price is at the max of &#165 6.0 per fish. <br> Press space to continue with instructions.</p>'
  }


  var show_price_second = {
    type: 'call-function-fish',
    func: function(){
      $('#price-count')[0].innerHTML = 0.1;
    }
  }
  var ins_13 = {
     type: 'image-keyboard-response-practice',
      stimulus: gorilla.stimuliURL('fish.png'),
      background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
      background_spec_repeat: 'no-repeat',
      background_spec_position: 'center center',
      choices: [32],
    prompt: '<p style="width: 80%; color: white; font-size: 30px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">This is an example of the minimum price &#165 0.1 per fish. <br> Press space to continue with instructions.</p>'
}


  var ins_14 = {
     type: 'image-keyboard-response-practice',
      stimulus: gorilla.stimuliURL('fish.png'),
      background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
      background_spec_repeat: 'no-repeat',
      background_spec_position: 'center center',
      choices: [32],
    prompt:'<p style="width: 80%; color: white; font-size: 30px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">This price will change during the task so watch the price. <br> When it changes you will also hear a bell. <br> Press space to continue.</p>'
  }
    
//     var ins_15 = {
//      type: 'image-keyboard-response-practice',
//       stimulus: gorilla.stimuliURL('fish.png'),
//       background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
//       background_spec_repeat: 'no-repeat',
//       background_spec_position: 'center center',
//       choices: [32],
//     prompt:   '<p style="width: 80%; color: white; font-size: 30px; position: absolute; top: 6%; left: 50%; transform: translate(-50%, -6%);">You can now do a practice for 26 seconds. <br> Press space when you are ready to start.</p>'
//   }

var hide_price = {
    type: 'call-function-fish',
    func: function(){
      $('#price').hide();
    }
  }
  
  var ins_15 = {
type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px;"> You can now do a practice for 20 seconds.</p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to start.</p>'
  }
  
  
  instruction.push(ins_5, ins_6, ins_7, ins_8, show_price_first, ins_9, ins_10, ins_11, ins_12);
  instruction.push(show_price_second, ins_13, ins_14, hide_price, ins_15);
   
  // price training start here // 
   
    var block_length = 13000;
    var block_start_time;
    var n_blocks = 2;
    var Price = [6.0, 0.1];
    var fish_count = 1;
    var p = 0;
    
  var show_price_l = {
    type: 'call-function-fish',
    func: function(){
      $('#practice')[0].style.display = 'block';
    }
  }
  timeline.push(show_price_l);
  
  var show_message_l = {
      type: 'call-function-fish',
      func: function(){
        $('#message-l')[0].style.display = 'block';
      }
  }
  timeline.push(show_message_l);
  
  var total_count = [];
  for(var i=0; i<n_blocks; i++){
      
            var price_l = {
                type: 'call-function-fish',
                func: function(){
                    $('#practice-count')[0].innerHTML = Price[p];
                    // console.log(Price[p])
                    p = p + 1;
                }
      }

    var fishing_compul = {
        type: 'fishing-looping',
        stimulus: gorilla.stimuliURL('fish.png'),
        prompt: '<p>Fish!</p>',
        choices: [40, 40],
        key_answer: 40,
        show_stim_with_feedback: true,
        fished_feedback: gorilla.stimuliURL('fished.png'),
        background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
        background_spec_repeat: 'no-repeat',
        background_spec_position: 'center center'
    }
      
      var timer_start_l = {
        type: 'call-function-fish',
        func: function(){
          var d = new Date();
          block_start_time = d.getTime();
        }
      }

      var conditional_timer = {
        timeline: [timer_start_l],
        conditional_function: function(){
          var data = jsPsych.data.get().last(1).values()[0];
          if(data.key_press == 40){
            return true;
          } else {
            return false;
          }
        }
      }
      
      var audio_l = {
        type: 'call-function-fish',
        func: function(){
        var audio = gorilla.stimuliURL("ding.wav");
        var AU = new Audio(audio);
        AU.play();
        }
      }

      var counter_time = 0;
      var rem = [13000];
      var fishing_l = {
        type: 'fishing-looping',
        stimulus: gorilla.stimuliURL('fish.png'),
        prompt: '<p>Fish!</p>',
        choices: [40, 40],
        key_answer: 40,
        show_stim_with_feedback: true,
        fished_feedback: gorilla.stimuliURL('fished.png'),
        background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
        background_spec_repeat: 'no-repeat',
        background_spec_position: 'center center',
        trial_duration: rem[counter_time],
        on_finish: function(data){
            if (data.key_press == 40){
              fish_count = fish_count + 1;
             // console.log(tap);
            }
          }
    }
      
  var loop_node_l = {
    timeline: [fishing_l],
    loop_function: function(data){
      if(Date.now() - block_start_time < block_length){
        var re_time = block_length - Date.now() + block_start_time
        rem.push(re_time);
        counter_time = counter_time + 1;
        return true;
      } else {
        total_count.push(fish_count);
        fish_count = 1;
        rem = [13000];
        counter_time = 0;
        return false;
      }
    }
  };
  timeline.push(price_l, audio_l, fishing_compul, conditional_timer, loop_node_l);
}

 var switch_to_regular_style_2 = {
        type: 'call-function-fish',
        func: function(){
          p = 0;
          $('#message-l').hide();
          $('#practice').hide();
        }
      }
      timeline.push(switch_to_regular_style_2);
    var f1;
    var m1;
    var f2;
    var m2
    var show_feedback = {
    type: 'call-function-fish',
    func: function(){
        $('#practice-feedback')[0].style.display = 'block';
        f1 = total_count[0];
        m1 = Math.floor(total_count[0]*6.0);
        f2 = total_count[1];
        m2 = Math.floor(total_count[1]*0.1);
        // console.log(sum_tap);
        $('#practice-tap-h')[0].innerHTML = f1;
        $('#practice-money-h')[0].innerHTML = m1;
        $('#practice-tap-l')[0].innerHTML = f2;
        $('#practice-money-l')[0].innerHTML = m2;
    }
}

  var feedback = {
    type: 'html-keyboard-response-fish',
    stimulus: function() {return ''},
    choices: [32],
    prompt: '<br><br><br><br><br><br><br><br><br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>'
  }

    var hide_feedback = {
    type: 'call-function-fish',
    func: function(){
        total_count = [];
        $('#practice-feedback').hide();
    }
}
 timeline.push(switch_to_regular_style_2, show_feedback, feedback, hide_feedback);
 

// Mood instruction starts here //
  var mood_1 = {
type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px;"> You will also be asked to rate your mood. </p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to start.</p>'
  }

  var mood_rating_1 = {
type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px;"> Please rate your mood.  </p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Remember to use the scale to express your feelings! </p>'
  }

  var mood_rating_2 = {
type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px;"> Please rate your mood.  </p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Remember to use the scale to express your feelings! </p>'
  }

   var pre_spin_bad = {
type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px;"> Next, you will be asked to spin a wheel of fortune. <br><br> You will either win 2 pounds or get nothing. </p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> If you are lucky and win 2 pounds, that 2 pounds will be added on top of your earning from fishing. <br><br> Ready? </p>'
  }

     var pre_spin_good = {
type: 'html-keyboard-response-fish',
    stimulus: function() {
        return '<p style="color: white; font-size: 30px;"> Next, you will be asked to spin a wheel of fortune. <br><br> You will either lose 2 pounds or lose nothing. </p>'},
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> If you are unlucky and lose 2 pounds, that 2 pounds will be deducted from your earning from fishing. <br><br> Ready? </p>'
  }

// Mood instruction ends //
      


  
  var check_question_2 = {
    type: 'categorize-html',
    key_answer: 84,
    choices: [84, 70],
    stimulus: '<p style="color: white; font-size: 40px;">The price changes every 13 seconds.<br><br><br><br></p>',
    text_answer: 'true',
    correct_text: '<p style="color: white; font-size: 28px;">Correct. Prices change every 13 seconds.</p>',
    incorrect_text: '<p style="color: white; font-size: 28px;">Incorrect. Prices change every 13 seconds. Please press the correct key to continue.</p>',
    prompt: '<p style="color: white; font-size: 28px;">Press T if the answer is True. Press F if answer is False.</p>',
    force_correct_button_press: false
  };
  
  
  var check_question_3 = {
    type: 'categorize-html',
    stimulus: '<p style="color: white; font-size: 40px;">I have to tap as fast I can.<br><br><br><br></p>',
    key_answer: 70,
    choices: [84, 70],
    text_answer: 'False',
    correct_text: '<p style="color: white; font-size: 28px;">Correct. You can tap as fast or as slow as you see fit, depending on the price of the fish and the color of the water.</p>',
    incorrect_text: '<p style="color: white; font-size: 28px;">Incorrect. You can tap as fast or as slow as you see fit, depending on the price of the fish and the color of the water.</p>',
    prompt: '<p style="color: white; font-size: 28px;">Press T if the answer is True. Press F if answer is False.</p>',
    force_correct_button_press: false
  };
  

  

  var ins_23 = {
      type: 'html-button-response',
      stimulus: '<p style="width: 80%; color: white; font-size: 28px; position: absolute; top: 3%; left: 50%; transform: translate(-50%, -3%);"><br><br><br><br> If you understand the instructions and are ready to play,</br> press the *Start Game* button below. <br><br> If you would like to read the instructions again, </br>press the *Read Instructions Again* button.</p>',
      choices: ['Start Game', 'Read Instructions Again']
  }
  
    
    timeline.push(check_question_2, check_question_3, ins_23);
    
    var repeat_practice = {
        timeline: timeline,
        loop_function: function(data){
            console.log(data.last(1).values()[0].button_pressed);
            if (data.last(1).values()[0].button_pressed == 1){
                return true;
            } else {
                return false;
            }
        }
    }
  instruction.push(repeat_practice);
    
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



