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
const db=firebase.firestore();
var rno=document.getElementById("rnoValue");
var branch=document.getElementById("branchValue");
var course=document.getElementById("courseValue");
var fname=document.getElementById("fnameValue");
var lname=document.getElementById("lnameValue");
var faname=document.getElementById("fanameValue");
var maname=document.getElementById("manameValue");
var email=document.getElementById("emailValue");
var phone=document.getElementById("phoneValue");
var address=document.getElementById("addressValue");
var dob=document.getElementById("dobValue");
var doj=document.getElementById("dojValue");
var start,content,end;
var items=[];
document.getElementById("sub1").addEventListener('click',setItems);
document.getElementById("sub2").addEventListener('click',getItems);


function setItems(e){
    e.preventDefault();
    if(rno.value===''||branch.value===''||fname.value===''||lname.value===''||faname.value===''||maname.value===''||email.value===''||phone.value===''||address.value===''||dob.value===''||doj.value===''){
        alert("Please fill all the fields");
        return;
    }
    db.collection('register').add({
        Rno:rno.value,
        Branch:branch.value,
        Course:course.value,
        First_Name:fname.value,
        Last_Name:lname.value,
        Father_Name:faname.value,
        Mother_Name:maname.value,
        Email:email.value,
        Phone:phone.value,
        Address:address.value,
        DOB:dob.value,
        DOJ:doj.value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert('Record Added Successfully');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }
    );
}

async function getItems(e){
    e.preventDefault();
    await db.collection('register').get()  //get all the data from the database
    .then(snapshot => {
        items=[];
    snapshot.docs.forEach(doc => {
        items.push({
            id:doc.id,
            ...doc.data()
        });
        displayTable();
    });
    }).catch(error => {
        console.log('Error getting documents', error.message);
    });
    
}
function displayTable(){
    modal.style.display = "block";
        content='';
        start=`
        
        <div class="table-responsive">          
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>R No.</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>FATHER NAME</th>
                    <th>MOTHER NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                    <th>DATE OF BIRTH</th>
                    <th>BRANCH</th>
                    <th>COURSE</th>
                    <th>ADDRESS</th>
                    <th>DATE OF JOINING</th>
                </tr>
            </thead>
            <tbody>`;
    for(let i=0;i<items.length;i++){
        
            content+=`
                <tr>
                    <td>${items[i].Rno}</td>
                    <td>${items[i].First_Name}</td>
                    <td>${items[i].Last_Name}</td> 
                    <td>${items[i].Father_Name}</td>
                    <td>${items[i].Mother_Name}</td>
                    <td>${items[i].Email}</td>
                    <td>${items[i].Phone}</td>
                    <td>${items[i].DOB}</td>
                    <td>${items[i].Branch}</td>
                    <td>${items[i].Course}</td>
                    <td>${items[i].Address}</td>
                    <td>${items[i].DOJ}</td>
                </tr>
        `    
    }
    end=`
                </tbody>
            </table>
        </div>
    `
    document.getElementById("mytable").innerHTML=start+content+end;
    
}
var modal = document.getElementById("myModal");
var span = document.getElementById("close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    content='';
}

