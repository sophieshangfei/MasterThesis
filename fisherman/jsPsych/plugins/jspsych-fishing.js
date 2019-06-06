jsPsych.plugins['fishing2'] = (function(){
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
        show_stim_with_feedback: {
          type: jsPsych.plugins.parameterType.BOOL,
          default: true,
          no_function: false,
          description: ''
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
		
		// // set background and price // //
		var backgroundImage = trial.background;
		var backgroundRepeat = trial.background_spec_repeat;
		var backgroundPosition = trial.background_spec_position;
		var price = trial.price;
		// //--------Set up Canvas begin-------// //
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
	  	// display_element.appendChild(canvas);
	  	var body = document.getElementsByClassName("jspsych-display-element")[0];
	  	body.style.backgroundImage = backgroundImage;
	  	body.style.backgroundRepeat = backgroundRepeat;
	  	body.style.backgroundPosition = backgroundPosition;

	  	// //Set the canvas background color // //
	  	canvas.style.backgroundImage = backgroundImage;
 	  	canvas.style.backgroundRepeat = backgroundRepeat;
 	 	canvas.style.backgroundPosition = backgroundPosition;
		// //--------Set up Canvas end------- // //

		// add stimulus
		var new_html = '<img style="position:absolute; top:380px; left:765px;" src="'+trial.stimulus+'" id="jspsych-fishing"></img>';
		// add prompt
		if(trial.prompt !== null){
			new_html += trial.prompt;
		}
		// add price
		new_html += trial.price;

		// display all info
		display_element.innerHTML = new_html;

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
        	"stimulus": trial.stimulus,
        	"key_press": info.key
     	 	};

      		display_element.innerHTML = '';

      		doFeedback(correct);
      	}

    	jsPsych.pluginAPI.getKeyboardResponse({
      		callback_function: after_response,
      		valid_responses: trial.choices,
      		rt_method: 'performance',
      		persist: false,
      		allow_held_key: false
      	});

    function doFeedback(correct) {
      if (trial.show_stim_with_feedback && correct){
      	display_element.innerHTML = '<img id="jspsych-fishing" class="jspsych-fishing" src="'+trial.fished_feedback+'"></img>';
        }
      }

    function endTrial() {
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    }

};

	return plugin;
})();