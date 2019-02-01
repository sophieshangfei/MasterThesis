/**
 * jspsych-call-function
 * plugin for calling an arbitrary function during a jspsych experiment
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins['call-function-fish'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'call-function-fish',
    description: '',
    parameters: {
      func: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Function',
        default: undefined,
        description: 'Function to call'
      },
      async: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Asynchronous',
        default: false,
        description: 'Is the function call asynchronous?'
      },
      post_trial_gap: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'post trial gap',
        default: 3000,
        description: 'Time to delay the next call'
      }
    }
  }

  plugin.trial = function(display_element, trial) {
      // //--------Set up Canvas begin-------
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      //display_element.appendChild(canvas);
      var body = document.getElementsByClassName("jspsych-display-element")[0];
      body.style.backgroundImage = '';
	  body.style.backgroundColor = 'black';

      // //Set the canvas background color
      canvas.style.backgroundImage = '';
	  canvas.style.backgroundColor = 'black';
      //--------Set up Canvas end-------
	  
	display_element.innerHTML = '';
    trial.post_trial_gap = 0;
    var return_val;

    if(trial.async){
      var done = function(data){
        return_val = data;
        end_trial();    
      }
      trial.func(done);
    } else {
      return_val = trial.func();
      end_trial();
    }
    
    function end_trial(){
      var trial_data = {
        value: return_val
      };
  
      jsPsych.finishTrial(trial_data);
    }
  };

  return plugin;
})();