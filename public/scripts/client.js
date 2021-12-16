/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const createTweetElement = function (tweetObj) {

    let $tweet = $(`<div class="hvr">
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
        </div>`)

    return $tweet;

  };

  const renderTweets = function(tweets) {
    
    for (const tweet of tweets) {        // loops through tweets
       createTweetElement(tweet);   // calls createTweetElement for each tweet
      $('.container').append(createTweetElement(tweet))
      // takes return value and appends it to the tweets container
    } // ADD HOVER FUNCTION SO THAT EVERYTIME TWEET IS APPENDED, FUNCTION IS CALLED

  }
  renderTweets(data);

  // $('.hvr').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});