const searchForm = document.querySelector(".search-form")
const searchBox = document.querySelector(".search-input")
const photoResult = document.querySelector(".photos-result-container")
const searchMore = document.querySelector(".show-more-container")
const notFound = document.querySelector(".notFound");

const accesKey = "Ux-_omCtv5n3RlFRATgH3WfUL0es5MzJ3_3-ChK184U";



let keyword = "";
let page = 1;


async function searchImages(){
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}&per_page=12`;

  const response = await fetch (url);
  const data = await response.json();
  const results = data.results;
  console.log(results);
  

  if (results.length === 0){
    notFound.classList.add('js-display');
    searchMore.style.display = "none";

  }else{
    notFound.classList.remove('js-display');
    results.map((result) => {
      let image = document.createElement('img');
      let imageLink = document.createElement('a');
      let likes = document.createElement('p');
      let likesImages = document.createElement('img');
      let likesContainer = document.createElement('div');

      likesContainer.classList.add('likes-container-js');

      likesImages.src = 'images/like.png'

      
      likes.innerHTML = result.likes;
      likes.classList.add('likes-js')

      image.src = result.urls.small;
      image.classList.add('photo-js')

      imageLink.classList.add('js-images');
      imageLink.href = result.links.html;
      imageLink.target = '_blank';
      
      likesContainer.appendChild(likesImages);
      likesContainer.appendChild(likes);
      
      imageLink.appendChild(likesContainer);
      imageLink.appendChild(image);
      photoResult.appendChild(imageLink); 
    })
  
    searchMore.style.display = "flex";
  }

  
}




searchForm.addEventListener('submit', (e)=>{
  if (searchBox.value){
    e.preventDefault();
    resetImages();
    searchImages();
    page = 1;
  }
})

searchMore.addEventListener('click', ()=> {
  searchImages();
  page++;
})

function resetImages(){
  const images = document.querySelectorAll('.js-images');
  if(images.length > 0){
    images.forEach((image) => {
      image.remove();
    })
  }
  
  else{
    console.log('there arent images');
  }
}