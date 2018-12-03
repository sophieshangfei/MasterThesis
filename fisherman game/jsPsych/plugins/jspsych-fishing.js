jsPsych.plugins['fishing'] = (function(){

  var plugin = {};

  plugin.info = {
      name: 'fishing',
      description: '',
      parameters: {
        stimulus: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Stimulus',
          default: undefined,
		  array: true,
          description: 'The images to be displayed'
        },
        key_answer: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Key answer',
          default: undefined,
          description: 'The key to indicate the correct response.'
        },
        choices: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Choices',
          default: jsPsych.ALL_KEYS,
          description: 'The keys the subject is allowed to press to respond to the stimulus.'
        },
        fished_feedback: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'fished feedback',
          default: "<p class='feedback'>Incorrect</p>",
          description: 'Image to show when the subject fished'
        },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed below the stimulus.'
        },
        show_stim_with_feedback: {
          type: jsPsych.plugins.parameterType.BOOL,
          default: true,
          no_function: false,
          description: ''
        },
        stimulus_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Stimulus duration',
          default: null,
          description: 'How long to hide the stimulus.'
        },
        trial_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Trial duration',
          default: null,
          description: 'How long to show trial before it ends.'
        },
        feedback_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Feedback duration',
          default: 2000,
          description: 'How long to show feedback.'
        }
    }
  }

  plugin.trial = function(display_element, trial) {
	  
	  display_element.innerHTML = '<img id="jspsych-fishing" class="jspsych-fishing" src="'+trial.stimulus+'"></img>';
      
      // if prompt is set, show prompt
      if (trial.prompt !== null) {
        new_html += trial.prompt;
      }
	  
	  
      // draw
	  display_element.innerHTML = new_html;

      // store response
      var responses = [];
	
 
      // function to handle responses by the subject
      var after_response = function(info) {
		  var correct = false;
		  if (trial.key_answer == info.key) {
			  correct = true;
		  }
		  
		  responses.push({
		          key_press: info.key,
		          rt: info.rt,
			  correct: correct
		        });
				
		display_element.innerHTML = '';
		
		doFeedback(correct);
		
				
        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector('#jspsych-fishing').className += 'responded';
      }
	  
      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
	  
      function doFeedback(correct) {

          // show image during feedback if flag is set
          if (trial.show_stim_with_feedback) {
            display_element.innerHTML = '<img id="jspsych-categorize-image-stimulus" class="jspsych-categorize-image-stimulus" src="'+trial.stimulus+'"></img>';
          }

          // show the feedback
          display_element.innerHTML += atext;
        }
	  
	  
        jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_forced_response,
          valid_responses: [trial.key_answer],
          rt_method: 'performance',
          persist: true,
          allow_held_key: false
        });

      } else {
        jsPsych.pluginAPI.setTimeout(function() {
          endTrial();
        }, trial.feedback_duration);
      }


      // function to end trial when it is time
      var end_trial = function() {

        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();

        // kill keyboard listeners
        if (typeof keyboardListener !== 'undefined') {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
		
		

        // gather the data to store for the trial
        var trial_data = {
          "rt": responses.rt,
          "stimulus": trial.stimulus,
          "responses": JSON.stringify(responses)
        };

        // clear the display
        display_element.innerHTML = '';

        // move on to the next trial
        jsPsych.finishTrial(trial_data);
      };
	  

      // start the response listener
      if (trial.choices != jsPsych.NO_KEYS) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: 'performance',
          persist: true,
          allow_held_key: false
        });
      }
	  
      
      // hide stimulus if stimulus_duration is set
      if (trial.stimulus_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          display_element.querySelector('#jspsych-fishing').style.visibility = 'hidden';
        }, trial.stimulus_duration);
      }

      // end trial if trial_duration is set
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.trial_duration);
      }

    };


	return plugin;

})();