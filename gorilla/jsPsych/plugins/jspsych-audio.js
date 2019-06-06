jsPsych.plugins['audio'] = (function() {

var plugin = {};

  plugin.info = {
    name: 'audio',
    description: '',
    parameters: {
      audio: {
        type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'Audio file',
        default: undefined,
        description: 'audio file to be played when price changes'
      }
  }
} 
plugin.trial = function(display_element, trial) {

	var audio = trial.audio;
	var AU = new Audio(audio);
	AU.play();
	
};

return plugin;
	
})();