const firebaseConfig = {
    apiKey: "AIzaSyDbMYcbZstFhXRuzJVRHBf_UfXP2c3sBHY",
    authDomain: "online-examination-syste-331ca.firebaseapp.com",
    projectId: "online-examination-syste-331ca",
    storageBucket: "online-examination-syste-331ca.appspot.com",
    messagingSenderId: "823283810877",
    appId: "1:823283810877:web:eeda364fd46109a6136054",
    measurementId: "G-HHHBQ5GNEV"
};

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
var rno=document.getElementById("rnoValue");
var names=document.getElementById("nameValue");
var branch=document.getElementById("branchValue");
var year=document.getElementById("yearValue");
var email=document.getElementById("emailValue");
var phone=document.getElementById("phoneValue");
var msg=document.getElementById("msgValue");
document.getElementById("sub").addEventListener('click',setItems);


function setItems(e){
    e.preventDefault(); 
    if(rno.value===''||branch.value===''||year.value===''||names.value===''||email.value===''||phone.value===''||msg.value===''){
        alert("Please fill all the fields");
        return;
    }
    db.collection('contact').add({
        Rno:rno.value,
        Name:names.value,
        Year:year.value,
        Branch:branch.value,
        Email:email.value,
        Phone:phone.value,
        Message:msg.value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert('Your Query is recorded with us. Our team will get back to you soon.');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error.message);
    }
    );
}