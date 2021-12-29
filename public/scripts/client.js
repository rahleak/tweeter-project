/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    let tweetArr = [];
    for (const tweet of tweets) {   
      tweetArr.push(createTweetElement(tweet));   
    }
    tweetArr = tweetArr.reverse().join('')
    $('.render').empty().append(tweetArr)
  }

  const createTweetElement = function (tweetObj) {

    let $tweet = `<div class="hvr">
                    <header>
                      <span>
                        <img src="${tweetObj["user"]["avatars"]}" alt="avatar pic">
                        ${tweetObj["user"]["name"]}
                      </span> 
                        ${tweetObj["user"]["handle"]}
                    </header>
                    <span class="pasttweets">
                      ${tweetObj["content"]["text"]}
                    </span>
                    <footer>
                      ${timeago.format(tweetObj["created_at"])}
                      <span class="icon">
                        <i class="fas fa-flag fl"></i>
                        <i class="fas fa-retweet rt"></i>
                        <i class="fas fa-heart hrt"></i>
                      </span>
                    </footer>
                  </div>`

    return $tweet;

  };

  const loadTweets = function () {

    $.getJSON('http://localhost:8080/tweets', function (data) {
      renderTweets(data)
    });
  }

  loadTweets();

  $("#submitform").validate({
    rules: {
      text: {
        required: true,
        minlength: 1,
        maxlength: 140
      }
    },
    messages: {
      tweet: {
        required: "Please provide a tweet",
        minlength: "Your tweet must be at least 1 characters long",
        maxlength: "Your tweet must be under 140 characters!"
      },
    },
    errorPlacement: function (error, element) {
      if (element.is(":radio")) {
        error.appendTo(element.parents('#submitform'));
      }
      else { // This is the default behavior
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(form).serialize(),
        success: function (result) {
          $('#submitform').each(function () {
            this.reset();
            $('.counter').text(140);
          });
          loadTweets();
          console.log("The post was done successfully");
        },
        error: function (err) {
          console.log("There was an error posting to the Database", err);
        }
      });
      return false;
    }
  });

});