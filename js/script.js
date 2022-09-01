'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);


  // [DONE] remove class 'acitve' from all article links

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  // [DONE] add class 'active' to the cliked link

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  // [DONE] remove class 'active from all articles

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  // [DONE] get 'href' attribute form the clicked link

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  // [DONE] find the correct article using the selector (value of 'href' attribute)

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  // [DONE] add class 'active' to the correct article

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list';

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
    console.log('articleId', articleId);

    // [DONE] find the title element and get the title from the title element

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // [DONE] create HTML of the link

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    // [DONE] insert link into html var

    html = html + linkHTML;
  }
  // [DONE] insert link into titleList

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log('links', links);


const articleDefault = document.querySelector('.titles a');
console.log('articleDeafult', articleDefault);
articleDefault.classList.add('active');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){

  //[DONE] find all articles

  const articles = document.querySelectorAll(optArticleSelector);

  //[DONE] START LOOP: for every article:

  for(let article of articles){
  
    //[DONE] find tags wrapper

    const tagWrapper = article.querySelector(optArticleTagSelector);
    console.log('tagWrapper', tagWrapper);

    //[DONE] make html variable with empty string
    let html = '';
    console.log('html', html);

    //[DONE] get tags from data-tags attribute

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    //[DONE] split tags into array

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    //[DONE] START LOOP: for each tag

    for(let tag of articleTagsArray){

      //[DONE] generate HTML of the link

      const htmlSingle = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('linkHTML', htmlSingle);

      //[DONE] add generated code to html variable

      html = html + htmlSingle +' ';
      console.log('html', html);

    //[DONE] END LOOP: for each tag
    }
    //[DONE] insert HTML of all the links into the tags wrapper

  tagWrapper.innerHTML = html;
  console.log('hmtl after loop', html);
  //[DONE] END LOOP: for every article:
  }
}

generateTags();

function tagClickHandler(event){

  // prevent default action for this event 
  event.preventDefault();
  // make new constant named "clickedElement" and give it the value of "this" 
  const clickedElement = this;
  // make a new constant "href" and read the attribute "href" of the clicked element 
  const href = clickedElement.getAttribute('href');
  console.log('href', href);
  // make a new constant "tag" and extract tag from the "href" constant 
  const tag = href.replace('#tag-','');
  // find all tag links with class active 
  tagLinksActive = document.querySelectorAll('a.active[href^"#tag-"]');
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
}

function addClickListenersToTags(){
  // find all links to tags 
  const tagLinks = document.querySelectorAll('a[href^"#tag-"]');
  console.log('tagLinks', tagLinks);
  // START LOOP: for each link 
  for(let tagLink of tagLinks){
    // add tagClickHandler as event listener for that link 
    tagLink.addEventListener('click', tagClickHandler)
  // END LOOP: for each link 
  }
}

addClickListenersToTags();