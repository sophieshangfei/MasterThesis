var fatigue_options = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always']

var fatigue_horizontal_1 = {
      type: 'survey-multi-choice',
      questions: [{prompt: "I have been less alert.", options: fatigue_options, required: true, horizontal: true,}, 
	{prompt: "I have had difficulty paying attention for long periods of time.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have been unable to think clearly.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have been clumsy and uncoordinated.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "Please choose 'Rarely' for this question.", options: fatigue_options, required: true, horizontal: true,}
]
  }

  var fatigue_horizontal_2 = {
      type: 'survey-multi-choice',
      questions: [{prompt: "I have been forgetful.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have had to pace myself in my physical activities.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have been less motivated to do anything that requires physical effort.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have been less motivated to participate in social activities.", options: fatigue_options, required: true, horizontal: true,},
{prompt: " I have been limited in my ability to do things away from home. ", options: fatigue_options, required: true, horizontal: true,}
]  
  }

  var fatigue_horizontal_3 = {
      type: 'survey-multi-choice',
      questions: [
      {prompt: "I have trouble maintaining physical effort for long periods. ", options: fatigue_options, required: true, horizontal: true,},
	{prompt: "I have had difficulty making decisions.", options: fatigue_options, required: true, horizontal: true,},
{prompt: ". I have been less motivated to do anything that requires thinking. ", options: fatigue_options, required: true, horizontal: true,},
{prompt: "My muscles have felt weak.", options: fatigue_options, required: true, horizontal: true,}
]
  }

   var fatigue_horizontal_4 = {
      type: 'survey-multi-choice',
      questions: [
      {prompt: "I have been physically uncomfortable.", options: fatigue_options, required: true, horizontal: true,},
  {prompt: "I have had trouble finishing tasks at require thinking.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have had difficulty organizing my thoughts when doing things at home or at work.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have been less able to complete tasks that require physical effort.", options: fatigue_options, required: true, horizontal: true,}
]
  }


   var fatigue_horizontal_5 = {
      type: 'survey-multi-choice',
      questions: [
      {prompt: "My thinking has been slowed down.", options: fatigue_options, required: true, horizontal: true,},
  {prompt: "I have had trouble concentrating.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have limited my physical activities.", options: fatigue_options, required: true, horizontal: true,},
{prompt: "I have needed to rest more often or for longer periods. ", options: fatigue_options, required: true, horizontal: true,}
]
  }


