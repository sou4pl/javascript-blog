/* eslint-disable no-prototype-builtins */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML),
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;


  // [DONE] remove class 'acitve' from all article links

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  // [DONE] add class 'active' to the cliked link
  clickedElement.classList.add('active');

  // [DONE] remove class 'active from all articles
  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  // [DONE] get 'href' attribute form the clicked link
  const articleSelector = clickedElement.getAttribute('href');

  // [DONE] find the correct article using the selector (value of 'href' attribute)
  const targetArticle = document.querySelector(articleSelector);

  // [DONE] add class 'active' to the correct article
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){

  // [DONE] remove content of titleList for each article
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages(){
    titleList.innerHTML = '';
  }
  clearMessages();

  // [DONE] find all the articles and save them to variable: articles
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    // [DONE] get the article id
    const articleId = article.getAttribute('id');

    // [DONE] find the title element and get the title from the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // [DONE] create HTML of the link
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);


    // [DONE] insert link into html var
    html = html + linkHTML;
  }

  // [DONE] insert link into titleList
  titleList.innerHTML = html;
}

generateTitleLinks();

const articleDefault = document.querySelector('.titles a');
articleDefault.classList.add('active');

function addClickListenersToLinks(){
  const links = document.querySelectorAll('.titles a');


  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags){
  const params = {min: 999999, max: 0};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;

}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags(){

  //[DONE] create a new variable allTags with an empty object
  let allTags = {};

  //[DONE] find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  //[DONE] START LOOP: for every article:
  for(let article of articles){

    //[DONE] find tags wrapper
    const tagWrapper = article.querySelector(optArticleTagSelector);

    //[DONE] make html variable with empty string
    let html = '';


    //[DONE] get tags from data-tags attribute
    const articleTags = article.getAttribute('data-tags');


    //[DONE] split tags into array
    const articleTagsArray = articleTags.split(' ');

    //[DONE] START LOOP: for each tag
    for(let tag of articleTagsArray){

      //[DONE] generate HTML of the link

      const tagHTMLData = {tag: tag};
      const tagHTML = templates.tagLink(tagHTMLData);

      //[DONE] add generated code to html variable
      html = html + tagHTML +' ';


      //[DONE] check if this link is NOT already in allTags
      if(!allTags.hasOwnProperty(tag)){

        //[DONE] add generated code to allTags object
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    //[DONE] END LOOP: for each tag
    }

    //[DONE] insert HTML of all the links into the tags wrapper
    tagWrapper.innerHTML = html;


  //[DONE] END LOOP: for every article:
  }

  //[DONE] find list of tags in right column
  const tagList = document.querySelector(optTagsListSelector);


  //[DONE] add html from allTags to tagList
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};

  // [old] let allTagsHTML = '';

  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event){

  // prevent default action for this event
  event.preventDefault();

  // make new constant named "clickedElement" and give it the value of "this"
  const clickedElement = this;

  // make a new constant "href" and read the attribute "href" of the clicked element
  const href = clickedElement.getAttribute('href');

  // make a new constant "tag" and extract tag from the "href" constant
  const tag = href.replace('#tag-','');

  // find all tag links with class active
  const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');

  // START LOOP: for each active tag link
  for(let tagLinkActive of tagLinksActive){

    // remove class active
    tagLinkActive.classList.remove('active');

  // END LOOP: for each active tag link
  }

  // find all tag links with "href" attribute equal to the "href" constant
  const linksSelected = document.querySelectorAll('a[href="' + href + '"]');

  // START LOOP: for each found tag link
  for(let linkSelected of linksSelected){

    // add class active
    linkSelected.classList.add('active');

  // END LOOP: for each found tag link
  }

  // execute function "generateTitleLinks" with article selector as argument
  generateTitleLinks('[data-tags~="' + tag + '"]');
  addClickListenersToLinks();
}

function addClickListenersToTags(){

  // find all links to tags
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  // START LOOP: for each link
  for(let tagLink of tagLinks){

    // add tagClickHandler as event listener for that link
    tagLink.addEventListener('click', tagClickHandler);

  // END LOOP: for each link
  }
}

addClickListenersToTags();
addClickListenersToLinks();

function generateAuthors(){
  let allAuthors = {};

  //find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  //START LOOP: for every article:
  for(let article of articles){

    //find author wrapper
    const AuthorWrapper = article.querySelector(optArticleAuthorSelector);

    //make html variable with empty string

    //get authors from data-author attribute
    const articleAuthor = article.getAttribute('data-author');


    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    }
    else {
      allAuthors[articleAuthor]++;
    }

    const authorHTMLData = {author: articleAuthor};
    const authorHTML = templates.authorLink(authorHTMLData);

    //insert HTML of all the links into the tags wrapper
    AuthorWrapper.innerHTML = authorHTML;

    //END LOOP: for every article:
  }
  const authorsList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = {authors:[]};

  for(let articleAuthor in allAuthors){
    allAuthorsData.authors.push({
      author: articleAuthor,
      count: allAuthors[articleAuthor],
    });
  }
  authorsList.innerHTML = templates.authorsListLink(allAuthorsData);
}

generateAuthors();

function addClickListenersToAuthors(){

  // find all links to authors
  const authorLinks = document.querySelectorAll('.post-author a');

  // START LOOP: for each link
  for(let authorLink of authorLinks){

    // add tagClickHandler as event listener for that link
    authorLink.addEventListener('click', authorClickHandler);

  // END LOOP: for each link
  }
}

addClickListenersToAuthors();

function authorClickHandler(event){

  // prevent default action for this event
  event.preventDefault();

  // make new constant named "clickedElement" and give it the value of "this"
  const clickedElement = this;

  // make a new constant "href" and read the attribute "href" of the clicked element
  const hrefAuthor = clickedElement.getAttribute('href');

  // make a new constant "author" and extract tag from the "href" constant
  const author = hrefAuthor.replace('#','');

  // find all author links with class active
  const authorLinksActive = document.querySelectorAll('.post-author a.active');

  // START LOOP: for each active tag link
  for(let authorLinkActive of authorLinksActive){

    // remove class active
    authorLinkActive.classList.remove('active');

  // END LOOP: for each active tag link
  }

  // find all tag links with "href" attribute equal to the "href" constant
  const linksAuthorSelected = document.querySelectorAll('a[href="' + hrefAuthor + '"]');

  // START LOOP: for each found tag link
  for(let linkAuthorSelected of linksAuthorSelected){

    // add class active
    linkAuthorSelected.classList.add('active');

  // END LOOP: for each found tag link
  }

  // execute function "generateTitleLinks" with article selector as argument
  generateTitleLinks('[data-author="' + author + '"]');
  addClickListenersToLinks();
}
addClickListenersToAuthors();
