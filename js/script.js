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
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  // [DONE] remove content of titleList for each article

  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);
  function clearMessages(){
    titleList.innerHTML = '';
  }
  clearMessages();

  // [DONE] find all the articles and save them to variable: articles

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);
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
    console.log('html', html);
  }
  // [DONE] insert link into titleList

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log('links', links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}