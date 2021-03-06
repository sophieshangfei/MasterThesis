jsPsych.plugins["image-keyboard-response-practice"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-keyboard-response-practice', 'stimulus', 'image');

  plugin.info = {
    name: 'image-keyboard-response-practice',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
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
	  image_size: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'image size',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
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
	  body.style.backgroundSize = "900px 650px";
	  body.style.backgroundColor = "black";

      // //Set the canvas background color
      canvas.style.backgroundImage = backgroundImage;
      canvas.style.backgroundRepeat = backgroundRepeat;
      canvas.style.backgroundPosition = backgroundPosition;
	  canvas.style.backgroundSize = "900px 650px";
	  canvas.style.backgroundColor = "black";
      //--------Set up Canvas end-------
	  
	  var new_html;
	  new_html = '<img id="jspsych-image-keyboard-response-practice-stimulus" style= "position: absolute; top: 55%; left: 66%; transform: translate(-55%, -66%); height: 90px; width: 90px" class="jspsych-image-keyboard-response-practice" src="'+trial.stimulus+'"></img>';
    
	// add prompt
    if (trial.prompt !== null){
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;

    // store response
    var response = {
      rt: null,
      key: null
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
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

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

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-image-keyboard-response-practice-stimulus').style.visibility = 'hidden';
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
