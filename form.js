var count = 0;
var choices = new Array(3);
var titles = new Array(3);
var result = new Array(3);
var choice1, choice2, choice3;
var url = "data.json";
var https;
var orderoptions2;


//first init for the login details
function firstinit() {
    
    var formelement = document.createElement('form');
    formelement.setAttribute('method', 'get');
    formelement.id = "userinfoform";
    formelement.setAttribute("action", "page2.html")
    document.body.appendChild(formelement);
    var boxdiv = document.createElement('div');
    boxdiv.id = "userboxdiv";
    document.getElementById("userinfoform").appendChild(boxdiv);
    if(GetCookie('name')== null)
    {
    var message = "Welcome back! Let us plan your next amazing vacation" ;
    var headtag = document.createElement('h3');
    message.id="BoxHeading";
    var textdata = document.createTextNode(message);
    headtag.appendChild(textdata);
    document.getElementById("userboxdiv").appendChild(headtag);
    }
    
    else
        {
    var message = "Hello There! Let us plan your next amazing vacation";
    var headtag = document.createElement('h3');
    message.id="BoxHeading";
    var textdata = document.createTextNode(message);
    headtag.appendChild(textdata);
    document.getElementById("userboxdiv").appendChild(headtag);
        }
    
    document.getElementById("userboxdiv").appendChild(headtag);
    var br = document.createElement("p");
    document.getElementById("userboxdiv").appendChild(br);
    var element = document.createElement("input");
    var x = document.createElement("LABEL");
    element.id="name";

    //creates user name
    var t = document.createTextNode("User Name  :  ");
    x.appendChild(t);
    document.getElementById("userboxdiv").appendChild(x);
    element.setAttribute("type", "text");
    element.setAttribute("name", "User Name");
    document.getElementById("userboxdiv").appendChild(element);

    //creates address
    var element2 = document.createElement("input");
    element2.id="address";
    var y = document.createElement("LABEL");
    var t2 = document.createTextNode("email address : ");
    y.appendChild(t2);
    document.getElementById("userboxdiv").appendChild(br);
    document.getElementById("userboxdiv").appendChild(y);
    element2.setAttribute("type", "text");
    element2.setAttribute("name", "Address");
    document.getElementById("userboxdiv").appendChild(element2);
    var btn = document.createElement("BUTTON");
    btn.id="Login";
    var btntext = document.createTextNode("Enter");
    btn.appendChild(btntext);
    document.getElementById("userboxdiv").appendChild(br);
    document.getElementById("userboxdiv").appendChild(btn);
    var username,useraddress;
    

    document.getElementById("Login").onclick = function() {Buttonclick()};
    username=document.getElementById(element2);
    useraddress=document.getElementById(element);    
}

//check for stored data
function Buttonclick()
{
    
    var username,useraddress;
    username=document.getElementById("name").value;
    useraddress=document.getElementById("address").value; 
    
   if( window.localStorage )
       {
           
        localStorage.setItem('user_id', username);
        localStorage.setItem('user_Address', useraddress);
       }

    else
        {
        
        SetCookie('user_id', username);
        SetCookie('user_Address', useraddres);
            
        }
}



//redirects to chrome page
function init() {
    if (!document.addEventListener) {
        alert('Your browser cannot is too old . Download new version');
        var newbrpwser = window.location.replace('https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DDesktop&hl=en');
    }
    else if (!navigator.cookieEnabled) {
        alert('Your browser cannot is too old . It cannot support cookie. Download new version');
        var newbrpwser = window.location.replace('https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DDesktop&hl=en');
    }
    else if (typeof (Storage) == "undefined") {
        alert('Your browser cannot is too old . It cannot support local storage. Download new version');
        var newbrpwser = window.location.replace('https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DDesktop&hl=en');
    }
    var formelement = document.createElement('form');
    formelement.setAttribute('method', 'get');
    formelement.id = "choices";
    document.body.appendChild(formelement);
    var parentdiv = document.createElement('div');
    parentdiv.id = "parent";
    document.getElementById("choices").appendChild(parentdiv);
    https = getHTTPObject();
    isWorking = false;
    transferdata();
}

function handleHttpResponse() {
    //first, is my 'object' complete (done getting info from server?)
    if (https.readyState == 4) {
        if (https.status == 200) {
            orderoptions2 = JSON.parse(https.responseText);
            start(orderoptions2);
        }
    }
}

function getHTTPObject() {
    var xmlhttps;
    if (window.XMLHttpRequest) {
        xmlhttps = new XMLHttpRequest()
    }
    else if (window.ActiveXObject) {
        xmlhttps = new ActiveXObject("Microsoft.XMLHTTP")
    }
    else {
        return false;
    }
    return xmlhttps;
}

function transferdata() {
    if (https) {
        https.open("GET", url, true);
        https.onreadystatechange = handleHttpResponse;
        https.send(null);
    }
}

