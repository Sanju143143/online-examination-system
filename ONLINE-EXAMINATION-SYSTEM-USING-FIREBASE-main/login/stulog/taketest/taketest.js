let rno=document.getElementById("rnoValue");
let password=document.getElementById("passwordValue");
let testNameValue=document.getElementById("testNameValue");
let pattern=/3191064100[0-9]{2}/;
let submit=document.getElementById("sub");

if(submit){
    submit.addEventListener("click",verify);
}

function verify(e){
    e.preventDefault();
    if(rno.value==''||password.value==''){
        alert("Please fill all the fields");
        return;
    }
    if(!rno.value.match(pattern)){
        alert('Invalid Registration Number');
        return;
    }
    if(!(password.value==rno.value+'@123')){
        alert('Invalid Password');
        return;
    }
    location.href='test/test.html';
}