let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;
let questions = quiz.sort(function(){
    return 0.5 - Math.random();
});


let totalQuestion = questions.length;
$(function() {

    let totalTime = 200;
    let min = 0;
    let sec = 0;
    let counter = 0;

    let timer = setInterval(function () {
        counter++;
        min = Math.floor((totalTime - counter) / 60); //calculating min
        sec = totalTime - min * 60 - counter;


        $(".timerBox span").text(min + ":" + sec);
        if(counter == totalTime){

            alert("Times Up! Please press OK to continue.");
            result();
            clearInterval(timer);
        }
        //console.log("min = " + min);
        //console.log("sec = " + sec);
    },1000); //timer set for 1 secons interval
    //timer code end

    //Print Questions
    printQuestion(index);
});

//Function to print Questions start
function printQuestion(i){
    
    $(".questionBox").text(questions[i].question);
    $(".optionBox span").eq(0).text(questions[i].option[0]);
    $(".optionBox span").eq(1).text(questions[i].option[1]);
    $(".optionBox span").eq(2).text(questions[i].option[2]);
    $(".optionBox span").eq(3).text(questions[i].option[3]);
}

//Function Check Answers Start
function checkAnswer(option) {
    attempt++;
    
    let optionClicked = $(option).data("opt");


    if(optionClicked == questions[index].answer){
        $(option).addClass("right");
        score++;
    }
    else{
        $(option).addClass("wrong");
        wrong++;
    }
    $(".scoreBox span").text(score);

    $(".optionBox span").attr("onclick", "");
}
//End

//Button

function showNext(){

    if(index >= (questions.length - 1)){
        showResult(0);
        return;
    }
    index++;
    $(".optionBox span").removeClass();
    $(".optionBox span").attr("onclick","checkAnswer(this)");
    printQuestion(index);

}

//button End


//showResult start
function showResult(j){
    if(
        j == 1 &&
        index < questions.length -1 &&
        !confirm("The test has not yet been finished. Press OK to skip questions and get your result.")
    ){
        return;
    }
    result();
}

//showResult end

// Timer Function

function result(){
    $("#questionScreen").hide();
    $("#resultScreen").show();
    $("#totalQuestions").text(totalQuestion);
    $("#attemptQuestions").text(attempt);
    $("#correctAnswers").text(score);
    $("#wrongAnswers").text(wrong);
}