function start(datas) {
    
    if( window.localStorage )
       {
         var name = localStorage.getItem("user_id");
         var ab = "Hi " + name + "! Please answer a few questions ";
         var t = document.createTextNode(ab);
         var cookiemessage = document.createElement("h1");
         cookiemessage.id = "userinfo";
         cookiemessage.appendChild(t);
         document.getElementById("pic").appendChild(cookiemessage);
           //cookiemessage.appendChild("header");
           
       }

    else
        {
        
          var name = GetCookie('user_id');
          var ab = "Hi " + name + "! Please answer a few questions ";
          var t = document.createTextNode(ab);
          var cookiemessage = document.createElement("h1");
          cookiemessage.id = "userinfo";
          cookiemessage.appendChild(t);
          document.getElementById("pic").appendChild(cookiemessage);      
        
            
        }
    

    orderoptions2 = datas;
    startcreateselect('firstselection');
}
//to create new select list
function startcreateselect(first) {
    var i, j;
    i = 0;
   // count = count + 1;
    var selectList = document.createElement("select");
    if (first == "firstselection") {
        var divelement = document.createElement("div");
        divelement.id = "imagediv";
        //divelement.setAttribute('style', "position: relative;float:left;top:30px");

        document.getElementById("pic").appendChild(divelement);
        

        selectList.id = "Selection";
        document.getElementById("parent").appendChild(selectList);
        selectList.setAttribute('onchange', 'selectionchange(this);');
         
    }
    else {
        document.getElementById("parent").appendChild(selectList);
        selectList.id = "Selection";

        selectList.setAttribute('onchange', 'selectionchange(this);');
    }
    for (i = 0; i < orderoptions2.length; i++) {
        if (orderoptions2[i].choice == first) {
        
        var imagelement = document.createElement("img");
        
        imagelement.id = "imageid";

        document.getElementById("imagediv").appendChild(imagelement);
    
        document.getElementById('imageid').src = orderoptions2[i].image;
        imagelement.setAttribute('style', "position: relative;float:left;top:350px;");
   
            
            if (orderoptions2[i].option.length <= 0) {
                writeoutput();
            }
            else {
                for (var j = 0; j < orderoptions2[i].option.length; j++) {
                    var option0 = document.createElement("option");

                    option0.value = orderoptions2[i].option[j].choices;
                    option0.text = orderoptions2[i].option[j].choices;
                    selectList.appendChild(option0);
                    if (j == 0) {
                        option0.setAttribute('disabled', 'disabled');
                    }
                }
            }
        }
    }
    				slideUp(); //slids up the image

    }
function slideUp(){
	// Gets the imported image ID
	var image = document.getElementById('imageid');

	//see if image exists
		if(image)
            {
                 for (i = 0; i < orderoptions2.length; i++) {
            
			var topPosition = parseInt(image.style.top);
                 }
            }
		// Slides the imported image up (to be visible)
		if (topPosition > 0){
			
				image.style.top = 	topPosition -5 + 'px';
			}

			setTimeout(
				function(){
					slideUp();
				}
				,20
			);
		}
	
//based on the first selects input the next one changes
function selectionchange(choice) {
    var a;
    if (document.getElementById("result")) {
        document.getElementById("result").remove();
    }
    choice1 = choice.options[choice.selectedIndex].value;
    if ((document.getElementById("parent").childNodes.length > 1)) {
        while (document.getElementById("parent").lastChild !== choice) {
            document.getElementById("parent").removeChild(document.getElementById("parent").lastChild);
        }
    }
    startcreateselect(choice1);
}
//getting to display the output
function writeoutput() {
    document.getElementById("parent").removeChild(document.getElementById("parent").lastChild);
    var children = document.getElementById("parent").children;
    var l = document.getElementById("parent").childNodes.length;
    var displaydiv = document.createElement("div");
    displaydiv.id = "result";
    var finaldata = " ";
    var header = document.createElement("h3");
    header.id = "order";
    var addressofuser;
    if( window.localStorage )
    {
         addressofuser = localStorage.getItem('user_Address'); 
      
    }
    else
        {
            addressofuser=GetCookie('user_Address');
           
        }
    var text = document.createTextNode("This info will be sent to your email address " + addressofuser);
    //for text node dispaly, with questions hardcoded as all options are of similar group
    header.appendChild(text);
    displaydiv.appendChild(header);
    for (var k = 0; k < l; k++) {
        var display = document.createElement("li");
        choices[k] = children[k].options[children[k].selectedIndex].value;
        titles[0] = "You want to go on a ";
        titles[1] = "You want to do ";
        titles[2] = "Your budget is ";
        titles[3] = "During ";
        finaldata =  titles[k] + "- " +choices[k];
        text = document.createTextNode(finaldata);
        display.appendChild(text);
        displaydiv.appendChild(display);

    }

       //creating ph form for ph input
            
    document.body.appendChild(displaydiv);
   
    var phoform= document.createElement('form');
    phoform.setAttribute('action', '#');
    phoform.setAttribute('onsubmit', 'return sendSMS(phonenumber.value)');

    var phonenumber= document.createElement('input');
    phonenumber.setAttribute('id', 'phonenumber');
    phonenumber.setAttribute('name', 'phonenumber');
    phonenumber.setAttribute('type', 'text');
    phoform.appendChild(phonenumber);
    
    displaydiv.appendChild(phoform);
    //submit button
    var smsSubmit = document.createElement('input');
    smsSubmit.setAttribute('type', "submit");
    smsSubmit.setAttribute('id', "smsSubmit");
    smsSubmit.setAttribute('name', "smsSubmit");
    smsSubmit.setAttribute('value', "Text me this info!");
    phoform.appendChild(smsSubmit);
     document.body.appendChild(displaydiv);

    return phoform;

}
//validation for phonumber
function sendSMS(phoneNumber) {
    // Strips all non-numeric characters from inputted phone number
    var formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    // Various checks on the inputted phone number to catch invalid cases
    if (phoneNumber.length == 0) {
        alert("No phone number entered!");
        return false;
    } else if (isNaN(parseInt(phoneNumber))) {
        alert("You entered an invalid phone number!");
        return false;
    } else if ((formattedPhoneNumber.length > 10)) {
        alert("You entered an invalid phone number - the length is too long!");
        return false;
    } else if ((formattedPhoneNumber.length < 10)) {
        alert("You entered an invalid phone number - the length is too short!");
        return false;
    } else if (formattedPhoneNumber.length == 10) {
        alert("Thank you!" +" SMS sent to " + formattedPhoneNumber + "!");
        return true;
    } else {
        return false;
    }
}

