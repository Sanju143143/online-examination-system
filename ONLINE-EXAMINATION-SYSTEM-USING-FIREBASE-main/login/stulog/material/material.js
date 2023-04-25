const firebaseConfig = {
    apiKey: "AIzaSyDbMYcbZstFhXRuzJVRHBf_UfXP2c3sBHY",
    authDomain: "online-examination-syste-331ca.firebaseapp.com",
    projectId: "online-examination-syste-331ca",
    storageBucket: "online-examination-syste-331ca.appspot.com",
    messagingSenderId: "823283810877",
    appId: "1:823283810877:web:eeda364fd46109a6136054",
    measurementId: "G-HHHBQ5GNEV"
};
var content='';
let message=document.getElementById('message');
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
getMaterials();
async function getMaterials() {
        content=''
    // we'll create a Reference to that folder
    var storageRef = firebase.storage().ref("");
    // Now we get the references of these images
    await storageRef.listAll().then(function(result) {
        result.items.forEach(function(item) {
            displayItem(item)
        });
        }).catch(function(error) {
        // Handle any errors
            console.log('Error : '+ error.message)
    });
    setTimeout(()=>{
    if(!content){
        message.innerHTML='No Materials found';
        return;
    }
        message.style.display='none';
        document.getElementById('materials').innerHTML=content;
    },3000)    
}

function displayItem(item) {
    item.getDownloadURL().then(function(url) {
            let name = url.substring(
                url.indexOf("/o/") + 3, 
                url.lastIndexOf("?")
            );
            if(url.match('.jpg')||url.match('.jpeg')||url.match('.gif')){
            content+=`
                        <div class='itemContainer'>
                            <img src=${url} loading='lazy'>
                            <p>${name}</p>
                        </div>
                    `
        }
        else if(url.match('.mp4')){
            content+=`
                        <div class='itemContainer'>
                            <video controls width='400px' height='400px'>
                                <source src=${url} type='video/mp4'></source>
                                Your browser does not support the video element.
                            </video>
                            <p>${name}</p>
                        </div>
                    `
        }
        else if(url.match('.mp3')){
            content+=`
                        <div class='itemContainer'>
                            <audio controls>
                                <source src=${url} type="audio/mp3">
                                Your browser does not support the audio element.
                            </audio>
                            <p>${name}</p>
                        </div>
                    `
        }
        else{
            name=name.replaceAll('%20',' ')
            content+=`
                        <div class='itemContainer' style='overflow:hidden'>
                            <object data=${url} type="application/pdf" width='100%' height='100%'></object>
                            <p>${name}</p>
                        </div>
                `    
        }
        }).catch(function(error) {
        // Handle any errors
        console.log('Error : '+ error.message)
        });
}


