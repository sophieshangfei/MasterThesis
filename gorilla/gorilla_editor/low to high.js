import gorilla = require("gorilla/gorilla");

// You don't need the line below (it will just stop the compiler from complaining!)
var jsPsych;
// GORILLA SUPPORT: I don't know why this wasn't working before but putting tap here seems to work now
var tap = 0;
var s = 0;
var n = 0;
var quality_check;
var price_recorded = 0;

gorilla.ready(function() {
    
    gorilla.populate('#gorilla', 'exp', {});
    
// randomize price for round 1 and round 2//
    var price_1 = [0.10, 0.30, 0.70, 1.20, 1.80, 2.5];
    var price_2 = [0.10, 0.30, 0.70, 1.20, 1.80, 2.5];
    var price_3 = [0.10, 0.30, 0.70, 1.20, 1.80, 2.5];
    var price_4 = [0.10, 0.30, 0.70, 1.20, 1.80, 2.5];
    var shufflePrice_11 = gorilla.shuffle(price_1); //randomize price
    var shufflePrice_12 = gorilla.shuffle(price_2); //randomize price again
    var randP_1 = shufflePrice_11.concat(shufflePrice_12);
    var shufflePrice_21 = gorilla.shuffle(price_3); //randomize price
    var shufflePrice_22 = gorilla.shuffle(price_4); //randomize price again
    var randP_2 = shufflePrice_21.concat(shufflePrice_22);
    // two rounds of price is stored under randP_1 and randP_2 //
    
    var rod_checker_t = 13000;
    
// initialize experiment parameters //
    var block_length = 8000;
    var block_start_time;
    var n_blocks = 15;
    var timeline = [];
    var rem_11 = [8000];
    var rem_21 = [8000];
    var rem_12 = [8000];
    var rem_22 = [8000];
 	  
 	  
//*****//*****//*****//*****//*****//*****//*****
//////////////// Low Environment ////////////////
//*****//*****//*****//*****//*****//*****//*****

// round 1 //
// at round 1 - rod fixing occurs at 3, 7, 11 //
// [fish, fish, rod, fish, fish, fish, fish, rod, fish, fish, fish, fish, rod, fish, fish] //
// [ 0,    1,     2,   3,    4,    5,    6,   7,    8,    9,    10,  11,   12,  13,    14 ] //
// i = 2, 7, 12	 
var t = 0; // indexing price
var r_11 = 0; // first instance of round 1
var rod_series_1 = [2, 7, 12];

  for(var i=0; i<n_blocks; i++){
      if (rod_series_1.includes(r_11)){
          // do rod
          r_11 = r_11 + 1;
          var show_direction_l = {
              type: 'call-function',
              func: function(){
                  $('#direction-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
          }
        }
          timeline.push(show_direction_l);
          var n_fix = 5;
          var rod_fixing_first_l = {
              type: 'rod-fixing-l',
              stimulus: gorilla.stimuliURL('cross.png'),
              choices: [39, 39],
              background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              on_finish: function(data){
                jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "rod_fixing", function_id: "rod_fixing_first",
                                            rod_fixing_checked: quality_check});
                  if (data.key_press == 39){
                      n = n + 1;
                      return n;
                  } else {
                      n_fix = n_fix + 1;
                      return n_fix;
                  }
              }
          };
          timeline.push(rod_fixing_first_l);
          var fix_node_l = {
              timeline: [rod_fixing_first_l],
              loop_function: function(data){
                  if(n < n_fix){
                      quality_check= "1";
                      return true;
                  } else {
                      return false;
                  }
              }
          }
          var rt_check_l = {
              timeline: [fix_node_l],
              conditional_function: function(){
                  var data = jsPsych.data.get().last(1).values()[0];
                  if(data.rt > rod_checker_t){
                    quality_check= "0";
                      return false;
                  } else {
                    quality_check= "1";
                      return true;
                  }
              }
          }
          timeline.push(rt_check_l);
          var switch_to_regular_style_3 = {
              type: 'call-function',
              func: function(){
                  $('#direction-l').hide();
                  n = 0;
                  n_fix = 5;
              },
            on_finish: function(data){
                jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
            }
          }
          timeline.push(switch_to_regular_style_3);
      } else {
          // do fish
          r_11 = r_11 + 1;
          var show_price_l = {
              type: 'call-function',
              func: function(){
                  $('#price')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          timeline.push(show_price_l);
          var show_message_l = {
              type: 'call-function',
              func: function(){
                  $('#message-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          timeline.push(show_message_l);
          var timer_start_l = {
              type: 'call-function',
              func: function(){
                  $('#price-correct-count')[0].innerHTML = randP_1[t];
                  price_recorded = randP_1[t];
                  t = t + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          var audio_l = {
              type: 'call-function',
              func: function(){
                  var audio = gorilla.stimuliURL("ding.wav");
                  var AU = new Audio(audio);
                  AU.play();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          var counter_time = 0;
          var fishing_l = {
              type: 'fishing-looping',
              stimulus: gorilla.stimuliURL('fish.png'),
              choices: [40, 40],
              key_answer: 40,
              show_stim_with_feedback: true,
              fished_feedback: gorilla.stimuliURL('fished.png'),
              background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              trial_duration: rem_11[counter_time],
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: price_recorded, 
                                            round_instance: "11", task: "fishing", function_id: "fishing-l",
                                            rod_fixing_checked: ""});
              }
          }
          var loop_node_l = {
              timeline: [fishing_l],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_11.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      return false;
                  }
              }
          };
          timeline.push(timer_start_l, audio_l, loop_node_l);
          var switch_to_regular_style_2 = {
              type: 'call-function',
              func: function(){
                  $('#message-l').hide();
                  $('#price').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "11", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          timeline.push(switch_to_regular_style_2);
      }// bracket for else clause
}// bracket for loop

// self-timed break between two rounds //
  var break_1 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 28px;"> Ready whenever you are! </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>'
  }
  timeline.push(break_1);
  
// round 2 //
// round 2 //
// at round 2 - rod fixing occurs at 4, 8, 11 //
// [fish, fish, fish, rod, fish, fish, fish, fish, rod, fish, fish, fish, rod, fish, fish] //
// [ 0,    1,     2,   3,    4,    5,    6,   7,    8,    9,    10,  11,   12,  13,   14 ] //
// i = 3, 8, 12
 var rod_series_2 = [3, 8, 12];
 var g = 0; // reset g; 
 var r_21 = 0; // round 2 second instance
 // randP_2 randomized price array
    for(var i=0; i<n_blocks; i++){
    if (rod_series_2.includes(r_21)){
        // do rod
          r_21 = r_21 + 1;
          var show_direction_l = {
              type: 'call-function',
              func: function(){
                  $('#direction-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          timeline.push(show_direction_l);
          var n_fix = 5;
          var rod_fixing_first_l = {
              type: 'rod-fixing-l',
              stimulus: gorilla.stimuliURL('cross.png'),
              choices: [39, 39],
              background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              on_finish: function(data){
                jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "rod-fixing", function_id: "rod_fixing_first_l",
                                            rod_fixing_checked: quality_check});
                  if (data.key_press == 39){
                      n = n + 1;
                      return n;
                  } else {
                      n_fix = n_fix + 1;
                      return n_fix;
                  }
              }
          };
          timeline.push(rod_fixing_first_l);
          var fix_node_l = {
              timeline: [rod_fixing_first_l],
              loop_function: function(data){
                  if(n < n_fix){
                    quality_check = "1";
                      return true;
                  } else {
                    quality_check = "0";
                      return false;
                  }
              }
          }
          var rt_check_l = {
              timeline: [fix_node_l],
              conditional_function: function(){
                  var data = jsPsych.data.get().last(1).values()[0];
                  if(data.rt > rod_checker_t){
                    quality_check = "0";
                      return false;
                  } else {
                    quality_check = "1"
                      return true;
                  }
              }
          }
          timeline.push(rt_check_l);
          var switch_to_regular_style_3 = {
              type: 'call-function',
              func: function(){
                  $('#direction-l').hide();
                  n = 0;
                  n_fix = 5;
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }

          }
          timeline.push(switch_to_regular_style_3);
    } else {
        // do fish
          r_21 = r_21 + 1;
          var show_price_l = {
              type: 'call-function',
              func: function(){
                  $('#price')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          timeline.push(show_price_l);
          var show_message_l = {
              type: 'call-function',
              func: function(){
                  $('#message-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          timeline.push(show_message_l);
          var timer_start_l = {
              type: 'call-function',
              func: function(){
                  $('#price-correct-count')[0].innerHTML = randP_2[g];
                  price_recorded = randP_2[g];
                  g = g + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          var audio_l = {
              type: 'call-function',
              func: function(){
                  var audio = gorilla.stimuliURL("ding.wav");
                  var AU = new Audio(audio);
                  AU.play();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
              }
          }
          var counter_time = 0;
          var fishing_l = {
              type: 'fishing-looping',
              stimulus: gorilla.stimuliURL('fish.png'),
              choices: [40, 40],
              key_answer: 40,
              show_stim_with_feedback: true,
              fished_feedback: gorilla.stimuliURL('fished.png'),
              background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              trial_duration: rem_21[counter_time],
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: price_recorded, 
                                            round_instance: "21", task: "fishing", function_id: "fishing-l",
                                            rod_fixing_checked: ""});
              }
          }
          var loop_node_l = {
              timeline: [fishing_l],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_21.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      return false;
                  }
              }
          };
          timeline.push(timer_start_l, audio_l, loop_node_l);
          var switch_to_regular_style_2 = {
              type: 'call-function',
              func: function(){
                  $('#message-l').hide();
                  $('#price').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "low", price_displayed: "", 
                                            round_instance: "21", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
          }
          timeline.push(switch_to_regular_style_2);
    } // bracket for else clause
} // bracket for loop

  var break_2 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 28px;"> In the next round, you will be in a different environment. Ready whenever you are! </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>'
  }
  timeline.push(break_2);
 	  

//*****//*****//*****//*****//*****//*****//*****
////////////// High Environment ////////////////
//*****//*****//*****//*****//*****//*****//*****

 // round 1 //
 // at round 1 - rod fixing occurs at 3, 7, 11 //
 // [fish, fish, rod, fish, fish, fish, fish, rod, fish, fish, fish, fish, rod, fish, fish] //
 // [ 0,    1,     2,   3,    4,    5,    6,   7,    8,    9,    10,  11,   12,  13,    14 ] //
 // i = 2, 7, 12
var p = 0;
var r_12 = 0;
  for(var i=0; i<n_blocks; i++){
    if (rod_series_1.includes(r_12)){
        // do rod
        r_12 = r_12 + 1;
        var show_direction_h = {
            type: 'call-function',
            func: function(){
                $('#direction')[0].style.display = 'block';
            },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
        }
        timeline.push(show_direction_h);
        var n_fix = 5;
        var rod_fixing_first_h = {
            type: 'rod-fixing',
            stimulus: gorilla.stimuliURL('cross.png'),
            choices: [39, 39],
            background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            on_finish: function(data){
              jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "rod_fixing", function_id: "rod_fixing_first_h",
                                            rod_fixing_checked: quality_check});
                if (data.key_press == 39){
                    s = s + 1;
                    return s;
                } else {
                    n_fix = n_fix + 1;
                    return n_fix;
                }
            }
        };
        timeline.push(rod_fixing_first_h);
        var fix_node_h = {
            timeline: [rod_fixing_first_h],
            loop_function: function(data){
                if(s < n_fix){
                  quality_check = "1";
                    return true;
                } else {
                  quality_check = "0";
                    return false;
                }
            }
        }
        var rt_check_h = {
            timeline: [fix_node_h],
            conditional_function: function(){
                var data = jsPsych.data.get().last(1).values()[0];
                if(data.rt > rod_checker_t){
                  quality_check = "0";
                    return false;
                } else {
                  quality_check = "1";
                    return true;
                }
            }
        }
        timeline.push(rt_check_h);
        var switch_to_regular_style_1 = {
            type: 'call-function',
            func: function(){
                $('#direction').hide();
                s = 0;
                n_fix = 5;
            },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
        }
        timeline.push(switch_to_regular_style_1);
    } else {
        // do fish
        r_12 = r_12 + 1;
          var show_price_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-score')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          timeline.push(show_price_h);
          var show_message_h = {
              type: 'call-function',
              func: function(){
                  $('#message-h')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          timeline.push(show_message_h);
          var timer_start_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-correct-count')[0].innerHTML = randP_1[p];
                  price_recorded = randP_1[p];
                  p = p + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          var audio_h = {
              type: 'call-function',
              func: function(){
                  var audio = gorilla.stimuliURL("ding.wav");
                  var AU = new Audio(audio);
                  AU.play();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          var counter_time = 0;
          var fishing_h = {
              type: 'fishing-looping',
              stimulus: gorilla.stimuliURL('fish.png'),
              choices: [40, 40],
              key_answer: 40,
              show_stim_with_feedback: true,
              fished_feedback: gorilla.stimuliURL('fished.png'),
              background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              trial_duration: rem_21[counter_time],
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "12", task: "fishing", function_id: "fishing_h",
                                            rod_fixing_checked: ""});
                }
          }
          var loop_node_h = {
              data:{block: i},
              timeline: [fishing_h],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_12.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      return false;
                  }
              }
          }
          timeline.push(timer_start_h, audio_h, loop_node_h);
          var switch_to_regular_style_0 = {
              type: 'call-function',
              func: function(){
                  $('#srt-score').hide();
                  $('#message-h').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "12", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          timeline.push(switch_to_regular_style_0);
    } // bracket for else clause
} // bracket for loop

// self-timed break between two rounds //
  var break_3 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 28px;"> Ready whenever you are! </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>'
  }
  timeline.push(break_3);

// round 2 //
// at round 2 - rod fixing occurs at 4, 8, 11 //
// [fish, fish, fish, rod, fish, fish, fish, fish, rod, fish, fish, fish, rod, fish, fish] //
// [ 0,    1,     2,   3,    4,    5,    6,   7,    8,    9,    10,  11,   12,  13,   14 ] //
// i = 3, 8, 12
 var rod_series_2 = [3, 8, 12];
 var m = 0; // reset m; 
 var r_22 = 0; // round 2 first instance
 // randP_2 randomized price array
   for(var i=0; i<n_blocks; i++){
    if (rod_series_2.includes(r_22)){
        // do rod
        r_22 = r_22 + 1;
        var show_direction_h = {
            type: 'call-function',
            func: function(){
                $('#direction')[0].style.display = 'block';
            },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
        }
        timeline.push(show_direction_h);
        var n_fix = 5;
        var rod_fixing_first_h = {
            type: 'rod-fixing',
            stimulus: gorilla.stimuliURL('cross.png'),
            choices: [39, 39],
            background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            on_finish: function(data){
              jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "rod_fixing", function_id: "rod_fixing_first_h",
                                            rod_fixing_checked: quality_check});
                if (data.key_press == 39){
                    s = s + 1;
                    return s;
                } else {
                    n_fix = n_fix + 1;
                    return n_fix;
                }
            }
        };
        timeline.push(rod_fixing_first_h);
        var fix_node_h = {
            timeline: [rod_fixing_first_h],
            loop_function: function(data){
                if(s < n_fix){
                  quality_check = "1";
                    return true;
                } else {
                    return false;
                }
            }
        }
        var rt_check_h = {
            timeline: [fix_node_h],
            conditional_function: function(){
                var data = jsPsych.data.get().last(1).values()[0];
                if(data.rt > rod_checker_t){
                  quality_check = "0";
                    return false;
                } else {
                  quality_check = "1";
                    return true;
                }
            }
        }
        timeline.push(rt_check_h);
        var switch_to_regular_style_1 = {
            type: 'call-function',
            func: function(){
                $('#direction').hide();
                s = 0;
                n_fix = 5;
            },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
        }
        timeline.push(switch_to_regular_style_1);
    } else {
        // do fish
        r_22 = r_22 + 1;
          var show_price_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-score')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          timeline.push(show_price_h);
          var show_message_h = {
              type: 'call-function',
              func: function(){
                  $('#message-h')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          timeline.push(show_message_h);
          var timer_start_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-correct-count')[0].innerHTML = randP_2[m];
                  price_recorded = randP_2[m];
                  m = m + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          var audio_h = {
              type: 'call-function',
              func: function(){
                  var audio = gorilla.stimuliURL("ding.wav");
                  var AU = new Audio(audio);
                  AU.play();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          var counter_time = 0;
          var fishing_h = {
              type: 'fishing-looping',
              stimulus: gorilla.stimuliURL('fish.png'),
              choices: [40, 40],
              key_answer: 40,
              show_stim_with_feedback: true,
              fished_feedback: gorilla.stimuliURL('fished.png'),
              background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              trial_duration: rem_22[counter_time],
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "22", task: "fishing", function_id: "fishing_h",
                                            rod_fixing_checked: ""});
                }
          }
          var loop_node_h = {
              data:{block: i},
              timeline: [fishing_h],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_22.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      return false;
                  }
              }
          }
          timeline.push(timer_start_h, audio_h, loop_node_h);
          var switch_to_regular_style_0 = {
              type: 'call-function',
              func: function(){
                  $('#srt-score').hide();
                  $('#message-h').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({order: "low-high", environment: "high", price_displayed: "", 
                                            round_instance: "22", task: "", function_id: "caller",
                                            rod_fixing_checked: ""});
                }
          }
          timeline.push(switch_to_regular_style_0);
    } // bracket for else clause
} // bracket for loop
  
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