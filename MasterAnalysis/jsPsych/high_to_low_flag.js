import gorilla = require("gorilla/gorilla");

// You don't need the line below (it will just stop the compiler from complaining!)
var jsPsych;
// GORILLA SUPPORT: I don't know why this wasn't working before but putting tap here seems to work now
var tap = 0;
var s = 0; // high // need to reset the global variable to zero every single time rod breaking started. Reset happens after each round of rod fixing
var n = 0; // low
var p = 0; // high environment first round price counter;
var r_11 = 0; // high environment first round first instance indicating tiral order - rod fixing or fishing
var m = 0; // high environment second round price counter;
var r_21 = 0; // high environment second round first instance indicating trial order - rod fixing or fishing
var t = 0; // low environment first round second instance price counter
var r_12 = 0; // low environment second round second instance indicating trial order - rod fixing or fishing
var g = 0; // low environment second round second isntance price counter 
var r_22 = 0; // low environment second round second instance indicating trial order - rod fixing or fishing
var price_recorded = 0; // price being displayed to the screen
var condition; // round: 1/2; instance 1/2;
var quality_check;
var index_trial = 0;

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
    
gorilla.ready(function() {
    
    gorilla.populate('#gorilla', 'exp', {});
    
    var rod_checker_t = 13000;
    
// initialize experiment parameters //
    var block_length = 13000; //13000
    var block_start_time = 0;
    var n_blocks = 12; //12
    var timeline = [];
    var fished_h_1 = [];
    var fished_h_2 = [];
    var fished_l_1 = [];
    var fished_l_2 = [];
    var rod_series_1 = [2, 6, 10];
    var rod_series_2 = [3, 7, 10];
    var index_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

//*****//*****//*****//*****//*****//*****//*****
////////////// High Environment ////////////////
//*****//*****//*****//*****//*****//*****//*****


    var ins_h_1 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;"> You will play both parts of the task one after the other. <br><br><br> Please, tap throughout the task but go as fast or as slow as you want. <br><br><br> Remember: everytime you tap you will catch a fish, <br> but the price you are paid for fish will change. </p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>',
    on_finish: function(data){
        jsPsych.data.addProperties({index: 0, order: "high-low", environment: "high", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
            }
  }
  
  var ins_h_2 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 28px;">This is Part 1 of the task <br><br> In this part you can earn &#163;4 of the possible &#163;5. <br><br> You will be asked to play two rounds of the fisherman game. <br><br> Each round will last approximately 2-3 mins. <br><br><br><br><br> If you collect all &#165;3000 in this part you will be paid &#163;4.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space to continue with instructions.</p>',
      on_finish: function(data){
        jsPsych.data.addProperties({index: 0, order: "high-low", environment: "high", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
            }
  }
  
  var ins_h_3 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 28px;">Please, tap throughout the task but go <br/> as fast or as slow as your want. <br><br> Remember: everytime you tap you will catch a fish, <br> but the value of that fish will change. <br><br> If your rod break press the RIGHT button 8 times to fix it. <br><br> While your rod is broken you are losing time to earn money. </p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space when you are ready to start this round.</p>',
      on_finish: function(data){
        jsPsych.data.addProperties({index: 0, order: "high-low", environment: "high", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
            }
  }
  
    var ins_h_4 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 28px;">In this part - if you collect all &#165;3000 you will be paid &#163;4.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 28px;"> Press space when you are ready to start this round.</p>',
      on_finish: function(data){
        jsPsych.data.addProperties({index: 0, order: "high-low", environment: "high", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
            }
  }
timeline.push(ins_h_1, ins_h_2, ins_h_3, ins_h_4);
      
 // round 1 //
 // at round 1 - rod fixing occurs at 3, 7, 11 //
 // i = 2, 6, 10

 

  for(var i=0; i<n_blocks; i++){
    if (rod_series_1.includes(r_11)){
        // do rod and fishing
        r_11 = r_11 + 1;
        index_trial = index_trial + 1;
        var re_time;
        var show_direction_h = {
            type: 'call-function',
            func: function(){
                $('#direction')[0].style.display = 'block';
                block_start_time = Date.now();
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
                  jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
        timeline.push(show_direction_h, audio_h);
        var n_fix = 8;
        var rod_fixing_first_h = {
            type: 'rod-fixing',
            stimulus: gorilla.stimuliURL('cross.png'),
            choices: [39, 39],
            background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            on_finish: function(data){
                if (data.key_press == 39){
                    s = s + 1;
                    if (data.rt > rod_checker_t){
                        quality_check = "0"
                        jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    } else {
                        quality_check = "1"
                        jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    }
                    return s;
                } else {
                    n_fix = n_fix + 1;
                    jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    return n_fix;
                }
            }
        };
        timeline.push(rod_fixing_first_h);
        var fix_node_h = {
            timeline: [rod_fixing_first_h],
            loop_function: function(data){
                if(s < n_fix){
                    // quality_check= "1";
                    return true;
                } else {
                    return false;
                }
            },
            on_finish: function(data){
                                jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "rod_fixing", function_id: "loop",
                                            rod_fixing_checked: "1"});
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
                n_fix = 8;
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
            }
        }
        timeline.push(switch_to_regular_style_1);
        var show_price_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-score')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_price_h);
          var show_message_h = {
              type: 'call-function',
              func: function(){
                  $('#message-h')[0].style.display = 'block';
              },
              on_finish: function(data){
                   jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: randP_1[p], 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_message_h);
          var rem_111 = [];
          var timer_start_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-correct-count')[0].innerHTML = randP_1[p];
                  price_recorded = randP_1[p];
                  condition = "11";
                  p = p + 1;
                  //var d = new Date();
                  //block_start_time = d.getTime();
                  re_time = block_length - Date.now() + block_start_time
                  //console.log(re_time)
                  rem_111.push(re_time);
                  //console.log("timer start")
                  //console.log(rem_111) 
              },
              on_finish: function(data){
                   jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"})
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
            trial_duration: function(){
                return rem_111[counter_time]
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "11", task: "fishing", function_id: "fishing_h",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_h = {
              data:{block: i},
              timeline: [fishing_h],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_111.push(re_time);
                      counter_time = counter_time + 1;
                      //console.log(counter_time);
                      //console.log(rem_111);
                      return true;
                  } else {
                      fished_h_1.push(counter_time);
                      console.log(fished_h_1);
                      rem_111 = [];
                      counter_time = 0;
                      return false;
                  }
              }
          }
          timeline.push(timer_start_h, audio_h, loop_node_h);
          var switch_to_regular_style_0 = {
              type: 'call-function',
              func: function(){
                  console.log("switch to reg style")
                  console.log(fished_h_1);
                  $('#srt-score').hide();
                  $('#message-h').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(switch_to_regular_style_0);
    } else {
        // do fish
        r_11 = r_11 + 1;
        index_trial = index_trial + 1;
          var show_price_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-score')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_price_h);
          var show_message_h = {
              type: 'call-function',
              func: function(){
                  $('#message-h')[0].style.display = 'block';
              },
              on_finish: function(data){
                   jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_message_h);
          var timer_start_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-correct-count')[0].innerHTML = randP_1[p];
                  price_recorded = randP_1[p];
                  condition = "11";
                  p = p + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                   jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"})
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
                  jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          var rem_11 = [13000];
          var counter_time = 0;
          fishing_h = {
            type: 'fishing-looping',
            stimulus: gorilla.stimuliURL('fish.png'),
            choices: [40, 40],
            key_answer: 40,
            show_stim_with_feedback: true,
            fished_feedback: gorilla.stimuliURL('fished.png'),
            background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            trial_duration: function(){
                return rem_11[counter_time]
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "11", task: "fishing", function_id: "fishing_h",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_h = {
              data:{block: i},
              timeline: [fishing_h],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_11.push(re_time);
                      counter_time = counter_time + 1;
                      //console.log(counter_time);
                      //console.log(rem_11);
                      return true;
                  } else {
                      fished_h_1.push(counter_time);
                      console.log(fished_h_1);
                      rem_11 = [13000];
                      counter_time = 0;
                      return false;
                  }
              }
          }
          timeline.push(timer_start_h, audio_h, loop_node_h);
          var switch_to_regular_style_0 = {
              type: 'call-function',
              func: function(){
                  console.log(fished_h_1);
                  $('#srt-score').hide();
                  $('#message-h').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "11", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(switch_to_regular_style_0);
    } // bracket for else clause
} // bracket for loop

// self-timed break between two rounds //
  var break_1 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">Take a break – continue with the next round of the game when you are not tired. </p>',
      choices: [32],
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with game when you are ready.</p>',
      on_finish: function(data){
          jsPsych.data.addProperties({index: index_list[p], order: "high-low", environment: "high", price_displayed: "null", 
          round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
      }
  }
  timeline.push(break_1);

// round 2 //
// at round 2 - rod fixing occurs at 3, 7, 10 //



// // // randP_2 randomized price array
  for(var i=0; i<n_blocks; i++){
    if (rod_series_2.includes(r_21)){
        // do rod and fish
        r_21 = r_21 + 1;
        index_trial = index_trial + 1;
        var re_time;
        var show_direction_h = {
            type: 'call-function',
            func: function(){
                $('#direction')[0].style.display = 'block';
                block_start_time = Date.now();
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }

        timeline.push(show_direction_h, audio_h);
        var n_fix = 8;
        var rod_fixing_first_h = {
            type: 'rod-fixing',
            stimulus: gorilla.stimuliURL('cross.png'),
            choices: [39, 39],
            background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            on_finish: function(data){
                if (data.key_press == 39){
                    s = s + 1;
                    if (data.rt > rod_checker_t){
                        quality_check = "0"
                        jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    } else {
                        quality_check = "1"
                        jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    }
                    return s;
                } else {
                    n_fix = n_fix + 1;
                    jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    return n_fix;
                }
            }
        };
        timeline.push(rod_fixing_first_h);
        var fix_node_h = {
            timeline: [rod_fixing_first_h],
            loop_function: function(data){
                if(s < n_fix){
                    return true;
                } else {
                    return false;
                }
            },
            on_finish: function(data){
                                jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "rod_fixing", function_id: "loop",
                                            rod_fixing_checked: "1"});
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
                n_fix = 8;
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
            }
        }
        timeline.push(switch_to_regular_style_1);
                  var show_price_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-score')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_price_h);
          var show_message_h = {
              type: 'call-function',
              func: function(){
                  $('#message-h')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_message_h);
          var rem_211 = [];
          var timer_start_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-correct-count')[0].innerHTML = randP_2[m];
                  price_recorded = randP_2[m];
                  condition = "21";
                  m = m + 1;
                  // var d = new Date();
                  // block_start_time = d.getTime();
                  re_time = block_length - Date.now() + block_start_time
                  rem_211.push(re_time)
                  //console.log("timer start")
                  //console.log(rem_211) 
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: randP_2[m], 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
            trial_duration: function(){
                return rem_211[counter_time];
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "21", task: "fishing", function_id: "fishing_h",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_h = {
              data:{block: i},
              timeline: [fishing_h],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      re_time = block_length - Date.now() + block_start_time
                      rem_211.push(re_time);
                      counter_time = counter_time + 1;
                      //console.log(counter_time)
                      return true;
                  } else {
                      fished_h_2.push(counter_time);
                      rem_211 = [];
                      counter_time = 0;
                      return false;
                  }
              }
          }
          timeline.push(timer_start_h, audio_h, loop_node_h);
          var switch_to_regular_style_0 = {
              type: 'call-function',
              func: function(){
                  console.log(fished_h_2);
                  $('#srt-score').hide();
                  $('#message-h').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(switch_to_regular_style_0);
    } else {
        // do fish
        r_21 = r_21 + 1;
        index_trial = index_trial + 1;
          var show_price_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-score')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_price_h);
          var show_message_h = {
              type: 'call-function',
              func: function(){
                  $('#message-h')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(show_message_h);
          var timer_start_h = {
              type: 'call-function',
              func: function(){
                  $('#srt-correct-count')[0].innerHTML = randP_2[m];
                  price_recorded = randP_2[m];
                  condition = "21";
                  m = m + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          var rem_21 = [13000];
          var counter_time = 0;
          fishing_h = {
            type: 'fishing-looping',
            stimulus: gorilla.stimuliURL('fish.png'),
            choices: [40, 40],
            key_answer: 40,
            show_stim_with_feedback: true,
            fished_feedback: gorilla.stimuliURL('fished.png'),
            background: 'url(' + gorilla.stimuliURL('background_b.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            trial_duration: function(){
                return rem_21[counter_time];
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: price_recorded, 
                                            round_instance: "21", task: "fishing", function_id: "fishing_h",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_h = {
              data:{block: i},
              timeline: [fishing_h],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_21.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      fished_h_2.push(counter_time);
                      rem_21 = [13000];
                      counter_time = 0;
                      return false;
                  }
              }
          }
          timeline.push(timer_start_h, audio_h, loop_node_h);
          var switch_to_regular_style_0 = {
              type: 'call-function',
              func: function(){
                  console.log(fished_h_2);
                  $('#srt-score').hide();
                  $('#message-h').hide();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "high", price_displayed: "null", 
                                            round_instance: "21", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
              }
          }
          timeline.push(switch_to_regular_style_0);
    } // bracket for else clause
} // bracket for loop
 
// // self-timed break between two rounds //
  var break_2 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;">Take a break – continue with the next round of the game when you are not tired.</p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with game when you are ready.</p>',
    on_finish: function(data){
        jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "null", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
              }
      
  }
  timeline.push(break_2);


// // //*****//*****//*****//*****//*****//*****//*****
// // ////////////// Low Environment //////////////////
// // //*****//*****//*****//*****//*****//*****//*****
// // // round 1 //
// // // round 1 rod fixing order are rod_series_1 = [2, 7, 12];

  var ins_l_1 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">This is Part 2 of the task <br/> In this part you can earn &#163;0.5 of the possible &#163;5. <br><br> You will be asked to play two rounds of the fisherman game <br> Each round will last approximately 2-3 mins. <br><br><br><br><br> If you collect all &#165;3000 in this part you will be paid &#163;0.5.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with instructions.</p>',
          on_finish: function(data){
        jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "null", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
              }
  }
  
  var ins_l_2 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">Please, tap throughout the task but go <br> as fast or as slow as your want. <br><br> Remember: everytime you tap you will catch a fish, <br> but the value of that fish will change. <br><br> If your rod break press the RIGHT button 8 times to fix it. <br><br> While your rod is broken you are losing time to earn money. </p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space when you are ready to start this round.</p>',
          on_finish: function(data){
        jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "null", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
              }
  }
  
    var ins_l_3 = {
      type: 'html-keyboard-response-fish',
      stimulus: '<p style="color: white; font-size: 30px;">In this part - if you collect all &#165;3000 you will be paid &#163;0.5.</p>',
      choice: [32], 
      prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space when you are ready to start this round.</p>',
          on_finish: function(data){
        jsPsych.data.addProperties({index: index_list[m], order: "high-low", environment: "null", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
              }
  }
timeline.push(ins_l_1, ins_l_2, ins_l_3);
      
  for(var i=0; i<n_blocks; i++){
      if (rod_series_1.includes(r_12)){
          // do rod
          r_12 = r_12 + 1;
          index_trial = index_trial + 1;
          var re_time;
          var show_direction_l = {
              type: 'call-function',
              func: function(){
                  $('#direction-l')[0].style.display = 'inline-block';
                  block_start_time = Date.now()
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_direction_l, audio_l);
          var n_fix = 8;
          var rod_fixing_first_l = {
              type: 'rod-fixing-l',
              stimulus: gorilla.stimuliURL('cross.png'),
              choices: [39, 39],
              background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
              on_finish: function(data){
                if (data.key_press == 39){
                    n = n + 1;
                    if (data.rt > rod_checker_t){
                        quality_check = "0"
                        jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    } else {
                        quality_check = "1"
                        jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    }
                    return n;
                } else {
                    n_fix = n_fix + 1;
                    jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    return n_fix;
                }
            }
        };
          timeline.push(rod_fixing_first_l);
          var fix_node_l = {
              timeline: [rod_fixing_first_l],
              loop_function: function(data){
                  if(n < n_fix){
                      return true;
                  } else {
                      return false;
                  }
              },
            on_finish: function(data){
                                jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "rod_fixing", function_id: "loop",
                                            rod_fixing_checked: "1"});
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
                      quality_check = "1";
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
                  n_fix = 8;
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(switch_to_regular_style_3);
                    var show_price_l = {
              type: 'call-function',
              func: function(){
                  $('#price')[0].style.display = 'block';
              },
      on_finish: function(data){
                            jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_price_l);
          var show_message_l = {
              type: 'call-function',
              func: function(){
                  $('#message-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_message_l);
          var rem_121 = [];
          var timer_start_l = {
              type: 'call-function',
              func: function(){
                  $('#price-correct-count')[0].innerHTML = randP_1[t];
                  price_recorded = randP_1[t];
                  condition = "12";
                  t = t + 1;
                  //var d = new Date();
                  //block_start_time = d.getTime();
                  re_time = block_length - Date.now() + block_start_time
                  rem_121.push(re_time)
                  console.log("timer start")
                  console.log(rem_121) 
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: randP_1[t], 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
            trial_duration: function(){
                return rem_121[counter_time]
                },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: price_recorded, 
                                            round_instance: "12", task: "null", function_id: "fishing_l",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_l = {
              timeline: [fishing_l],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_121.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      fished_l_1.push(counter_time);
                      rem_121 = [];
                      counter_time = 0;
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
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(switch_to_regular_style_2);
      } else {
          // do fish
          r_12 = r_12 + 1;
          index_trial = index_trial + 1;
          var show_price_l = {
              type: 'call-function',
              func: function(){
                  $('#price')[0].style.display = 'block';
              },
      on_finish: function(data){
                            jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_price_l);
          var show_message_l = {
              type: 'call-function',
              func: function(){
                  $('#message-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_message_l);
          var timer_start_l = {
              type: 'call-function',
              func: function(){
                  $('#price-correct-count')[0].innerHTML = randP_1[t];
                  price_recorded = randP_1[t];
                  condition = "12";
                  t = t + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          var counter_time = 0;
          var rem_12 = [13000];
          fishing_l = {
            type: 'fishing-looping',
            stimulus: gorilla.stimuliURL('fish.png'),
            choices: [40, 40],
            key_answer: 40,
            show_stim_with_feedback: true,
            fished_feedback: gorilla.stimuliURL('fished.png'),
            background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            trial_duration: function(){
                return rem_12[counter_time]
                },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: price_recorded, 
                                            round_instance: "12", task: "null", function_id: "fishing_l",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_l = {
              timeline: [fishing_l],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_12.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      fished_l_1.push(counter_time);
                      rem_12 = [13000];
                      counter_time = 0;
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
                  jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "12", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(switch_to_regular_style_2);
      }// bracket for else clause
}// bracket for loop

// self-timed break between two rounds //
  var break_3 = {
    type: 'html-keyboard-response-fish',
    stimulus: '<p style="color: white; font-size: 30px;">Take a break – continue with the next round of the game when you are not tired.</p>',
    choices: [32],
    prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to continue with game when you are ready.</p>',
    on_finish: function(data){
        jsPsych.data.addProperties({index: index_list[t], order: "high-low", environment: "low", price_displayed: "null", 
        round_instance: "null", task: "null", function_id: "instruction", rod_fixing_checked: "null"});
            }
  }
  timeline.push(break_3);

// round 2 //
// round 2 //
// at round 2 - rod fixing occurs at 4, 8, 11 //
// [fish, fish, fish, rod, fish, fish, fish, fish, rod, fish, fish, fish, rod, fish, fish] //
// [ 0,    1,     2,   3,    4,    5,    6,   7,    8,    9,    10,  11,   12,  13,   14 ] //
// i = 3, 7, 10

 // randP_2 randomized price array
  for(var i=0; i<n_blocks; i++){
    if (rod_series_2.includes(r_22)){
        // do rod and fishing
          r_22 = r_22 + 1;
          index_trial = index_trial + 1;
          var re_time;
          var show_direction_l = {
              type: 'call-function',
              func: function(){
                  $('#direction-l')[0].style.display = 'inline-block';
                  block_start_time = Date.now()
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
          jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_direction_l, audio_l);
          var n_fix = 8;
          var rod_fixing_first_l = {
              type: 'rod-fixing-l',
              stimulus: gorilla.stimuliURL('cross.png'),
              choices: [39, 39],
              background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
              background_spec_repeat: 'no-repeat',
              background_spec_position: 'center center',
            on_finish: function(data){
                if (data.key_press == 39){
                    n = n + 1;
                    if (data.rt > rod_checker_t){
                        quality_check = "0"
                        jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    } else {
                        quality_check = "1"
                        jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    }
                    return s;
                } else {
                    n_fix = n_fix + 1;
                    jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "rod_fixing", function_id: "rod_fixing",
                                            rod_fixing_checked: quality_check});
                    return n_fix;
                }
            }
        };
          timeline.push(rod_fixing_first_l);
          var fix_node_l = {
              timeline: [rod_fixing_first_l],
              loop_function: function(data){
                  if(n < n_fix){
                      return true;
                  } else {
                      return false;
                  }
              },
            on_finish: function(data){
                                jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "rod_fixing", function_id: "loop",
                                            rod_fixing_checked: "1"});
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
                      quality_check = "1";
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
                  n_fix = 8;
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(switch_to_regular_style_3);
          var show_price_l = {
              type: 'call-function',
              func: function(){
                  $('#price')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_price_l);
          var show_message_l = {
              type: 'call-function',
              func: function(){
                  $('#message-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_message_l);
          var rem_221 = [];
          var timer_start_l = {
              type: 'call-function',
              func: function(){
                  $('#price-correct-count')[0].innerHTML = randP_2[g];
                  price_recorded = randP_2[g];
                  condition = "22";
                  g = g + 1;
                  //var d = new Date();
                  //block_start_time = d.getTime();
                  re_time = block_length - Date.now() + block_start_time
                  rem_221.push(rem_221)
                  console.log("timer start")
                  console.log(rem_221) 
              },
      on_finish: function(data){
          jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: randP_2[g], 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
            trial_duration: function(){
                return rem_221[counter_time];
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: price_recorded, 
                                            round_instance: "22", task: "fishing", function_id: "fishing_l",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_l = {
              timeline: [fishing_l],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_221.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      fished_l_2.push(counter_time);
                      rem_221 = [];
                      counter_time = 0;
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
          jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(switch_to_regular_style_2);
    } else {
        // do fish
          r_22 = r_22 + 1;
          index_trial = index_trial + 1;
          var show_price_l = {
              type: 'call-function',
              func: function(){
                  $('#price')[0].style.display = 'block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_price_l);
          var show_message_l = {
              type: 'call-function',
              func: function(){
                  $('#message-l')[0].style.display = 'inline-block';
              },
              on_finish: function(data){
                  jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(show_message_l);
          var timer_start_l = {
              type: 'call-function',
              func: function(){
                  $('#price-correct-count')[0].innerHTML = randP_2[g];
                  price_recorded = randP_2[g];
                  condition = "22";
                  g = g + 1;
                  var d = new Date();
                  block_start_time = d.getTime();
              },
      on_finish: function(data){
          jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
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
          jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          var counter_time = 0;
          var rem_22 = [13000];
          fishing_l = {
            type: 'fishing-looping',
            stimulus: gorilla.stimuliURL('fish.png'),
            choices: [40, 40],
            key_answer: 40,
            show_stim_with_feedback: true,
            fished_feedback: gorilla.stimuliURL('fished.png'),
            background: 'url(' + gorilla.stimuliURL('background_w.png') + ')',
            background_spec_repeat: 'no-repeat',
            background_spec_position: 'center center',
            trial_duration: function(){
                return rem_22[counter_time];
            },
            on_finish: function(data){
                jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: price_recorded, 
                                            round_instance: "22", task: "fishing", function_id: "fishing_l",
                                            rod_fixing_checked: "null"});
            }
        }
          var loop_node_l = {
              timeline: [fishing_l],
              loop_function: function(data){
                  if(Date.now() - block_start_time < block_length){
                      var re_time = block_length - Date.now() + block_start_time
                      rem_22.push(re_time);
                      counter_time = counter_time + 1;
                      console.log(counter_time)
                      return true;
                  } else {
                      fished_l_2.push(counter_time);
                      rem_22 = [13000];
                      counter_time = 0;
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
          jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "low", price_displayed: "null", 
                                            round_instance: "22", task: "null", function_id: "caller",
                                            rod_fixing_checked: "null"});
      }
          }
          timeline.push(switch_to_regular_style_2);
    } // bracket for else clause
} // bracket for loop

    // calculate pay //
    var pay = 0;
    var yen = 0;
    var calculator = {
        type: 'call-function',
        func: function(){
            for(var i=0; i< fished_h_1.length; i++) {
                pay += fished_h_1[i]*randP_1[i]*(4/3000);
                pay += fished_h_2[i]*randP_2[i]*(4/3000);
                pay += fished_l_1[i]*randP_1[i]*(0.5/3000);
                pay += fished_l_2[i]*randP_2[i]*(0.5/3000);
                // console.log("high 1 count")
                // console.log(fished_h_1[i])
                // console.log("1 price")
                // console.log(randP_1[i])
                // console.log("high 2 count")
                // console.log(fished_h_2[i])
                // console.log("2 price")
                // console.log(randP_2[i])
                // console.log("low 2 count")
                // console.log(fished_l_2[i])
                // console.log("low 1 count")
                // console.log(fished_l_1[i])
                // console.log(pay)
                yen += fished_h_1[i]*randP_1[i];
                yen += fished_h_2[i]*randP_2[i];
                yen += fished_l_1[i]*randP_1[i];
                yen += fished_l_2[i]*randP_2[i];
            }
            return Math.round( pay * 10 ) / 10;
        },
        on_finish: function(data){
            jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "end", price_displayed: "null", 
            round_instance: "null", task: "calculator", function_id: "caller", rod_fixing_checked: "null"});
        }
    }
    
    var show_feedback = {
    type: 'call-function-fish',
    func: function(){
        $('#pro-feedback')[0].style.display = 'block';
        $('#feedback-yen')[0].innerHTML = Math.ceil(Math.round( yen * 10 ) / 10);
        $('#feedback-pound')[0].innerHTML = Math.ceil(Math.round( pay * 10 ) / 10);
    },
        on_finish: function(data){
            jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "end", price_displayed: "null", 
            round_instance: "null", task: "null", function_id: "caller", rod_fixing_checked: "null"});
        }
}
  var end = {
    type: 'html-keyboard-response-fish',
    choices: [32],
    prompt: '<br><br><br><br><br><br><br><br><p style="color: white; font-size: 30px;"> Press space to proceed! </p>',
        on_finish: function(data){
            jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "end", price_displayed: "null", 
            round_instance: "null", task: "null", function_id: "caller", rod_fixing_checked: "null"});
        }
  }

    var hide_feedback = {
    type: 'call-function-fish',
    func: function(){
        $('#pro-feedback').hide();
    },
        on_finish: function(data){
            jsPsych.data.addProperties({index: index_list[g], order: "high-low", environment: "end", price_displayed: "null", 
            round_instance: "null", task: "null", function_id: "caller", rod_fixing_checked: "null"});
        }
}

timeline.push(calculator, show_feedback, end, hide_feedback);

//   var end = {
//     type: 'html-keyboard-response-fish',
//     stimulus: '<p style="color: white; font-size: 30px;"> <br><br><br><br>You earned X yen over the two rounds </br> you have earned £Y </br> which will be paid via Prolific. </p>',
//     choices: [32],
//     prompt: '<br><br><br><br><p style="color: white; font-size: 30px;"> Press space to proceed! </p>'
//   }


// data collected in scripts:
// order: high-low; low-high
// environment: high; low
// round instsance: 11; 12; 21; 22
// task: rod_fixing; fishing
// function_id: fishing; caller; instruction, etc;
// rod_fixing_checked: 0-yes; 1-discard
// price_displayed
//on_finish: function(data){
//                jsPsych.data.addProperties({order: "", environment: "", price_displayed: "", 
//                                            round: "", task: "", function_id: "",
//                                            rod_fixing_checked: ""});
//            }
// data collected in Metrics:
// reaction_time
// key_press

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
        

