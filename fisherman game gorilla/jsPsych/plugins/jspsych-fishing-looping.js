jsPsych.plugins['fishing-looping'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'fishing-looping',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image content to be displayed.'
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
        array: true,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
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
      force_correct_button_press: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Force correct button press',
        default: false,
        description: 'If set to true, then the subject must press the correct response key after feedback in order to advance to next trial.'
      },
      show_stim_with_feedback: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: true,
        no_function: false,
        description: ''
      },
      show_feedback_on_timeout: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Show feedback on timeout',
        default: false,
        description: 'If true, stimulus will be shown during feedback. If false, only the text feedback will be displayed during feedback.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial'
      },
      feedback_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback duration',
        default: 100,
        description: 'How long to show feedback.'
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
    // // set background and price
    var backgroundImage = trial.background;
    var backgroundRepeat = trial.background_spec_repeat;
    var backgroundPosition = trial.background_spec_position;
    // //--------Set up Canvas begin-------
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    //display_element.appendChild(canvas);
    var body = document.getElementsByClassName("jspsych-display-element")[0];
    body.style.backgroundImage = backgroundImage;
    body.style.backgroundRepeat = backgroundRepeat;
    body.style.backgroundPosition = backgroundPosition;
	body.style.backgroundSize = "1100px 800px";
	body.style.backgroundColor = "black";

    // //Set the canvas background color
    canvas.style.backgroundImage = backgroundImage;
    canvas.style.backgroundRepeat = backgroundRepeat;
    canvas.style.backgroundPosition = backgroundPosition;
	canvas.style.backgroundSize = "1100px 800px";
	canvas.style.backgroundColor = "black";
    //--------Set up Canvas end-------
    
	//display_element.innerHTML = '<img id="jspsych-fishing-looping" style= "position: relative; top: 55%; left: 86%; transform: translate(-55%, -86%); height: 90px; width: 90px" class="jspsych-fishing-looping" src="'+trial.stimulus+'"></img>';
	console.log(trial.trial_duration);
	// start recording the time
	var startTime = (new Date()).getTime();
	
	display_element.innerHTML = '<img id="jspsych-fishing-looping" style= "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 120px; width: 120px" class="jspsych-fishing-looping" src="'+trial.stimulus+'"></img>';
	// style= "position: absolute; top: 350px; right: 450px; height: 225; width: 300"
	// top: 55%; left: 63%; transform: translate(-55%, -63%);
    
	// if prompt is set, show prompt
    if (trial.prompt !== null) {
      display_element.innerHTML += trial.prompt;
    }
	
	// response data
	var response = {
		end_time: null,
		start_time: null
	}
	
	// save data
    var trial_data = {};

    // create response function
    var after_response = function(info) {
		
		// measure RT
    	var endTime;
		response.end_time = endTime;
		response.start_time = startTime;
    	var response_time;
		
        // only record the responded trial
        if (info.key == null) {
          	endTime = null;
			response_time = null;
        } else {
        	endTime = (new Date()).getTime();
			response_time = endTime - startTime;
        }

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
       		"rt": response_time,
			"rt_builtin": info.rt,
			"end_time": endTime,
        	"correct": correct,
        	"stimulus": trial.stimulus,
        	"key_press": info.key,
			"start_time": startTime
      };

      	display_element.innerHTML = '';
      
	  	var timeout = info.rt == null;
      	doFeedback(correct, timeout);
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
          rt: null,
		  end_time: null,
		  key_press: null
        });
      }, trial.trial_duration);
    }



    function doFeedback(correct, timeout) {
        if (timeout && !trial.show_feedback_on_timeout) {
          display_element.innerHTML = "";
        } else {
			if (trial.show_stim_with_feedback) {
          display_element.innerHTML = '<img id="jspsych-fishing-looping" style= "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 90px; width: 90px" class="jspsych-fishing-looping" src="'+trial.fished_feedback+'"></img>';
        }
	}

      if (trial.force_correct_button_press && correct === false && ((timeout && trial.show_feedback_on_timeout) || !timeout)) {
        	var after_forced_response = function(info) {
          	  endTrial();
        	}

        	jsPsych.pluginAPI.getKeyboardResponse({
          	  callback_function: after_forced_response,
          	  valid_responses: [trial.key_answer],
          	  rt_method: 'date',
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
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    }

  };

  return plugin;
})();

