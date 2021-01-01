var firebaseConfig = {
    apiKey: "AIzaSyCxTzU8EDY24UJ_frPDqln0aT6_Mw0BuIg",
    authDomain: "fir-webapp-1a7ec.firebaseapp.com",
    projectId: "fir-webapp-1a7ec",
    storageBucket: "fir-webapp-1a7ec.appspot.com",
    messagingSenderId: "793441520957",
    appId: "1:793441520957:web:d69e34a1371676f48bc954",
    measurementId: "G-N46Y3EP1V6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function(){
    var email= $("#email").val();
    var password= $("#password").val();

    if(email!="" && password!=""){
        var result= firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errorcode=error.code;
            var errmessage=error.message;
            console.log(errorcode);
            console.log(errmessage);
            
            window.alert(errorcode + "Message : " + errmessage);
        });
    }
    else{
        window.alert("please enter all details");
    }
  });
  $("#btn-signup").click(function(){
    var email= $("#email").val();
    var password= $("#password").val();
    var cpassword=$("#confirm_password").val();
    if(email!="" && password!="" && cpassword!=""){
        if(password == cpassword){
            var result= firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errorcode=error.code;
            var errmessage=error.message;
            console.log(errorcode);
            console.log(errmessage);
            
            window.alert(errorcode + "Message : " + errmessage);
        });
        }
        else{
            window.alert("Password do not matches with confirm password");
        }
    }
    else{
        window.alert("please enter all details");
    }
  });
  
  $("#btn-resetPassword").click(function(){
    var auth=firebase.auth();
    var email=$("#email").val();
    if(email != ''){
        auth.sendPasswordResetEmail(email).then(function(){
            window.alert("Email has been send to you " );
        }).catch(function(error){
            var errorcode=error.code;
            var errmessage=error.message;
            console.log(errorcode);
            console.log(errmessage);
           
            window.alert("Message " + errmessage );
        });
    }
    else{
        window.alert("Please enter your email");
    }

  });
  
  $("#btn-logout").click(function(){
    firebase.auth().signOut();
  });

  $("#btn-update").click(function(){
    var phone=$("#phone").val();
    var address=$("#address").val();
    var fname=$("#firstName").val();
    var lname=$("#lastName").val();
    var gender=$("#gender").val();
    var country=$("#country").val();


    var rootRef =firebase.database().ref().child("Users");
    var userID=firebase.auth().currentUser.uid;
    var usersRef=rootRef.child(userID);
    if(fname != "" && lname != "" && phone != "" && address != "" && gender != "" && country != "")
    {
        var userData={
            "phone":phone,
            "address":address,
            "firstName":fname,
            "lastName":lname,
            "country":country,
            "gender":gender,
        };
        usersRef.set(userData,function(){
            if(error){
            var errorcode=error.code;
            var errmessage=error.message;
            console.log(errorcode);
            console.log(errmessage);
           
            window.alert("Message " + errmessage );
            }
            else{
                window.alert("insert Successfull");
            }
        });
    }
    else{
        window.location.href="MainPage.html";
    }
  });
function switchView(view){
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}