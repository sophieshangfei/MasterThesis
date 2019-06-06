jsPsych.plugins['max_keyboard'] = (function(){

  var plugin = {};
  
  plugin.info = {
      name: 'max-keyboard',
      description: '',
      parameters: {
        key_answer: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Key answer',
          default: undefined,
          description: 'The key to indicate the correct response.'
        },
        choices: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          array: true,
          pretty_name: 'Choices',
          default: jsPsych.ALL_KEYS,
          description: 'The keys the subject is allowed to press to respond to the stimulus.'
        },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed below the stimulus.'
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
          default: 100,
          description: 'How long to show feedback.'
        },
        force_correct_button_press: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Force correct button press',
          default: false,
          description: 'If set to true, then the subject must press the correct response key after feedback in order to advance to next trial.'
        },
        show_feedback_on_timeout: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Show feedback on timeout',
          default: false,
          description: 'If true, stimulus will be shown during feedback. If false, only the text feedback will be displayed during feedback.'
        },
        background: {
            type: jsPsych.plugins.parameterType.IMAGE,
            pretty_name: 'background image',
            default: undefined,
            description: 'The images to be displayed.'
          },
          background_spec_repeat: {
            type: jsPsych.plugins.parameterType.IMAGE,
            pretty_name: 'background image specification',
            default: undefined,
            description: 'The images to be displayed.'
          },
          background_spec_position: {
            type: jsPsych.plugins.parameterType.IMAGE,
            pretty_name: 'background image specification',
            default: undefined,
            description: 'The images to be displayed.'
          }
    }
  }

  plugin.trial = function(display_element, trial) {
	  
	  display_element.innerHTML = '';
	  console.log(trial.trial_duration);
	  
      // // set background
      var backgroundImage = trial.background;
      var backgroundRepeat = trial.background_spec_repeat;
	  var backgroundPosition = trial.background_spec_position;
      // //--------Set up Canvas begin-------
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      // display_element.appendChild(canvas);
      var body = document.getElementsByClassName("jspsych-display-element")[0];
      body.style.backgroundImage = backgroundImage;
      body.style.backgroundRepeat = backgroundRepeat;
	  body.style.backgroundPosition = backgroundPosition;
	  body.style.backgroundColor = "black";
	 // //Set the canvas background image
      canvas.style.backgroundImage = backgroundImage;
      canvas.style.backgroundRepeat = backgroundRepeat;
	  canvas.style.backgroundPosition = backgroundPosition;
	  body.style.backgroundSize = "700px 500px";
	  canvas.style.backgroundSize = "700px 500px";
	  canvas.style.backgroundColor = "black";
      //--------Set up Canvas end-------
	  	  
      var trial_data = {};

      // create response function
      var after_response = function(info) {

        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();

        // clear keyboard listener
        jsPsych.pluginAPI.cancelAllKeyboardResponses();

        var correct = false;
        if (trial.key_answer == info.key) {
          correct = true;
        }

        // save data
        trial_data = {
          "rt": info.rt,
          "correct": correct,
          "stimulus": trial.stimulus,
          "key_press": info.key
        };

        

        doFeedback(correct);
      }
	  
      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });

      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          after_response({
            key: null,
            rt: null
          });
        }, trial.trial_duration);
      }
	  
	  //console.log(tap);

      function doFeedback(correct) {

			//   		if (correct) {
			//   			tap = tap + 1;
			//   			console.log (tap);
			//   			display_element.innerHTML = '<p id="jspsych-max-keyboard">' + tap + '</p>'
			// console.log("kay");
			//   		}


        if (trial.force_correct_button_press && correct === false && ((timeout && trial.show_feedback_on_timeout) || !timeout)) {
          	var after_forced_response = function(info) {
            	  endTrial();
          	}

          	jsPsych.pluginAPI.getKeyboardResponse({
            	  callback_function: after_forced_response,
            	  valid_responses: [trial.key_answer],
            	  rt_method: 'performance',
            	  persist: false,
            	  allow_held_key: false
          	});
  		} else {
          	jsPsych.pluginAPI.setTimeout(function() {
            	  endTrial();
          	}, trial.feedback_duration);
        	}
      }
    
  	function endTrial() {
        //display_element.innerHTML = '';
        jsPsych.finishTrial(trial_data);
      }

    };

    return plugin;
})();