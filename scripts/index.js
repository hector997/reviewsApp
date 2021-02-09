// DOM elements
const guideList = document.querySelector('.guides');
const searchResults = document.querySelector('.search-guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const userInfoDisplay = document.querySelector('.account-details');
let reviews =[];
const setupUI = (user) => {
    if (user){
        //account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <div> Estas logueado como: ${user.email} </div>
                <div>${doc.data().bio}</div>
                `;
            userInfoDisplay.innerHTML = html;
        })
       
        //toggel ui elements
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    }else{
        //toggle ui elements when not logged
        userInfoDisplay.innerHTML = '';
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
    }
}


// setup guides
const setupGuides = (data) => {
        
        data.forEach(doc => {
            const guide = doc.data();
            reviews.push(guide);
        });
        displayReviews();
};
//display function
function displayReviews(){
    let html = '';
    for(i=0; i<reviews.length; i++){
        const guide = reviews[i];
        const li = `
        <li id="initial-results" style="display: block">
            <div class="collapsible-header grey lighten-4"> 
                ${guide.title} 
            </div>
            <div class="collapsible-body white">
                ${guide.content}
                <br/>
                <a> Creador: ${guide.by}</a>
            </div>
        </li>
        `
        ;
        html += li;
        guideList.innerHTML = html
    };
}
//search function
async function search(){
    var input = document.getElementById('search-bar');
    var filter = input.value.toString();
    toDisplay = [];

    for(i=0; i<reviews.length; i++){
        let html2 = '';
        if(reviews[i].title.includes(filter)){
            console.log('pushed');
            toDisplay.push(reviews[i]);
        } else {
            console.log('no match');
        }
        
    }
    if(filter.length<1){
        console.log("searchbar is empty");
        displayReviews();
    }else{
        let html = '';
        for(i=0; i<toDisplay.length; i++){
            const searchResult= toDisplay[i];
            const li = `
                <li id="search-results-display">
                    <div class="collapsible-header grey lighten-4"> 
                        ${searchResult.title} 
                    </div>
                    <div class="collapsible-body white">
                        ${searchResult.content}
                        <br/>
                        <a> Creador: ${searchResult.by}</a>
                    </div>
                </li>
                `
                ;
            html += li;
        }
        guideList.innerHTML = html;
        
    }
}
//set up materialize
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });


