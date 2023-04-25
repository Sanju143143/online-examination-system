const firebaseConfig = {
    apiKey: "AIzaSyBmRb0aKxPiB7EV2LQYb7U5SjEyfUMr-ig",
    authDomain: "smsproject-ecd2d.firebaseapp.com",
    projectId: "smsproject-ecd2d",
    storageBucket: "smsproject-ecd2d.appspot.com",
    messagingSenderId: "263965204952",
    appId: "1:263965204952:web:8f4ee00d7db469338092ad",
    measurementId: "G-SED0D8TV4G"
    };

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
var cfee=document.getElementById('cfeeValue');
var fine=document.getElementById('fineValue');
var rno=document.getElementById('rnoValue');
var year=document.getElementById('yearValue');
var quarter=document.getElementById('quarterValue');
var gender=document.getElementById('genderValue');
var remarks=document.getElementById('remarksValue');
var names=document.getElementById('nameValue');
var email=document.getElementById('emailValue');
var phone=document.getElementById('phoneValue');
var branch=document.getElementById('branchValue');
var items=[];
var password='';
var isEmpty=true;
var content,start,end;
var modal = document.getElementById("myModal");
var modal1=document.getElementById('myModal1');
var span = document.getElementById("close");
var span1 = document.getElementById("close1");
var submit1=document.getElementById('sub1');
submit1.addEventListener('click',setItems);
var submit2=document.getElementById('sub2');
submit2.addEventListener('click',getItems);
var submit3=document.getElementById('sub3');
submit3.addEventListener('click',getHelp);

function setItems(e){
    e.preventDefault();
    if(cfee.value==""||fine.value==""||rno.value==""||year.value==""||quarter.value==""||names.value==""||gender.value==''||email.value==''||phone.value==''){
        alert("Please fill all the fields");
        return;
    }
    db.collection('fee').add({
        Cfee:cfee.value,
        Fine:fine.value,
        Rno:rno.value,
        Year:year.value,
        Quarter:quarter.value,
        Name:names.value,
        Remarks:remarks.value,
        Gender:gender.value,
        Phone:phone.value,
        Email:email.value,
        Branch:branch.value
    }).then(function(){
            location.href='https://services.andhrauniversity.edu.in/Feetut/t-fee-all.php'
        }).catch(function(error){
        alert(error.message);
    });
    
}
async function getItems(e){
    e.preventDefault();
    if(rno.value==""){
        alert("Please Enter Your Registration Number");
        return;
    }
    password=prompt("Enter Your Password");
    if(password==''){
        alert('Please Enter Your Password');
        return;
    }
    if(!(password==(rno.value+'@123'))){
        alert('Incorrect Password');
        return;
    }
    await db.collection('fee').onSnapshot((snapshot)=>{
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
        setTimeout(()=>{
            displayTable();
        },1000);
    })
    
}
function displayTable(){
    modal.style.display = "block";
    content='';
    if(isEmpty){
        document.getElementById("mytable").innerHTML=`<h1>No Record Found</h1>`;
        return;
    }
            start=`
            <div class="table-responsive">          
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>R No.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Branch</th>
                        <th>Year</th>
                        <th>Quarter</th>
                        <th>College Fee</th>
                        <th>Fine Amount</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;      
            
        for(let i=0;i<items.length;i++){
            if(items[i].Rno==rno.value){
            
                content+=`
                    <tr>
                        <td>${items[i].Rno}</td>
                        <td>${items[i].Name}</td>
                        <td>${items[i].Phone}</td>
                        <td>${items[i].Email}</td>
                        <td>${items[i].Gender}</td>
                        <td>${items[i].Branch}</td>
                        <td>${items[i].Year}</td>
                        <td>${items[i].Quarter}</td>
                        <td>${items[i].Cfee}</td>
                        <td>${items[i].Fine}</td>
                        <td>${items[i].Remarks}</td>
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