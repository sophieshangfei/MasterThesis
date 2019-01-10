jsPsych.plugins['max_keyboard'] = (function(){

  var plugin = {};

  plugin.info = {
      name: 'max-keyboard',
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
    
    }
  }

  plugin.trial = function(display_element, trial) {

      var new_html = '<img src="'+trial.stimulus+'" id="jspsych-max-keyboard" width="300" height="300"></img>';

      // add prompt
      if(trial.prompt !== null){
        new_html += trial.prompt;
      }

      // draw
      display_element.innerHTML = new_html;

      // store response
      var responses = [];

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
		  

        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector('#jspsych-max-keyboard').className += ' responded';

        
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
          display_element.querySelector('#jspsych-max-keyboard').style.visibility = 'hidden';
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