'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);

  // remove class 'acitve' from all article links

  // add class 'active to the cliked link

  // remowe class 'active from all articles

  // get 'href' attribute form the clicked link

  // find the correct article using the selector (value of 'href' attribute)

  // add class 'active' to the correct article
  
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}