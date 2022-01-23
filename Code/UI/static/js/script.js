// English      en
// Hindi        hi
// Gujarati	    gu
// Kannada	    kn
// Marathi	    mr
// Malayalam	ml
// Punjabi	    pa
// Odia     	or
// Sindhi   	sd
// Tamil	    ta
// Telugu  	    te

//---------------------- lang selection-----------------------
var lang = "en" //global language variable

function enClicked(){
	lang = "en"
	languageSelector("English");
}

function hiClicked(){
	lang = "hi"
	languageSelector("Hindi");	
}

function languageSelector(lang_name){
	console.log("language: "+lang_name);

	document.getElementById("en_btn").disabled = true;
	document.getElementById("en_btn").style.cursor = "not-allowed";
	document.getElementById("en_btn").style.backgroundColor = "grey";
	document.getElementById("hi_btn").disabled = true;
	document.getElementById("hi_btn").style.cursor = "not-allowed";
	document.getElementById("hi_btn").style.backgroundColor = "grey";

	var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + lang_name + ' language selected' + '</p><div class="clearfix"></div>';
	$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
}
//------------------------------on input/text enter---------------------------------------------------
$('.usrInput').on('keyup keypress', function (e) {
	var keyCode = e.keyCode || e.which;
	var text = $(".usrInput").val();
	if (keyCode === 13) {
		if (text == "" || $.trim(text) == '') {
			e.preventDefault();
			return false;
		} else {
			$(".usrInput").blur();
			setUserResponse(text);
			send(text);
			e.preventDefault();
			return false;
		}
	}
});


//------------------------------------- Set user response------------------------------------
function setUserResponse(val) {

	var UserResponse = '<img class="userAvatar" src=' + "./static/img/userAvatar.jpg" + '><p class="userMsg">' + val + ' </p><div class="clearfix"></div>';
	$(UserResponse).appendTo('.chats').show('slow');
	$(".usrInput").val('');
	scrollToBottomOfResults();
	// $('.suggestions').remove();
}

//---------------------------------- Scroll to the bottom of the chats-------------------------------
function scrollToBottomOfResults() {
	var terminalResultsDiv = document.getElementById('chats');
	terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

function send(message) {
	console.log("User Message:", message)

	if(lang == "en"){
		//------- rasa EN bot is hosted on 5007 port
		//------- CLI query --> rasa run -m models --enable-api --cors "*" --debug --port 5007
		$.ajax({
			url: 'http://localhost:5007/webhooks/rest/webhook',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				"message": message,
				"sender": "Me"
			}),
			success: function (data, textStatus) {
				if(data != null){
						setBotResponse(data);
				}
				console.log("Rasa Response: ", data, "\n Status:", textStatus)
			},
			error: function (errorMessage) {
				setBotResponse("");
				console.log('Error' + errorMessage);

			}
		});
	} 
	// lang = other than en
	else { 

		var gapi_url = "https://script.google.com/macros/s/AKfycbzmyDBI1VUMR-WgpHMn7JY1qoW2nnpf8ek_bGxYfIhZwBzEunM/exec?callback=first&source=";          // en&target=gu&q=";
	    var source = lang;
	    var target = "en"
	    var text = message;
	    gapi_url = gapi_url + source + "&target=" + target + "&q=" + encodeURIComponent(text);

	    var request = jQuery.ajax({
	      crossDomain: true,
	      url: gapi_url,
	      method: "GET",
	      dataType: "jsonp"
	    });
	    // console.log(request);
	}

}

function first(e) {
	console.log("by user-first source text - "+e.sourceText)
    console.log("by user-first translated text - "+e.translatedText)

    $.ajax({
		url: 'http://localhost:5007/webhooks/rest/webhook',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			"message": e.translatedText,
			"sender": "Me"
		}),
		success: function (data, textStatus) {
			if(data != null){
					setBotResponse(data);
			}
			console.log("Rasa Response: ", data, "\n Status:", textStatus)
		},
		error: function (errorMessage) {
			setBotResponse("");
			console.log('Error' + errorMessage);

		}
	});
}

