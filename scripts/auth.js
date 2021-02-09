//listen for auth status change
let currentUser= '';

auth.onAuthStateChanged( user => {
    db.collection("Reviews").onSnapshot((snapshot) => {
    console.log("review list updated");
    setupGuides(snapshot.docs);

    });
    if (user){
        console.log(user.email + " logged in");
        currentUser = user.email;
        setupUI(user);
    }else{
        console.log("user logged out");
        setupUI(0);
    }
    return currentUser;
});

//create new review
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('Reviews').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
        by: currentUser,
        fav : value = 0,
        
    }).then(()=>{
        //close modal & reset
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
})
//singup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user & pw

    const email = signupForm['signup-email'].value;
    const pw = signupForm['signup-password'].value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, pw).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        console.log("new user signed up");
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
    
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) => {
    e.preventDefault();
    auth.signOut();
});

//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const loginEmail = loginForm['login-email'].value;
    const loginPw = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(loginEmail,loginPw).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err => {
        document.querySelector('.error-display').style = "display: block;";

    })
})