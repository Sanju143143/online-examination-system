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
let submit=document.getElementById('sub');
submit.addEventListener('click',getItems);
let rno=document.getElementById('rnoValue');
let password=document.getElementById('passwordValue');
var isEmpty=true;
var items=[];
let modal = document.getElementById("myModal");
let modal1=document.getElementById('myModal1');
let span = document.getElementById("close");
let span1 = document.getElementById("close1");
let submit3=document.getElementById('sub3');
submit3.addEventListener('click',getHelp);

function register(e){
    e.preventDefault();
    if(rno.value==""||password.value==""){
        alert("Please fill all the fields");
        return;
    }
    getItems();
}

async function getItems(e){
    e.preventDefault();
    if(rno.value==""||password.value==""){
        alert("Please Enter all the fields");
        return;
    }
    if(!(password.value==(rno.value+'@123'))){
        alert('Incorrect Password');
        return;
    }
    await db.collection('grades').onSnapshot((snapshot)=>{
        items=[];
        snapshot.docs.forEach((doc)=>{
            items.push({
                id:doc.id,
                ...doc.data()
            });
        })
        for(let i=0; i<items.length; i++){
            if(items[i].Rno==rno.value){
                isEmpty=false;
                break;
            }
            else{
                isEmpty=true;
            }
        }
        displayTable();
    })
    
}


function displayTable(){
    modal.style.display = "block";
    content='';
    if(isEmpty){
        document.getElementById("mytable").innerHTML=`<h1>No Records Found</h1>`;
        return;
    }
            start=`
            <div class="table-responsive">          
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>R No.</th>
                        <th>Year</th>
                        <th>Semester</th>
                        <th>CGP</th>
                    </tr>
                </thead>
                <tbody>`;      
            
        for(let i=0;i<items.length;i++){
            if(items[i].Rno==rno.value){
            
                content+=`
                    <tr>
                        <td>${items[i].Rno}</td>
                        <td>${items[i].Year}</td>
                        <td>${items[i].Semester}</td>
                        <td>${items[i].Cgp}</td>
                    </tr>
                `
            }
        }
        end=`
                    </tbody>
                </table>
            </div>
        `
    document.getElementById("mytable").innerHTML=start+content+end;
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
span1.onclick = function() {
    modal1.style.display = "none";
}


function getHelp(e){
    e.preventDefault();
    modal1.style.display = "block";
}