//------------------------------------ Set bot response -------------------------------------
function setBotResponse(val) {
	if(lang == "en"){
		setTimeout(function () {
			if (val.length < 1) {
				//if there is no response from Rasa
				msg = 'I cannot connect to server! Please try again!';

				var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + msg + '</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('.chats').hide().fadeIn(1000);

			} else {
				//if we get response from Rasa
				for (i = 0; i < val.length; i++) {
					//check if there is text message
					if (val[i].hasOwnProperty("text")) {
						var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + val[i].text + '</p><div class="clearfix"></div>';
						$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
					}

					if (val[i].hasOwnProperty("attachment")) {

						var data = val[i].attachment;

						for (var j = 0; j < data["totalResults"]; j++) {
							var BotResponse = '<p class="botMsg">' +  '<img class="imgcard" src="' + data["articles"][j]["urlToImage"] + '"><br>' + '<a href=' + data["articles"][j]["url"] + ' target="_blank" >' + data["articles"][j]["title"] + '</a></p>' + '<div class="clearfix">'
							$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
						}
					}
				}
				scrollToBottomOfResults();
			}

		}, 500);
	}

	else{

		// setTimeout(function () {
		if (val.length < 1) {
			//if there is no response from Rasa
			msg = 'I cannot connect to server! Please try again!';

			var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + msg + '</p><div class="clearfix"></div>';
			$(BotResponse).appendTo('.chats').hide().fadeIn(1000);

		} else {
			//if we get response from Rasa

			// check for news
				//check if there is attachment news message

			if (val[0].hasOwnProperty("attachment")) {

				var data = val[0].attachment;

				for (var j = 0; j < data["totalResults"]; j++) {
					var BotResponse = '<p class="botMsg">' +  '<img class="imgcard" src="' + data["articles"][j]["urlToImage"] + '"><br>' + '<a href=' + data["articles"][j]["url"] + ' target="_blank" >' + data["articles"][j]["title"] + '</a></p>' + '<div class="clearfix">'
					$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
				}
				scrollToBottomOfResults();
			}
			else{
				var gapi_url = "https://script.google.com/macros/s/AKfycbzmyDBI1VUMR-WgpHMn7JY1qoW2nnpf8ek_bGxYfIhZwBzEunM/exec?callback=second&source=";
			    var source = "en";
			    var target = lang;
			    var text = val[0].text;
			    gapi_url = gapi_url + source + "&target=" + target + "&q=" + encodeURIComponent(text);

			    var request = jQuery.ajax({
			      crossDomain: true,
			      url: gapi_url,
			      method: "GET",
			      dataType: "jsonp"
			    });
			}
			
		}
	}
}


function second(e) {
	console.log("by bot-second source text - "+e.sourceText)
    console.log("by bot-second translated text - "+e.translatedText)

	var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + e.translatedText + '</p><div class="clearfix"></div>';
	$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
	scrollToBottomOfResults();
}


// ------------------------------------------ Toggle chatbot -----------------------------------------------
$('#profile_div').click(function () {
	$('.profile_div').toggle();
	$('.widget').toggle();
	scrollToBottomOfResults();
});

$('#close').click(function () {
	$('.profile_div').toggle();
	$('.widget').toggle();
});


// ------------------------------------------ Speech Recognition -----------------------------------------------
function runSpeechRecognition() {
	// get output div reference
    var output = document.getElementById("keypad");
	// get action element reference
	var micbtn = document.getElementById("mic");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    /// or use next line instead of above two
    // var recognition = new webkitSpeechRecognition();

	// recognition.continuous = true;
	// recognition.interimResults = true;
	if(lang == "en"){
		recognition.lang = "en";
	} 
	else if(lang == "hi"){
		recognition.lang = "hi";
	}
	
            
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        console.log("listening, please speak...");
        micbtn.style.backgroundColor = "rgb(96,114,230)";
    };
                
    recognition.onspeechend = function() {
        console.log("stopped listening, hope you are done...");
        recognition.stop();
        micbtn.style.backgroundColor = "transparent";
    }
              
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        output.value = transcript;
    };
              
    // start recognition
    recognition.start();
}
