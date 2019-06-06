
jsPsych.plugins['fishings'] = (function(){

  var plugin = {};

  plugin.info = {
      name: 'fishings',
      description: '',
      parameters: {
        stimulus: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Stimulus',
          default: undefined,
		  array: true,
          description: 'The images to be displayed'
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
        },
        choices: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          array: true,
          pretty_name: 'Choices',
          default: jsPsych.ALL_KEYS,
          description: 'The keys the subject is allowed to press to respond to the stimulus.'
        },
        key_answer: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Key answer',
          default: undefined,
          description: 'The key to indicate the correct response.'
        },
  	  fished_feedback: {
  		type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'feedback',
          default: undefined,
          description: 'The image content to be displayed.'
  	  },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed below the stimulus.'
        },
		stimulus_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Stimulus duration',
          default: null,
          description: 'How long to hide the stimulus.'
        },
        show_stim_with_feedback: {
          type: jsPsych.plugins.parameterType.BOOL,
          default: true,
          no_function: false,
          description: ''
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
        },
		price: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Price of fish to be displayed',
          default: null,
          description: 'Price of fish to be displayed'
		}
    
    }
  }

  plugin.trial = function(display_element, trial) {
	  
	  var new_html = '<img style="position:absolute; top:380px; left:765px;" src="'+trial.stimulus+'" id="jspsych-fishings"></img>';

      // add prompt
      if(trial.prompt !== null){
        new_html += trial.prompt;
      }
	  
	  new_html += trial.price;

      display_element.innerHTML = new_html;

      // store response
      var responses = [];
	  
	  // // set background and price
	  var backgroundImage = trial.background;
	  var backgroundRepeat = trial.background_spec_repeat;
	  var backgroundPosition = trial.background_spec_position;
	  var price = trial.price;
	  // //--------Set up Canvas begin-------
	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");
	  // display_element.appendChild(canvas);
	  var body = document.getElementsByClassName("jspsych-display-element")[0];
	  body.style.backgroundImage = backgroundImage;
	  body.style.backgroundRepeat = backgroundRepeat;
	  body.style.backgroundPosition = backgroundPosition;

	  // //Set the canvas background color
	  canvas.style.backgroundImage = backgroundImage;
 	  canvas.style.backgroundRepeat = backgroundRepeat;
 	  canvas.style.backgroundPosition = backgroundPosition;
		//--------Set up Canvas end-------
		

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

      // function to handle responses by the subject
      var after_response = function(info) {
		  responses.push({
		          key_press: info.key,
		          rt: info.rt
		        });
	
	  var correct;
	  
      if (trial.key_answer == info.key) {
        correct = true;
      }
      
      // var timeout = info.rt == null;
	  doFeedback(correct);
	  

        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector('#jspsych-fishings').className += ' responded';

        
      };
	  
      function doFeedback(correct) {
          if (trial.show_stim_with_feedback) {
  			if (correct) {
  				display_element.innerHTML += '<img style="position:absolute; top:380px; left:765px;" id="jspsych-fishings" class="jspsych-fishings" src="'+trial.fished_feedback+'"></img>';
  			}
        }
      }
	  

      // start the response listener
      if (trial.choices != jsPsych.NO_KEYS) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: 'performance',
          persist: false,
          allow_held_key: false
        });
      }

      // // hide stimulus if stimulus_duration is set
      // // update price based on price duration
      // if (trial.stimulus_duration !== null) {
      //   jsPsych.pluginAPI.setTimeout(function() {
      //     display_element.querySelector('#jspsych-fishings').style.visibility = 'hidden';
      //   }, trial.stimulus_duration);
      // }
      //
      // // end trial if trial_duration is set
      // if (trial.trial_duration !== null) {
      //   jsPsych.pluginAPI.setTimeout(function() {
      //     end_trial();
      //   }, trial.trial_duration);
      // }

    };


	return plugin;

})();