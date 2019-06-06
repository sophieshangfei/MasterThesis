var pleasure_options = ['Strongly disagree', 'Disagree', 'Agree', 'Strongly agree']

var pleasure_horizontal_1 = {
      type: 'survey-multi-choice',
      questions: [{prompt: "I would enjoy my favourite television or radio programme.", options: pleasure_options, required: true, horizontal: true,}, 
	{prompt: "I would enjoy being with my family or close friends.", options: pleasure_options, required: true, horizontal: true,},
{prompt: "I would find pleasure in my hobbies and pastimes.", options: pleasure_options, required: true, horizontal: true,},
{prompt: "I would be able to enjoy my favourite meal.", options: pleasure_options, required: true, horizontal: true,}
]
  }

  var pleasure_horizontal_2 = {
      type: 'survey-multi-choice',
      questions: [{prompt: "I would enjoy a warm bath or refreshing shower.", options: pleasure_options, required: true, horizontal: true,},
{prompt: "I would find pleasure in the scent of flowers or the smell of a fresh sea breeze or freshly baked bread.", options: pleasure_options, required: true, horizontal: true,},
{prompt: "I would enjoy seeing other people's smiling faces.", options: pleasure_options, required: true, horizontal: true,},
{prompt: "Please select 'Disagree' for this question.", options: pleasure_options, required: true, horizontal: true,}
]  
  }

  var pleasure_horizontal_3 = {
      type: 'survey-multi-choice',
      questions: [
      {prompt: "I would enjoy looking smart when I have made an effort with my apperance.", options: pleasure_options, required: true, horizontal: true,},
	{prompt: "I would enjoy reading a book, magazine or newspaper.", options: pleasure_options, required: true, horizontal: true,},
{prompt: "I would enjoy a cup of tea or coffee or my favourite drink", options: pleasure_options, required: true, horizontal: true,}
]
  }

   var pleasure_horizontal_4 = {
      type: 'survey-multi-choice',
      questions: [
      {prompt: "I would be able to enjoy a beautiful landscape or view.", options: pleasure_options, required: true, horizontal: true, index: 13},
  {prompt: "I would get pleasure from helping others.", options: pleasure_options, required: true, horizontal: true, index: 14},
{prompt: "I would feel pleasure when I receive praise from other people.", options: pleasure_options, required: true, horizontal: true, index: 15}
]
  }