// set addEventListener
document.getElementById('nav-home').addEventListener('click',showHome);
let images = document.getElementsByClassName('image-box');
console.log(images);
for(let i=0;i<images.length;i++){
    images[i].addEventListener('click',showHome);
}

document.getElementById('nav-work').addEventListener('click',showWork);
document.getElementById('profile-next').addEventListener('click',showWork);


document.getElementById('nav-contact').addEventListener('click',showContact);
document.getElementById('nav-twitter').addEventListener('click',showHome);



// define function for which block is to visible when
function showHome(){
    // alert('showHOme');
    document.getElementById('profile').style.display = 'flex';
    document.getElementById('work').style.display = 'none';
    document.getElementById('contact').style.display = 'none';   
    
    document.getElementById('home-arrow').style.display = 'block';
    document.getElementById('work-arrow').style.display = 'none';
    document.getElementById('contact-arrow').style.display = 'none';    
}
function showWork(){
    // alert('work');
    document.getElementById('profile').style.display = 'none';
    document.getElementById('work').style.display = 'block';
    document.getElementById('contact').style.display = 'none';    

    document.getElementById('home-arrow').style.display = 'none';
    document.getElementById('work-arrow').style.display = 'block';
    document.getElementById('contact-arrow').style.display = 'none';    
}
function showContact(){
    // alert('contact');
    document.getElementById('profile').style.display = 'none';
    document.getElementById('work').style.display = 'none';
    document.getElementById('contact').style.display = 'block';   
    
    document.getElementById('home-arrow').style.display = 'none';
    document.getElementById('work-arrow').style.display = 'none';
    document.getElementById('contact-arrow').style.display = 'block';    
}
