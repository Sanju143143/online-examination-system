var email1 = document.getElementById('emailValue1');
var password1 = document.getElementById('passwordValue1');
var email2 = document.getElementById('emailValue2');
var password2 = document.getElementById('passwordValue2');
var sub1=document.querySelector('#sub1');
var sub2=document.querySelector('#sub2');
var sub3=document.querySelector('#sub3');
var sub4=document.querySelector('#sub4');
const firebaseConfig = {
    apiKey: "AIzaSyDbMYcbZstFhXRuzJVRHBf_UfXP2c3sBHY",
    authDomain: "online-examination-syste-331ca.firebaseapp.com",
    projectId: "online-examination-syste-331ca",
    storageBucket: "online-examination-syste-331ca.appspot.com",
    messagingSenderId: "823283810877",
    appId: "1:823283810877:web:eeda364fd46109a6136054",
    measurementId: "G-HHHBQ5GNEV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

sub1.addEventListener('click',signIn1);
sub3.addEventListener('click',signIn2);
sub2.addEventListener('click',()=>{
    document.getElementById('id03').style.display='block';
    document.getElementById('id01').style.display='none'

});
sub4.addEventListener('click',()=>{
    document.getElementById('id04').style.display='block';
    document.getElementById('id02').style.display='none'

});
var code1,code2;
var items1=[];
var items2=[];   
var countryCode1,countryCode2,phoneNumber1,phoneNumber2;
document.getElementById('sign-in-button1').addEventListener('click', submit1);
document.getElementById('confirm-code1').addEventListener('click', verify1);
document.getElementById('sign-in-button2').addEventListener('click', submit2);
document.getElementById('confirm-code2').addEventListener('click', verify2);
const db=firebase.firestore();
const auth = firebase.auth();

function signIn1(e){
    e.preventDefault();
    if(email1.value==='' || password1.value===''){
        alert('Please Fill all the Fields');
        return;
    }
    auth.signInWithEmailAndPassword(email1.value,password1.value).then(function(){
        location.href='validadlogin/validadlogin.html';
    }).catch(function(error){
        alert('Error : '+error.message);
    });
}

function signIn2(e){
    e.preventDefault();
    if(email2.value==='' || password2.value===''){
        alert('Please Fill all the Fields');
        return;
    }
    auth.createUserWithEmailAndPassword(email2.value,password2.value).then(function(){
        db.collection('emailPassword').add({
            Email:email2.value,
            Password:password2.value
        })
        setTimeout(()=>{
            auth.currentUser.delete();
            location.href='validadlogin/validadlogin.html';
        },1500);
    }).catch(function(error){
        alert('Error : '+error.message);
    });
}


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1',{
        'size':'invisible',
        'callback':response=>{
        console.log('Response :'+response);
        },
        'expired-callback':response=>{
        alert('Verify the Recaptcha Again!');
        }
});
function submit1(e){
    e.preventDefault();
    countryCode1=document.getElementById('countryCode1').value;
    phoneNumber1 = document.getElementById('phoneNumber1').value;
    document.getElementById('otp1').style.display = 'block';
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(countryCode1+phoneNumber1, appVerifier)
            .then((confirmationResult) => {
                code1='';
                window.confirmationResult = confirmationResult;
                alert('OTP Sent to '+countryCode1+phoneNumber1);
            }).catch((error) => {
                alert('Error '+ error.message);
            });
}

function verify1(e){
    e.preventDefault();
    code1 = document.getElementById('code1').value;
    confirmationResult.confirm(code1).then((result) => { 
        let isNewUser1=true;
        db.collection('numbers').onSnapshot((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                items1.push({
                    id:doc.id,
                    ...doc.data()
                });
            })
            for(let i=0;i<items1.length;i++){
                if(items1[i].Phone==(countryCode1+phoneNumber1)){
                isNewUser1=false;
                break;
                }
            }
            setTimeout(()=>{
                if(isNewUser1){
                    alert('Invalid Credentials');
                    firebase.auth().currentUser.delete();
                    code1='';
                }
                else{
                    code1='';
                    location.href='validadlogin/validadlogin.html';
                }
            },1000)
        })
        }).catch((error) => {
        alert('Error : '+error.message)
        });
}


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container2',{
    'size':'invisible',
    'callback':response=>{
        console.log('Response :'+response);
    },
    'expired-callback':response=>{
        console.log(response);
        alert('Verify the Recaptcha Again!');
    }
});

function submit2(e){
    e.preventDefault();
    countryCode2 = document.getElementById('countryCode2').value;
    phoneNumber2 = document.getElementById('phoneNumber2').value;
    document.getElementById('otp2').style.display = 'block';
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(countryCode2+phoneNumber2, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert('OTP Sent to '+countryCode2+phoneNumber2);
    }).catch((error) => {
        alert('Error '+ error.message);
    });
}

function verify2(e){
    e.preventDefault();
    code2 = document.getElementById('code2').value;
    confirmationResult.confirm(code2).then((result) => {
        setItems();
    }).catch((error) => {
        alert('Error :'+error.message)
    });
}


function setItems(){
    let isNewUser2=true;
    db.collection('numbers').onSnapshot((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            items2.push({
                id:doc.id,
                ...doc.data()
            });
        })
        for(let i=0;i<items2.length;i++){
            if(items2[i].Phone==(countryCode2+phoneNumber2)){
                isNewUser2=false;
                break;
            }
        }
        setTimeout(()=>{
            if(!isNewUser2){
                location.href='validadlogin/validadlogin.html';
            }
            else{
                db.collection('numbers').add({
                    Phone:(countryCode2+phoneNumber2)
            })
                .then(function(docRef) {
                    code2='';    
                    location.href='validadlogin/validadlogin.html';
                })
                .catch(function(error) {
                console.error("Error adding document: ", error.message);
                });
            }
        },1500)
    })
}