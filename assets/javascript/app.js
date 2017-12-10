$('#start').on('click',function(){
	$('#start').remove();
	game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
	game.clicked(e);

})
$(document).on('click','#reset',function(){
	game.reset();
})

var questions = [{
	question: "PJ masks is all about?",
	answers: ["Robots", "Chickens", "Heroes", "Dragons", "Gosts", "Villians"],
	correctAnswer: "Heroes", 
	
}, {

	question: "Who is the leader of PJ Masks whose favorite color is Blue?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Catboy",


}, {

	question: "Who is the female member of PJ Masks whose favorite color is Red?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Owlette",



}, {


	question: "Who is the youngest member of Pj Masks whose favorite color is Green?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Gekko",



}, {


	question: "Who is an Evil Scientist?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Romeo", 


}, {


	question: "Who is an asian dude Ninja?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Night Ninja",


}, {


	question: "Who uses the luna Magnet and controls moths as her sidekicks?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Luna Girl",


}, {


	question: "Who is the fastest and has a Super Cat Speed?",
	answers: ["Catboy", "Owlette", "Gekko", "Romeo", "Luna Girl", "Night Ninja"],
	correctAnswer: "Catboy",


}];

// settingup Properties------


var game = {
	questions:questions,
	currentQuestion:0,
	counter:30,
	correct:0,
	incorrect:0,
	unanswered:0,

//------------------------------Main Function----------------------------
	countdown: function(){
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter<=0){
			console.log("Time UP!");
			game.timeUp();
		}

	},

	loadQuestion: function(){
		//running the countdown function in every 1 second
		timer = setInterval(game.countdown,1000);
		$('#subwrapper').html("<h2>TIME REMAINING: <span id='counter'>30</span> Seconds</h2>");
		$('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
		for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
			$('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
			currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
		}

	},
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();

	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>OUT OF TIME!</h2>');
		$('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
			currentQuestion].correctAnswer+'</h3>');

		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		}
		else {
			setTimeout(game.nextQuestion,3*1000);
		}

	},
	results: function(){
		clearInterval(timer);
		$('#subwrapper').html("<h2>ALL DONE!</h2>");
		$('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
		$('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
		$('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>");
		$('#subwrapper').append("<button id='reset'>RESET</button>");
	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name")==questions[game.currentQuestion].
			correctAnswer){
			game.answeredCorrectly();
		} 
		else {
			game.answeredIncorrectly();
		}

	},
	answeredCorrectly: function(){
		console.log("YOU GOT IT!");
		clearInterval(timer);
		game.correct++;
		$('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		}
		else {
			setTimeout(game.nextQuestion,3*1000);
		}

	},
	answeredIncorrectly: function(){
		console.log("WRONG!");
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
		$('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
			currentQuestion].correctAnswer+'</h3>');	
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		}
		else {
			setTimeout(game.nextQuestion,3*1000);
		}

	},
	reset: function(){
		game.currentQuestion = 0;
		game.counter = 30;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		clearInterval(timer);
		game.loadQuestion();

	}



}

$("#devReset").on("click", function() {
	game.reset();
});



