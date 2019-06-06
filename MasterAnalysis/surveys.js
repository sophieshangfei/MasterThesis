var AMI_options = ["Completely UNTRUE", "Mostly untrue", "Neither true nor untrue", "Quite true", "Completely TRUE"];

var AMI_horizontal = {
      type: 'survey-multi-choice',
      questions: [{prompt: "I feel sad or upset when I hear bad news.", options: AMI_options, required: true, horizontal: true,}, 
	{prompt: "I start conversations with random people.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I enjoy doing things with people I have just met.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I suggest activities for me and my friends to do.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I make decisions firmly and without hesitation.", options: AMI_options, required: true, horizontal: true,},
{prompt: "After making a decision, I will wonder if I have made the wrong choice.", options: AMI_options, required: true, horizontal: true,},
{prompt: "Based on the last two weeks, I would say I care deeply about how my loved ones think of me.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I go out with friends on a weekly basis.", options: AMI_options, required: true, horizontal: true,},
{prompt: "When I decide to do something, I am able to make an effort easily.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I don't like to laze around.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I get things done when they need to be done, without requiring reminders from others.", options: AMI_options, required: true, horizontal: true,},
	{prompt: "When I decide to do something, I am motivated to see it through to the end.", options: AMI_options, required: true, horizontal: true,},
	{prompt: "I feel awful if I say something insensitive.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I start conversations without being prompted.", options: AMI_options, required: true, horizontal: true,},
{prompt: "When I have something I need to do, I do it straightaway so it is out of the way.", options: AMI_options, required: true, horizontal: true,},
{prompt: "I feel bad when I hear an acquaintance has an accident or illness.", options: AMI_options, required: true, horizontal: true,},
	{prompt: "I enjoy choosing what to do from a range of activities.", options: AMI_options, required: true, horizontal: true,},
	{prompt: "If I realise I have been unpleasant to someone, I will feel terribly guilty afterwards.", options: AMI_options, required: true, horizontal: true,},
]
  };
  
  var Q1_options = ["Most of the time", "A lot of the time", "From time to time, occasionally", "Not at all"];
  var Q2_options = ["Nearly all the time", "Very often", "Sometimes", "Not at all"];
  var Q3_options = ["Definitely as much", "Not quite so much", "Only a little", "Hardly at all"];
  var Q4_options = ["Not at all", "Occasionally", "Quite Often", "Very Often"];
  var Q5_options = ["Very definitely and quite badly", "Yes, but not too badly", "A little, but it doesn't worry me", "Not at all"];
  var Q6_options = ["Definitely", "I don't take as much care as I should", "I may not take quite as much care", "I take just as much care as ever"];
  var Q7_options = ["As much as I always could", "Not quite so much now", "Definitely not so much now", "Not at all"];
  var Q8_options = ["Very much indeed", "Quite a lot", "Not very much", "Not at all"];
  var Q9_options = ["A great deal of the time", "A lot of the time", "From time to time, but not too often", "Only occasionally"];
  var Q10_options = ["As much as I ever did", "Rather less than I used to", "Definitely less than I used to", "Hardly at all"];
  var Q11_options = ["Not at all", "Not often", "Sometimes", "Most of the time"];
  var Q12_options = ["Very often indeed", "Quite often", "Not very often", "Not at all"];
  var Q13_options = ["Definitely", "Usually", "Not Often", "Not at all"];
  var Q14_options = ["Often", "Sometimes", "Not often", "Very seldom"];
  

  var HADS_horizontal = {
        type: 'survey-multi-choice',
        questions: [{prompt: "I feel tense or 'wound up':", options: Q1_options, required: true, horizontal: true,}, 
  	{prompt: "I feel as if I am slowed down:", options: Q2_options, required: true, horizontal: true,},
  {prompt: "I still enjoy the things I used to enjoy:", options: Q3_options, required: true, horizontal: true,},
  {prompt: "I get a sort of frightened feeling like 'butterflies' in the stomach:", options: Q4_options, required: true, horizontal: true,},
  {prompt: "I get a sort of frightened feeling as if something awful is about to happen:", options: Q5_options, required: true, horizontal: true,},
  {prompt: "I have lost interest in my appearance:", options: Q6_options, required: true, horizontal: true,},
  {prompt: "I can laugh and see the funny side of things:", options: Q7_options, required: true, horizontal: true,},
  {prompt: "I feel restless as I have to be on the move:", options: Q8_options, required: true, horizontal: true,},
  {prompt: "Worrying thoughts go through my mind:", options: Q9_options, required: true, horizontal: true,},
  {prompt: "I look forward with enjoyment to things:", options: Q10_options, required: true, horizontal: true,},
  {prompt: "I feel cheerful:", options: Q11_options, required: true, horizontal: true,},
  	{prompt: "I get sudden feelings of panic:", options: Q12_options, required: true, horizontal: true,},
  	{prompt: "I can sit at ease and feel relaxed:", options: Q13_options, required: true, horizontal: true,},
  {prompt: "I can enjoy a good book or radio or TV program:", options: Q14_options, required: true, horizontal: true,},
  ]
    };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  