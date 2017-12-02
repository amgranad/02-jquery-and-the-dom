'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The function is capitalized because it is a constructor function that creates objects. 'this' refers to the current object being created. rawDataObj represents the information needed to pass through the Article constructor function to create a complete new Article object.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  // this.rawDataObj = rawDataObj;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  console.log('we are at toHtml');
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // THe benefit of cloning the article lets you have D.R.Y'er html and enables you to have a template to reuse in the JavaScript over and over.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  //Done

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1').text('href', this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('.byline time').attr('datetime', this.publishedOn).text(this.publishedOn);
  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(articleObj){
  articles.push(new Article(articleObj))
});


// for(let i = 0; i < articles.length; i++) {
//   // $('#articles').append(articles[i].toHtml());
// }

articles.forEach(function(element){
  $('#articles').append(element.toHtml());
});
