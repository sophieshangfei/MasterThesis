
jsPsych.plugins["serial-reaction-time-mouse"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    var startTime = -1;
    var response = {
      rt: -1,
      row: -1,
      column: -1,
      correct: false
    }

    // display stimulus
    var stimulus = this.stimulus(trial.grid, trial.grid_square_size);
    display_element.innerHTML = stimulus;

		function showTarget(){

      display_element.querySelector('#jspsych-serial-reaction-time-stimulus-cell-'+trial.target[0]+'-'+trial.target[1]).addEventListener('mousedown', function(e){
        if(startTime == -1){
          return;
        } else {
          var info = {}
          info.rt = Date.now() - startTime;
          var node = e.target;
          info.row = parseInt(node.dataset.row);
          info.column = parseInt(node.dataset.column);
          after_response(info);
        }
      });

      startTime = Date.now();

		}

    function endTrial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "cell_clicked": JSON.stringify([response.row, response.column]),
				"correct": response.correct,
				"grid": JSON.stringify(trial.grid),
				"target": JSON.stringify(trial.target)
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);

    };

    // function to handle responses by the subject
    function after_response(info) {

			// only record first response
      response = response.rt == -1 ? info : response;

      if (trial.response_ends_trial) {
        endTrial();
      }
    };

  };


  return plugin;
})();