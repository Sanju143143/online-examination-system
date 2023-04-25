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
var start,content,end;
var rno=document.getElementById("rnoValue");
var date=document.getElementById("datetimeValue");
var subject=document.getElementById("subjectValue");
var att=document.getElementById("attValue");
var start,content,end;
var items=[];
document.getElementById("sub1").addEventListener('click',setItems);
document.getElementById("sub2").addEventListener('click',getItems);

function setItems(e){
    e.preventDefault();
    if(rno.value===""||date.value===""||subject.value===""|| att.value===''){
        alert("Please fill all the fields");
        return;
    }
    db.collection('attendance').add({
        Rno:rno.value,
        Date:date.value,
        Subject:subject.value,
        Att:att.value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert('Record Added Successfully');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}
async function getItems(e){
    e.preventDefault()
    await db.collection('attendance').get()  //get all the data from the database
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
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Attendance</th>
                </tr>
            </thead>
            <tbody>`;
    for(let i=0;i<items.length;i++){
        
            content+=`
                <tr>
                    <td>${items[i].Rno}</td>
                    <td>${items[i].Subject}</td>
                    <td>${items[i].Date}</td>
                    <td>${items[i].Att}</td>
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
}

