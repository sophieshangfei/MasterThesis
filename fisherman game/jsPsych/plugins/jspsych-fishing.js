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
        choices: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Choices',
          default: jsPsych.ALL_KEYS,
          description: 'The keys the subject is allowed to press to respond to the stimulus.'
        },
        fished_answer: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'fished answer',
          default: undefined,
		  array: true,
          description: 'The key to indicate if subjects have fished.'
        },
        fished_feedback: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'fished feedback',
          default: undefined,
		  array: true,
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
        response_ends_trial: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Response ends trial',
          default: true,
          description: 'If true, trial will end when subject makes a response.'
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

      var new_html = '<img src="'+trial.stimulus+'" id="jspsych-fishing"></img>';

      // add prompt
      if(trial.prompt !== null){
        new_html += trial.prompt;
      }

      // draw
      display_element.innerHTML = new_html;

      // store response
      var responses = [];
	  
	  // feedback function
	  var feedback_image;
      function doFeedback(correct) {
		  if (trial.show_stim_with_feedback && correct) {
			  console.log('a')
			  feedback_image += '<img src="'+trial.fished_feedback+'" id="jspsych-fishing"></img>';
			  return feedback_image;
		  }
	  };
	  
	  // feedback
	  var correct = true;
	  if (trial.fished_answer == info.key) {
		  correct = true;
	}
	doFeedback(correct);
	
 
      // function to handle responses by the subject
      var after_response = function(info) {
		  responses.push({
		          key_press: info.key,
		          rt: info.rt
		        });
		display_element.innerHTML = feedback_image
				
        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector('#jspsych-fishing').className += 'responded';
      };
	  
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