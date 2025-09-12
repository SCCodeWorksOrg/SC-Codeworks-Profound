pui.genie['subfile'] = true;
var hybridSkin = {};

function isDev() {
  return window.location.hostname === "170.249.89.98";
}

function customize() {
  // Customize Sign-On Screen
  if (detectScreen('D_1_23','             Sign On', 
                   'D_2_48','System  . . . . . :',
                   'D_3_48','Subsystem . . . . :',
                   'D_4_48','Display . . . . . :')) {
    hideElements('D_1_23', 'D_2_48', 'D_3_48', 'D_4_48', 'D_2_70', 'D_3_70', 'D_4_70', 'I_11_53', 'I_12_53', 'D_11_17', 'D_12_17',
                 'D_8_17', 'D_9_17', 'D_10_17', 'I_8_53', 'I_9_53', 'I_10_53', 'D_24_40');
    changeElementValue('D_6_17', '&nbsp;&nbsp;&nbsp;&nbsp;User:');
    changeElementClass('D_6_17', 'BigText');
    changeElementValue('D_7_17', 'Password:');
    changeElementClass('D_7_17', 'BigText');
    setDOMAttribute("D_7_17", "transparent", true);   
    setDOMAttribute("D_6_17", "transparent", true);      
    moveElement('D_6_17', 8.9, 15);
    moveElement('D_7_17', 10.9, 15);
    moveElement('I_6_53', 8.9, 49);
    moveElement('I_7_53', 10.9, 49);
    if (getObj('I_6_53') != null) getObj('I_6_53').style.width = "90px";
    if (getObj('I_7_53') != null) getObj('I_7_53').style.width = "90px";
    var loginButton = newElement(12.7, 49, 'button', 'Login', 'login_button');
    loginButton.onclick = function() { pressKey('Enter') };
    moveElement('quit_button', 12.7, 57);
    changeElementValue('quit_button', 'Exit');
  
    var backdrop = newElement(4, 13, "img", "/profoundui/userdata/images/screenlogin.png", "backdrop_image");
    // var backdrop = newElement(5, 15, "img", "/profoundui/proddata/images/login.gif", "backdrop_image");
    backdrop.style.zIndex = 5;
    
    // Format signon differently when using 128 char passwords:
    if (getObj("I_7_53")!=null 
      && getObj("I_8_1")!=null 
      && getObj("I_9_1")!=null) {
       var pwlength = 0;
       pwlength  = getObj("I_7_53").fieldInfo.size;
       pwlength += getObj("I_8_1").fieldInfo.size;
       pwlength += getObj("I_9_1").fieldInfo.size;
       if (pwlength == 128) {
          moveElement("D_6_17", 6.9, 15);
          moveElement("D_7_17", 8.9, 15);
          moveElement('I_6_53', 6.9, 49);
          moveElement('I_7_53', 8.9, 49);
          moveElement('I_8_1', 10, 49);
          moveElement('I_9_1', 11.1, 49);
          getObj("I_7_53").style.width = "150px";
          getObj("I_8_1").style.width = "150px";
          getObj("I_9_1").style.width = "150px";
       }
    }
     /* alert */
    
    // Disable all alert popups globally
// window.alert = function () {};

window.alert = function(msg, msg1, msg2) {
  // Ensure no alert is shown by default when nothing is triggered.
  const existingAlert = document.getElementById('customAlert');
  if (existingAlert) existingAlert.remove(); // Remove any existing alert if there's one from a previous trigger

  // If the message is empty or undefined, don't show the alert
  if (!msg && !msg1 && !msg2) {
    return;  // Do nothing if there's no message to display
  }

  // Create the notification container
  const notification = document.createElement('div');
  notification.id = 'customAlert';
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';  // Adjust the distance from the bottom
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';  // Center the notification
  notification.style.backgroundColor = '#f2f2f2';  // White background
  notification.style.color = '#003399';  // Red text color
  notification.style.fontWeight = 'bold';
  notification.style.padding = '12px 24px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 0px 0px rgba(0, 0, 0, 0.3)';
  notification.style.fontSize = '16px';
  notification.style.zIndex = '9999';
  notification.style.maxWidth = '400px';  // Max width of the notification
  notification.style.width = '90%';  // Responsive width
  notification.style.textAlign = 'center';
  notification.style.transition = 'opacity 0.5s ease-in-out';  // Fade effect

  // Only append the messages if they are not empty or undefined
  if (msg) {
    const text = document.createElement('p');
    text.innerText = msg;
    notification.appendChild(text);
  }

  if (msg1) {
    const text1 = document.createElement('p');
    text1.innerText = msg1;
    notification.appendChild(text1);
  }

  if (msg2 && msg2 !== 'undefined' && msg2 !== '') {
    const text2 = document.createElement('p');
    text2.innerText = msg2;
    notification.appendChild(text2);
  }

  // Append notification to body
  document.body.appendChild(notification);

  // Optional: Auto hide the notification after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';  // Fade out the notification
    setTimeout(() => {
      notification.remove();  // Remove the notification after fade out
    }, 500);
  }, 5000);  // Adjust the time before it fades out
};

// Example usage with messages
var msg = get('D_24_1');
var msg1 = get('D_25_2');
var msg2 = get('D_24_2');  // This will only be displayed if it's not undefined or empty

// Trigger the alert with the messages
alert(msg, msg1,  msg2);


// Debugging logs
console.log("Message 1 (D_24_1):", msg);
console.log("Message 2 (D_25_2):", msg1);

// Check if messages exist
if (msg || msg1) {
  var middleDiv = document.querySelector('.middleDiv.centered');
  // Debugging: Check if middleDiv exists
  if (!middleDiv) {
    console.error("middleDiv.centered not found in the DOM!");
  } else {
    console.log("middleDiv.centered found!");
    // Remove existing messages before adding new ones
    document.querySelectorAll('.errorMessage').forEach(el => el.remove());
    // Function to create and append error messages
    function appendErrorMessage(text, id) {
      if (text) {
        var errorMessage = document.createElement('p');
        errorMessage.classList.add('errorMessage'); // Use class instead of ID for multiple messages
        errorMessage.textContent = text;
        errorMessage.style.color = 'red';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.padding = '10px';
        errorMessage.style.marginTop = '10px';
        // Debugging: Log the created error message
        console.log(`Appending Error Message from ${id}:`, text);
        // Append to the middleDiv
        middleDiv.appendChild(errorMessage);
      }
    }
    // Append both messages if they exist
    appendErrorMessage(msg, "D_24_1");
    appendErrorMessage(msg1, "D_25_2");
  }
}

// Hide the original alert elements
hideElement('D_24_1');
hideElement('D_25_2');

    var msg = get('D_24_1');
    hideElement('D_24_1');
    hybridSkin.signon = true;
  }
  else {
    hybridSkin.signon = false;
  }
  //   var msg = get('D_24_1');
  //   if (msg!='' && pui.genie.alertMsg=='') {
  //     pui.genie.alertMsg = msg;
  //     if (pui.genie.alertMsg.substr(0,3) == 'CPF') pui.genie.alertMsg = pui.genie.alertMsg.substr(8);
  //     if (pui.genie.alertMsg.substr(0,1) == '-') pui.genie.alertMsg = pui.genie.alertMsg.substr(1);
  //   }
  //   hideElement('D_24_1');
  //   hybridSkin.signon = true;
  // }
  // else {
  //   hybridSkin.signon = false;
  // }
  pui["loading animation"]["css"] = 'pui-hybrid-animation';
  if (pui.genie.afterInit == null) {
    pui.genie.afterInit = function() {
    if (pui.genie.displaySize >= 132) {
  hybridSkin.screenWidth = window.innerWidth > 1500 ? 1500 : window.innerWidth;
} else {
  hybridSkin.screenWidth = window.innerWidth > 775 ? 775 : window.innerWidth;
}
      // if (pui.genie.displaySize == 132) hybridSkin.screenWidth = 1500;
      // else hybridSkin.screenWidth = 775;    
    
      hybridSkin.displayLogo();
      hybridSkin.displayUser();
      hybridSkin.removeHeader();
      hybridSkin.createHeader();
      hybridSkin.createSideMenu();
       if (!hybridSkin.signon) {
        hybridSkin.displayNavbar();
      }
      else {
        // hide the extra password inputs on signon page
        if (getObj("I_8_1")) getObj("I_8_1").style.visibility = 'hidden';
        if (getObj("I_9_1")) getObj("I_9_1").style.visibility = 'hidden';
      }
      
      // 'D_9_10'
      ['D_7_10', 'D_8_10','D_9_10', 'D_6_10', 'D_10_10'].forEach(id => {
  var el = document.getElementById(id);
  if (el) {
    if (!el.textContent.trim()) {  // if empty or whitespace only
      el.style.backgroundColor = 'transparent'; // or remove bg color
      el.style.color = ''; // reset color if needed
    } else {
      // apply your styles if not empty
      el.style.color = '#1E487A';
      el.style.backgroundColor = '#d6e0f5';
      el.style.fontWeight = 'bold';
      el.style.paddingTop = '5px';
      el.style.paddingBottom = '5px';
      el.style.borderRadius = '5px';
    }
  }
});

    }
  }
  
  if (detectScreen('D_1_1', 'TRW01S')) {
  // Apply CSS for hyperlinkheader class
  var elements = document.getElementsByClassName('hyperlinkheader');
  
  for (var i = 0; i < elements.length; i++) {
    // Apply styles to elements with the 'hyperlinkheader' class
    elements[i].style.fontWeight = 'normal';
    elements[i].style.color = 'black';

    // Find <a> tags within the 'hyperlinkheader' elements
    var links = elements[i].getElementsByTagName('a');
    
    // Apply styles to each <a> tag
    for (var j = 0; j < links.length; j++) {
      links[j].style.fontFamily = 'sans-serif';
      links[j].style.fontSize = '13px';
      links[j].style.fontWeight = '100';
      links[j].style.color = '#000000 !important';
      links[j].style.textDecoration = 'none';
    }
  }
}


}

function afterLoad() {
  if (hybridSkin.signon) document.body.className = "hybrid-signon";
  else document.body.className = "hybrid";

  pui["vertical button spacing"] = 24;
  
  hybridSkin.resizeArea();
  window.onresize = function() {
    hybridSkin.resizeArea();
  }

  //////////// FOR IMAGE UPLOAD ///////////////////  
  // call method to update the image widget source if the widget has a specific Id
  resetImageSource();

  // call method to override the file upload widget if the widget has a specific Id
  overrideFileUploadWidget();
  ////////////////////////////////////////////////
  
  //////////// FOR DOCUMENT LIST ///////////////////  
  getDocumentsForPanel()
  ////////////////////////////////////////////////
}

hybridSkin.removeHeader = function() {
  if (hybridSkin.heading1 != null && hybridSkin.heading1.parentNode != null) {
    hybridSkin.heading1.parentNode.removeChild(hybridSkin.heading1);
  }
  if (hybridSkin.heading2 != null && hybridSkin.heading2.parentNode != null) {
    hybridSkin.heading2.parentNode.removeChild(hybridSkin.heading2);
  }
}


hybridSkin.fixLinks = function() { 

  if (pui.genie.middleDiv != null) {
    links = pui.genie.middleDiv.getElementsByTagName("A");
    var count = 0;
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var div = link.parentNode;
      if (div.className == "hybrid-link" && div.style.visibility != "hidden" && div.style.display != "none") {
        count++;
        var arrow = newElement("div", "", "arrow" + i + "_" + div.id);
        arrow.className = "fkey-arrow";
        arrow.innerHTML = "&gt;";
        arrow.style.left = (parseInt(div.style.left) - 12) + "px";
        arrow.style.top = (parseInt(div.style.top) - 2) + "px";
      }
    }
  }
  
  var panel = getObj("ActionsPanel");
  if (panel != null) {
    var height = count * 30 + 100;
    if (height < 450) height = 450;
    panel.style.height = height + "px";
  }
  }
    // hybridSkin.resizeArea = function () {
    //   if (pui.genie.middleDiv != null) {
    //     var div5250 = getObj("5250");
    //     var middleDiv = pui.genie.middleDiv;
    
    //     // --- Position 5250 if exists ---
    //     if (div5250 != null && div5250.style.width != "100%") {
    //       var windowWidth = pui.getWindowSize().width;
    //       if (pui.genie.displaySize == 132) {
    //         middleDiv.style.height = "640px";
    //         div5250.style.position = "absolute";
    //         var position = (windowWidth - 950) / 2;
    //         if (position < 180) position = 180;
    //         div5250.style.left = position + "px";
    //       } else {
    //         middleDiv.style.height = "560px";
    //         div5250.style.position = "absolute";
    //         var position = (windowWidth - 620) / 2;
    //         if (position < 180) position = 180;
    //         div5250.style.left = position + "px";
    //       }
    //     }
    
    //     // --- Chat Button (inside middleDiv) ---
    //     var chatButton = middleDiv.querySelector('.bottom-chat-btn');
    //     if (!chatButton) {
    //       chatButton = document.createElement('button');
    //       chatButton.className = 'bottom-chat-btn';
    //       chatButton.style.position = 'absolute';
    //       chatButton.style.right = '10px';
    //       chatButton.style.bottom = '10px';
    //       chatButton.style.backgroundColor = '#00a9df';
    //       chatButton.style.border = 'none';
    //       chatButton.style.borderRadius = '50%';
    //       chatButton.style.cursor = 'pointer';
    //       chatButton.style.zIndex = '1000';
    //       chatButton.style.width = '60px';
    //       chatButton.style.height = '60px';
    //       chatButton.style.display = 'flex';
    //       chatButton.style.alignItems = 'center';
    //       chatButton.style.justifyContent = 'center';
    
    //       var iconImg = document.createElement('img');
    //       iconImg.src = '/profoundui/userdata/images/chat.png';
    //       iconImg.alt = 'Chat Icon';
    //       iconImg.style.width = '40px';
    //       iconImg.style.height = '40px';
    //       chatButton.appendChild(iconImg);
    
    //       middleDiv.appendChild(chatButton);
    //     }
       
    //     // --- Chat iframe (outside div5250 to prevent double frames) ---
    //     var chatBox = document.querySelector('#codiChatBox');
    //     if (!chatBox) {
    //       chatBox = document.createElement('iframe');
    //       chatBox.id = 'codiChatBox';
    //       chatBox.src = 'https://codi.sccodeworks.com/';
    //       chatBox.style.position = 'fixed';
    //       chatBox.style.bottom = '80px';
    //       chatBox.style.right = '10px';
    //       chatBox.style.width = '400px';
    //       chatBox.style.height = '500px';
    //       chatBox.style.border = 'none';
    //       chatBox.style.overflow = 'hidden !important';
    //       chatBox.style.display = 'none';
    //       chatBox.style.zIndex = '9999';
    //         chatBox.style.overflow = 'scroll'; // allow scrollin
    //       // chatBox.setAttribute('scrolling', 'no'); // prevent scrollbars in older browsers
    //       document.body.appendChild(chatBox);
    //     }
    
    //     // Hide scrollbars via JS (WebKit and Firefox)
    //     var style = document.createElement('style');
    //     style.innerHTML = `
    //       #codiChatBox::-webkit-scrollbar { display: none; }
    //       #codiChatBox { scrollbar-width: none; }
    //     `;
    //     document.head.appendChild(style);
    //     // --- Toggle iframe ---
    //     chatButton.onclick = function () {
    //       chatBox.style.display = (chatBox.style.display === 'none') ? 'block' : 'none';
    //     };
    
    //     // --- Hide on signon ---
    //     var isSignon = document.body.classList.contains('hybrid-signon');
    //     chatButton.style.display = isSignon ? 'none' : 'flex';
    //     if (isSignon) chatBox.style.display = 'none';
    //   }
    // };
    
    
    
//   hybridSkin.resizeArea = function () {
//   if (pui.genie.middleDiv != null) {
//     var div5250 = getObj("5250");
//     var middleDiv = pui.genie.middleDiv;

//     // --- Position 5250 if exists ---
//     if (div5250 != null && div5250.style.width != "100%") {
//       var windowWidth = pui.getWindowSize().width;
//       if (pui.genie.displaySize == 132) {
//         middleDiv.style.height = "640px";
//         div5250.style.position = "absolute";
//         var position = (windowWidth - 950) / 2;
//         if (position < 180) position = 180;
//         div5250.style.left = position + "px";
//       } else {
//         middleDiv.style.height = "560px";
//         div5250.style.position = "absolute";
//         var position = (windowWidth - 620) / 2;
//         if (position < 180) position = 180;
//         div5250.style.left = position + "px";
//       }
//     }

//     // --- Chat Icon (image only) ---
//     var chatIcon = middleDiv.querySelector('.bottom-chat-icon');
//     if (!chatIcon) {
//       chatIcon = document.createElement('img');
//       chatIcon.className = 'bottom-chat-icon';
//       chatIcon.src = '/profoundui/userdata/images/chat.png';
//       chatIcon.alt = 'Chat Icon';

//       chatIcon.style.position = 'fixed';
//       chatIcon.style.right = '10px';
//       chatIcon.style.bottom = '10px';
//       chatIcon.style.width = '60px';
//       chatIcon.style.height = '60px';
//       chatIcon.style.cursor = 'pointer';
//       chatIcon.style.zIndex = '1000';
//       chatIcon.style.background = 'none';
//       chatIcon.style.border = 'none';
//       chatIcon.style.boxShadow = 'none';
//       chatIcon.style.outline = 'none';

//       middleDiv.appendChild(chatIcon);
//     }

//     // --- Chat container (NO iframe here) ---
//     var chatBox = document.querySelector('#codiChatBox');
//     if (!chatBox) {
//       chatBox = document.createElement('div');
//       chatBox.id = 'codiChatBox';
//       chatBox.style.position = 'fixed';
//       chatBox.style.bottom = '80px';
//       chatBox.style.right = '10px';
//       chatBox.style.width = '400px';
//       chatBox.style.height = '500px';
//       chatBox.style.display = 'none';
//       chatBox.style.zIndex = '9999';
//       chatBox.style.margin = '0';
//       chatBox.style.padding = '0';
//       chatBox.style.boxShadow = 'none';
//       chatBox.style.background = 'transparent';

//       document.body.appendChild(chatBox);

//       // Mount your React chatbot widget
//       if (window.CodiChatWidget && typeof window.CodiChatWidget.init === 'function') {
//         window.CodiChatWidget.init({
//           position: "bottom-right",
//           width: "400px",
//           height: "500px",
//         });
//       } else {
//         console.warn("CodiChatWidget not loaded yet");
//       }
//     } // <-- closes if (!chatBox)

//     // --- Toggle container ---
//     chatIcon.onclick = function () {
//       chatBox.style.display =
//         (chatBox.style.display === 'none') ? 'block' : 'none';
//     };

//     // --- Hide on signon ---
//     var isSignon = document.body.classList.contains('hybrid-signon');
//     chatIcon.style.display = isSignon ? 'none' : 'block';
//     if (isSignon) chatBox.style.display = 'none';
//   }
// }; // <-- closes hybridSkin.resizeArea
//   function initWidget() {
//     if (window.CodiChatWidget && typeof window.CodiChatWidget.init === 'function') {
//       window.CodiChatWidget.init({
//         position: "bottom-right",
//         width: "400px",
//         height: "500px"
//       });
//     } else {
//       setTimeout(initWidget, 100);
//     }
//   }
//   initWidget();

hybridSkin.resizeArea = function () {
  if (pui.genie.middleDiv != null) {
    var div5250 = getObj("5250");
    var middleDiv = pui.genie.middleDiv;

    // --- Position 5250 if exists ---
    if (div5250 != null && div5250.style.width != "100%") {
      var windowWidth = pui.getWindowSize().width;
      if (pui.genie.displaySize == 132) {
        middleDiv.style.height = "640px";
        div5250.style.position = "absolute";
        var position = (windowWidth - 950) / 2;
        if (position < 180) position = 180;
        div5250.style.left = position + "px";
      } else {
        middleDiv.style.height = "560px";
        div5250.style.position = "absolute";
        var position = (windowWidth - 620) / 2;
        if (position < 180) position = 180;
        div5250.style.left = position + "px";
      }
    }

    // --- Chat Icon (image only) ---
    var chatIcon = middleDiv.querySelector('.bottom-chat-icon');
    if (!chatIcon) {
      chatIcon = document.createElement('img');
      chatIcon.className = 'bottom-chat-icon';
      chatIcon.src = '/profoundui/userdata/images/chat.png';
      chatIcon.alt = 'Chat Icon';

      // Style the chat icon
      chatIcon.style.position = 'fixed';
      chatIcon.style.right = '10px';
      chatIcon.style.bottom = '10px';
      chatIcon.style.boxShadow = 'none';
      chatIcon.style.outline = 'none';     
      chatIcon.style.width = '60px';
      chatIcon.style.height = '60px';
      chatIcon.style.cursor = 'pointer';
      chatIcon.style.zIndex = '1000';
      chatIcon.style.background = 'none';
      chatIcon.style.border = 'none';
      chatIcon.style.boxShadow = 'none';

      middleDiv.appendChild(chatIcon);
    }

    // --- Chat iframe (outside div5250 to prevent double frames) ---
    // var chatBox = document.querySelector('#codiChatBox');
    // if (!chatBox) {
    //   chatBox = document.createElement('iframe');
    //   chatBox.id = 'codiChatBox';
    //   chatBox.src = 'https://codi.sccodeworks.com/';
    //   chatBox.style.position = 'fixed';
    //   chatBox.style.bottom = '80px';
    //   chatBox.style.right = '10px';
    //   chatBox.style.width = '400px';
    //   chatBox.style.height = '500px';
      
    //   chatBox.style.boxShadow = 'none';
    //   chatBox.style.outline = 'none';   
    //   chatBox.style.border = 'none';
    //   chatBox.style.display = 'none';
    //   chatBox.style.zIndex = '9999';
    //   chatBox.style.overflow = 'scroll'; // allow scrolling
    //   document.body.appendChild(chatBox);
    // }
   
   
    // --- Chat container (no extra iframe) ---
    var chatBox = document.querySelector('#codiChatBox');
    if (!chatBox) {
      chatBox = document.createElement('div');
      chatBox.id = 'codiChatBox';
    
      // load your existing chat widget directly inside
      chatBox.innerHTML = `
        <iframe src="https://codi.sccodeworks.com/"
                style="width:100%; height:100%; border:none; margin:0; padding:0;">
        </iframe>
      `;
    
      chatBox.style.position = 'fixed';
      chatBox.style.bottom = '80px';
      chatBox.style.right = '10px';
      chatBox.style.width = '400px';
      chatBox.style.height = '500px';
      chatBox.style.display = 'none';
      chatBox.style.zIndex = '9999';
      chatBox.style.margin = '0';
      chatBox.style.padding = '0';
      chatBox.style.boxShadow = 'none';
      chatBox.style.background = 'transparent';
    
      document.body.appendChild(chatBox);
    }

    // Hide scrollbars via JS (WebKit + Firefox)
    if (!document.getElementById('chatBoxScrollStyle')) {
      var style = document.createElement('style');
      style.id = 'chatBoxScrollStyle';
      style.innerHTML = `
        #codiChatBox::-webkit-scrollbar { display: none; }
        #codiChatBox { scrollbar-width: none; }
      `;
      document.head.appendChild(style);
    }

    // --- Toggle iframe ---
    chatIcon.onclick = function () {
      chatBox.style.display = (chatBox.style.display === 'none') ? 'block' : 'none';
    };

    // --- Hide on signon ---
    var isSignon = document.body.classList.contains('hybrid-signon');
    chatIcon.style.display = isSignon ? 'none' : 'block';
    if (isSignon) chatBox.style.display = 'none';
  }
};



hybridSkin.displayLogo = function(dspf) {
  var logo = "logo.png";
  var logoElement = newElement("img", "/profoundui/userdata/genie skins/Codeworks/" + logo);
  logoElement.style.top = "-75px";
  if (dspf) logoElement.style.left = "5px";
  else logoElement.style.left = "-250px";
}

hybridSkin.displayNavbar = function(dspf) {
  var enterpriseLink = newElement(0, 0, 'span', 'Enterprise', 'dashboard_link');
  enterpriseLink.className = "navbar_links active"; // Add the .navbar_links class
  enterpriseLink.innerText = "Enterprise";
  enterpriseLink.style.left = "-262px";
  
  if (isDev()) {
    var analyticsLink = newElement(0, 0, 'a', 'Codeworks Analytics', 'dashboard_link');
    analyticsLink.href = "https://app.powerbi.com/groups/5bc57b98-415d-43b5-88af-0f5c691c4fef/list?experience=power-bi"; // Replace with your desired URL
    analyticsLink.target = "_blank"; // Opens the link in a new tab
    analyticsLink.className = "navbar_links"; // Add the .navbar_links class
    analyticsLink.innerText = "Codeworks Analytics";
    analyticsLink.style.left = "-171px";
    
    var aiLink = newElement(0, 0, 'a', 'Codeworks AI', 'dashboard_link');
    aiLink.href = "https://rchowdary-slow-mover-prediction-srcapp-gyotlr.streamlit.app/"; // Replace with your desired URL
    aiLink.target = "_blank"; // Opens the link in a new tab
    aiLink.className = "navbar_links"; // Add the .navbar_links class
    aiLink.innerText = "Codeworks AI";
    aiLink.style.left = "-80px";
    aiLink.style.padding = "1px"; // Just to wrap the text
  }
  else {
    var analyticsLink = newElement(0, 0, 'a', 'Codeworks Analytics', 'dashboard_link');
    analyticsLink.href = "https://app.powerbi.com/groups/me/apps/42fa62a0-7ed9-4ba0-98c3-97a2b5973e38/reports/27f6f38e-3e2e-4ed8-8db4-6c0d41ff88dc/d5325467e019d1520a8d?experience=power-bi"; // Replace with your desired URL
    analyticsLink.target = "_blank"; // Opens the link in a new tab
    analyticsLink.className = "navbar_links"; // Add the .navbar_links class
    analyticsLink.innerText = "Codeworks Analytics";
    analyticsLink.style.left = "-171px";
    
    var wdlsLink = newElement(0, 0, 'a', 'WDLS Web', 'dashboard_link');
    wdlsLink.href = "https://ibmi75.sccodeworks.com/wdlsweb/"; // Replace with your desired URL
    wdlsLink.target = "_blank"; // Opens the link in a new tab
    wdlsLink.className = "navbar_links"; // Add the .navbar_links class
    wdlsLink.innerText = "WDLS Web";
    wdlsLink.style.left = "-80px";
  }
}


hybridSkin.displayUser = function(dspf) {
  var user = pui["appJob"]["user"];
  if (user == null) user = "";
  if (user != "") user = "User:&nbsp;" + user;
  var userElement = newElement("div", user);
  userElement.style.top = "-62px";
  var left = hybridSkin.screenWidth;
  if (dspf) left = parseInt(pui.genie.middleDiv.style.width);
  left = left - 150;
  userElement.style.left = left + "px";
  userElement.style.fontWeight = "bold";
  userElement.style.fontFamily = "sans-serif";
  userElement.style.color = "#ffffff";
}


hybridSkin.createHeader = function() {
  
  hybridSkin.headingRows = 3;
  if (!hybridSkin.signon) {
    hybridSkin.heading1 = document.createElement("div");
    hybridSkin.heading1.id = "hybrid-heading1";
    hybridSkin.heading1.className = "hybrid-heading1";
    getObj("5250").parentNode.parentNode.appendChild(hybridSkin.heading1);
  }
  hybridSkin.heading2 = document.createElement("div");
  hybridSkin.heading2.id = "hybrid-heading2";
  getObj("5250").parentNode.parentNode.appendChild(hybridSkin.heading2);

  pui["loading animation"]["left"] = -165;
  
  var height = 67;
  // if (some condition should trigger 2 rows vs. 3)  {
    height = height - pui.multY;
    hybridSkin.headingRows -= 1;
  // }
  hybridSkin.heading2.style.height = height + "px";
  hybridSkin.heading2.className = "hybrid-heading2";
  
  var divs = document.getElementById("5250").getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {  
    var div = divs[i];
    var id = div.id;
    if (id.substr(0,4) == "D_1_" || id.substr(0,4) == "D_2_") {
      if (id.indexOf("_W") == -1) {
        div.style.color = "white";
        if (id.substr(0,4) == "D_1_") {
          div.style.fontFamily = "sans-serif";
          div.style.fontSize = "17px";
        }
      }    
    }    
  }
}

// hybridSkin.createSideMenu = function () {
//   var root = document.getElementById("5250");
//   var inputs = root.getElementsByTagName("input");
//   var buttons = [];
//   var dups = {};
//   var gotEnter = false;

//   for (var i = 0; i < inputs.length; i++) {
//     var input = inputs[i];
//     if (input.type !== "button" || !input.fkey) continue;
//     if (input.className && input.className.indexOf("hide") >= 0) continue;

//     input.style.visibility = "hidden";

//     if (!dups[input.fkey]) {
//       buttons.push({
//         fkey: input.fkey,
//         text: input.value || input.fkey
//       });
//       dups[input.fkey] = true;
//       if (input.fkey.toLowerCase() === "enter") gotEnter = true;
//     }
//   }

//   var windowDivs = root.getElementsByClassName("Window");
//   for (var j = 0; j < windowDivs.length; j++) {
//     var windowInputs = windowDivs[j].getElementsByTagName("input");
//     for (var k = 0; k < windowInputs.length; k++) {
//       var windowInput = windowInputs[k];
//       if (windowInput.type !== "button" || !windowInput.fkey) continue;
//       if (windowInput.className && windowInput.className.indexOf("hide") >= 0) continue;

//       windowInput.style.visibility = "hidden";

//       if (!dups[windowInput.fkey]) {
//         buttons.push({
//           fkey: windowInput.fkey,
//           text: windowInput.value || windowInput.fkey
//         });
//         dups[windowInput.fkey] = true;
//         if (windowInput.fkey.toLowerCase() === "enter") gotEnter = true;
//       }
//     }
//   }

//   // ✅ Manually force-add Help key
//   if (!dups["Help"]) {
//     buttons.push({
//       fkey: "Help",
//       text: "Help"
//     });
//     dups["Help"] = true;
//   }

//   if (!gotEnter) {
//     buttons.unshift({
//       fkey: "Enter",
//       text: "Continue"
//     });
//   }

//   buttons.sort((a, b) => a.fkey.localeCompare(b.fkey));

//   var panel = newElement("div", "", "side");
//   panel.className = "hybrid-actions";
//   panel.style.position = "absolute";
//   panel.style.top = "25px";
//   panel.style.left = "0px";
//   panel.style.width = "165px";
//   panel.style.height = window.innerHeight + "px";
//   panel.style.background = "linear-gradient(#00a9df 15%, #172c59 90%)";
//   panel.style.zIndex = "1";

//   var top = (typeof hybridSkin !== "undefined" && hybridSkin.headingRows == 2) ? (90 - pui.multY) : 90;

//   for (let i = 0; i < buttons.length; i++) {
//     let arrow = newElement("div", "", "arrow" + i);
//     arrow.className = "fkey-arrow";
//     arrow.innerHTML = "&gt;";
//     arrow.style.position = "absolute";
//     arrow.style.left = "5px";
//     arrow.style.top = (top - 2) + "px";
//     arrow.style.zIndex = "2";

//     let fkeyLink = newElement("div", "", "fkey" + i);
//     fkeyLink.className = "fkey-link";
//     fkeyLink.innerHTML = buttons[i].text;
//     fkeyLink.fkey = buttons[i].fkey;
//     fkeyLink.style.position = "absolute";
//     fkeyLink.style.left = "12px";
//     fkeyLink.style.width = "130px";
//     fkeyLink.style.whiteSpace = "normal";
//     fkeyLink.style.top = top + "px";
//     fkeyLink.style.zIndex = "2";

//     fkeyLink.onclick = function (e) {
//       let target = e.target || e.srcElement;
//       while (target && !target.fkey) target = target.parentNode;

//       if (target && target.fkey) {
//         let key = target.fkey;

//         // ✅ Special case: Help → ErrorHelp if in state P
//         if (key === "Help" && pui["5250"] && pui["5250"].state === "P") {
//           key = "ErrorHelp";
//         }

//         pressKey(key);
//       }
//     };

//     panel.appendChild(arrow);
//     panel.appendChild(fkeyLink);

//     top += fkeyLink.offsetHeight + 8;
//   }

//   document.body.appendChild(panel);
// };
// Side menu creation
hybridSkin.createSideMenu = function () {
  var root = document.getElementById("5250");
  var inputs = root.getElementsByTagName("input");
  var buttons = [];
  var dups = {};
  var gotEnter = false;

  // Collect inputs (skip and hide Help button)
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.type !== "button" || !input.fkey) continue;

    // Hide and skip original Help button
    if (input.fkey === "Help") {
      input.style.visibility = "hidden";
      continue;
    }

    if (input.className && input.className.indexOf("hide") >= 0) continue;

    input.style.visibility = "hidden";

    if (!dups[input.fkey]) {
      buttons.push({
        fkey: input.fkey,
        text: input.value || input.fkey
      });
      dups[input.fkey] = true;
      if (input.fkey.toLowerCase() === "enter") gotEnter = true;
    }
  }

  // Collect buttons inside .Window divs, same logic
  var windowDivs = root.getElementsByClassName("Window");
  for (var j = 0; j < windowDivs.length; j++) {
    var windowInputs = windowDivs[j].getElementsByTagName("input");
    for (var k = 0; k < windowInputs.length; k++) {
      var windowInput = windowInputs[k];
      if (windowInput.type !== "button" || !windowInput.fkey) continue;

      if (windowInput.fkey === "Help") {
        windowInput.style.visibility = "hidden";
        continue;
      }

      if (windowInput.className && windowInput.className.indexOf("hide") >= 0) continue;

      windowInput.style.visibility = "hidden";

      if (!dups[windowInput.fkey]) {
        buttons.push({
          fkey: windowInput.fkey,
          text: windowInput.value || windowInput.fkey
        });
        dups[windowInput.fkey] = true;
        if (windowInput.fkey.toLowerCase() === "enter") gotEnter = true;
      }
    }
  }

  // Always add Help manually
  if (!dups["Help"]) {
    buttons.push({
      fkey: "Help",
      text: "Help"
    });
    dups["Help"] = true;
  }

  // Ensure Enter present
  if (!gotEnter) {
    buttons.unshift({
      fkey: "Enter",
      text: "Continue"
    });
  }

  // Sort buttons by fkey
  buttons.sort((a, b) => a.fkey.localeCompare(b.fkey));

  // Create side menu container
  var panel = newElement("div", "", "side");
  panel.className = "hybrid-actions";
  panel.style.position = "absolute";
  panel.style.top = "25px";
  panel.style.left = "0px";
  panel.style.width = "165px";
  panel.style.height = window.innerHeight + "px";
  panel.style.background = "linear-gradient(#00a9df 15%, #172c59 90%)";
  panel.style.zIndex = "1";

  var top = (typeof hybridSkin !== "undefined" && hybridSkin.headingRows == 2) ? (90 - pui.multY) : 90;

  // Create links
  for (let i = 0; i < buttons.length; i++) {
    let arrow = newElement("div", "", "arrow" + i);
    arrow.className = "fkey-arrow";
    arrow.innerHTML = "&gt;";
    arrow.style.position = "absolute";
    arrow.style.left = "5px";
    arrow.style.top = (top - 2) + "px";
    arrow.style.zIndex = "2";

    let fkeyLink = newElement("div", "", "fkey" + i);
    fkeyLink.className = "fkey-link";
    fkeyLink.innerHTML = buttons[i].text;
    fkeyLink.fkey = buttons[i].fkey;
    fkeyLink.style.position = "absolute";
    fkeyLink.style.left = "12px";
    fkeyLink.style.width = "130px";
    fkeyLink.style.whiteSpace = "normal";
    fkeyLink.style.top = top + "px";
    fkeyLink.style.zIndex = "2";

    // Call Tab.pressKey on click
    fkeyLink.onclick = function (e) {
      let target = e.target || e.srcElement;
      while (target && !target.fkey) target = target.parentNode;

      if (target && target.fkey) {
        Tab.pressKey(target.fkey, e);
      }
    };

    panel.appendChild(arrow);
    panel.appendChild(fkeyLink);

    top += fkeyLink.offsetHeight + 8;
  }

  document.body.appendChild(panel);
};



var Tab = {};
Tab.autoHideKeypad = true; // Set this to close the keypad (or not) after pressing a key.

Tab.rendered = false;
Tab.showKeypad = function(e) {

  e = e || window.event;
  
  document.getElementById("keypad").style.display = "block";
  
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;

}

Tab.hideKeypad = function(e) {

  e = e || window.event;

  if (e) {
    document.getElementById("keypad").style.display = "none";
    
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
    }
}
Tab.pressKey = function(key, e) {
  e = e || window.event;

  if (key === "Help" && pui["5250"] && pui["5250"].state === "P") {
    key = "ErrorHelp";
  }

  pressKey(key);

  if (Tab.autoHideKeypad === true) {
    Tab.hideKeypad(e);
  } else {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }
};



// Adjusted keepSessionAlive function with correct endpoint URL
function keepSessionAlive() {
    var interval = 2 * 60 * 1000; // 2 minutes
    setInterval(function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://170.249.89.98:8080/profoundui/genie?skin=Codeworks', true); 
        xhr.send();
    // }, interval);
     console.log('Session kept alive at: ' + new Date().toLocaleTimeString());
    }, interval);
}
// Call keepSessionAlive function after page load
document.addEventListener('DOMContentLoaded', function() {
    keepSessionAlive();
});



pui.onload = function() {
  pui["loading animation"]["left"] = 10;
  pui["loading animation"]["css"] = 'pui-animation';
  window.onresize = function() { };
  setTimeout(function() {
    var headingPanel = getObj("HeadingPanel");
    if (headingPanel != null) headingPanel.parentNode.removeChild(headingPanel);
    headingPanel = getObj("HeadingPanel");
    if (headingPanel != null) headingPanel.parentNode.removeChild(headingPanel);
    hybridSkin.fixLinks();
    hybridSkin.removeHeader();
    hybridSkin.createHeader();    
    hybridSkin.displayLogo(true);
    hybridSkin.displayNavbar(true);
    hybridSkin.displayUser(true);
  }, 0);
  
  // document.body.style.marginLeft = '-250px';  // Adjust this value to move more or less
   
}

////////////////////////////////////////////////////////////////////////////////////////
/*  START OF IMAGE UPLOAD CODE */
////////////////////////////////////////////////////////////////////////////////////////
var customImageUploadElementId = 'image-upload-custom';
var customImageSourceElementId = 'image-source-custom';
var originalEnterButtonOnClick = null;
var hasImageLoaded = false;
var hasFileSelected = false;

// Gets the file name and path from the text box on the UI
function getFileNameAndPath() {
    // Get the values of the four text boxes
    var text1 = text2 = text3 = text4 = '';
    if (document.getElementById('I_12_10')) {
      text1 = document.getElementById('I_12_10').value.trim();
      text2 = document.getElementById('I_13_10').value.trim();
      text3 = document.getElementById('I_14_10').value.trim();
      text4 = document.getElementById('I_15_10').value.trim();
    }
    else if (document.getElementById('I_11_9')) {
      text1 = document.getElementById('I_11_9').value.trim();
      text2 = document.getElementById('I_12_9').value.trim();
      text3 = document.getElementById('I_13_9').value.trim();
      text4 = document.getElementById('I_14_9').value.trim();
    }
    else if (document.getElementById('I_9_13_W1')) {
      text1 = document.getElementById('I_9_13_W1').value.trim();
      text2 = document.getElementById('I_10_13_W1').value.trim();
      text3 = document.getElementById('I_11_13_W1').value.trim();
      text4 = document.getElementById('I_12_13_W1').value.trim();
    }
    

    // Combine the texts and trim any excess spaces between them
    return (text1 + text2 + text3 + text4).replace(/\s+/g, ' ').trim();
}

// Resets the image source to the server location
function resetImageSource() {
  // Get the image element 
  var imgElem = document.getElementById(customImageSourceElementId);
  if (imgElem) {
    var combinedText = getFileNameAndPath();
    // The relative path we need to remove from the string
    var locationStrToRemove = "/www/profoundui/htdocs";

    // Check if the combined text starts with the unwanted string and remove it if present
    if (combinedText.startsWith(locationStrToRemove)) {
        combinedText = combinedText.substring(locationStrToRemove.length).trim();
    }
    
    // Generate a unique timestamp
    var timestamp = new Date().getTime();
    // Set the image src to the URL from the text
    imgElem.src = combinedText + "?t=" + timestamp;
    
    hasFileSelected = false;
    
    imgElem.addEventListener('load', function() {
      hasImageLoaded = true;
    });

    imgElem.addEventListener('error', function() {
      hasImageLoaded = false;
    });
  }
}

// Overrides the File Upload Widget if it has the custom ID to handle image uploading workflow
function overrideFileUploadWidget() {
  // Get the file upload input
  var fileUpload = document.getElementById(customImageUploadElementId);
  if (fileUpload) {
    // call function to intercept button events to submit form
    overrideEnterButtonClick();
    
    // add an event listener for when the user selects a file
    fileUpload.addEventListener('change', function() {
      // get file name and path
      var combinedText = getFileNameAndPath();
    
      // parse out the image name (everything after the last '/')
      var lastSlashIndex = combinedText.lastIndexOf('/');
      var imageName = combinedText.substring(lastSlashIndex + 1); // Extract the image name
      var imagePath = combinedText.substring(0, lastSlashIndex);
      
      applyProperty(customImageUploadElementId, "target directory", imagePath);
      applyProperty(customImageUploadElementId, "rename to", imageName);
      
      // add listener after every change since it gets wiped
      var fileInput = document.querySelector(`#${customImageUploadElementId} input[type="file"]`);
      fileInput.removeEventListener('change', handleFileChange);
      fileInput.addEventListener('change', handleFileChange);
      
      // add listener for the remove button
      var removeButton = document.querySelector(`#${customImageUploadElementId} a.remove`); // Target the remove button
      if (removeButton) {
        removeButton.removeEventListener('click', resetImageSource);
        removeButton.addEventListener('click', resetImageSource);
      }
    
      // hide the upload button
      var uploadButton = document.querySelector(`#${customImageUploadElementId} a.upload`); // Target the upload button
      if (uploadButton)
        uploadButton.style.display = 'none';
    });
    
    // add initial listener for file upload
    var fileInput = document.querySelector(`#${customImageUploadElementId} input[type="file"]`);
    fileInput.removeEventListener('change', handleFileChange);
    fileInput.addEventListener('change', handleFileChange);
    
    // add listener for the clear button
    var clearButton = document.querySelector(`#${customImageUploadElementId} a.clear`); // Target the clear button
    clearButton.removeEventListener('click', resetImageSource);
    clearButton.addEventListener('click', resetImageSource);
  }
  else {
    restoreEnterButtonClick();
  }
}

// Listener to capture when the enter key is pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    var fileUpload = document.getElementById(customImageUploadElementId);
    
    if (fileUpload)
      handleFileUpload(customImageUploadElementId);
  }
});

// Function to swap the click event on the specific page
function overrideEnterButtonClick() {
  var enterButton = document.querySelector('.tablet-button#enterBtn');
  
  // Store the original click handler if it's not already stored
  if (!originalEnterButtonOnClick && enterButton) {
    originalEnterButtonOnClick = enterButton.onclick;

    // Override the click handler
    enterButton.onclick = function(event) {
      handleFileUpload(customImageUploadElementId);
    };
  }
}

// Restores the Enter button click if not on a page with image uploading
function restoreEnterButtonClick() {
  var enterButton = document.querySelector('.tablet-button#enterBtn');

  // Restore the original event handler
  if (originalEnterButtonOnClick) {
    enterButton.onclick = originalEnterButtonOnClick;
    originalEnterButtonOnClick = null; // Clear the reference
  }
}

// File upload handling logic
function handleFileUpload(elementId, callback) {
  var fileInput = document.querySelector(`#${elementId} input[type="file"]`);

  if (fileInput && !hasImageLoaded) {
    alert("Please select an image to upload");
    return;
  }

  var uploadButton = document.querySelector(`#${elementId} a.upload`);
  if (uploadButton && hasFileSelected) {
    // Set up to intercept the next request, so we can submit the form after the image uploads
    interceptNextHttpRequest().then((xhr) => {
      Tab.pressKey('Enter', event); // Continue with the ProfoundUI Enter action
    });
    
    // Upload the image
    uploadButton.click();
  }
  else
    Tab.pressKey('Enter', event); // Continue with the ProfoundUI Enter action
}

// Updates the Image source if a file is selected or removed
function handleFileChange() {
  // update the image widget
  var imageWidget = document.getElementById(customImageSourceElementId);
  var fileInput = this;
  if (imageWidget) {
    if (fileInput.files && fileInput.files.length > 0) {
      var selectedFile = fileInput.files[0]; // Get the selected file
      var imageURL = URL.createObjectURL(selectedFile);
      
      // Set the src attribute of the image widget to the new file URL
      imageWidget.src = imageURL;
      
      // Set has file selected flag to false
      hasFileSelected = true;

      // Revoke the object URL after the image has loaded to free up memory
      imageWidget.onload = function() {
        URL.revokeObjectURL(imageURL); // Clean up once the image is loaded
      };

      // Clear the file input's value to allow re-selection of the same file
      fileInput.value = '';
    }
    else {
      resetImageSource();
    }
  }
}

// Intercepts an HTTP request
function interceptNextHttpRequest() {
  return new Promise((resolve) => {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // Override open and send methods
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      this._url = url; // Save the URL for later
      originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function(body) {
      // Intercept the 'load' event to detect when the request finishes
      this.addEventListener('load', function() {
        // Restore the original XMLHttpRequest methods
        XMLHttpRequest.prototype.open = originalOpen;
        XMLHttpRequest.prototype.send = originalSend;

        // Resolve the promise after the request is finished
        resolve(this);
      });

      originalSend.apply(this, arguments);
    };
  });
}
////////////////////////////////////////////////////////////////////////////////////////
/*  END OF IMAGE UPLOAD CODE */
////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////
/*  START OF DOCUMENT LIST CODE */
////////////////////////////////////////////////////////////////////////////////////////

function getDocumentsForPanel() {
  var customPanelId = 'document-list-panel';
  var customPanel = document.getElementById(customPanelId);
  var customPanelContent = document.querySelector(`#${customPanelId} .content-area`);
  
  if (customPanel) {
      loadDocumentList(getObj(customPanelId).pui.properties["user defined data"], customPanelContent);
  }
  
  // Function to load and display the document list inside the panel
  function loadDocumentList(filesLocation, container) {
    if (!filesLocation) {
      container.innerHTML = "<p>Error loading documents.</p>"; // Handle error case
      return;
    }
      
    fetch(`/documents/${filesLocation}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();  // Parse as text because it's HTML
      })
      .then(html => {
        // Create a temporary DOM element to parse the HTML
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
    
        // Get all <a> elements (links to files) within the list
        var links = doc.querySelectorAll('ul li a');
        let documentList = "<ul style='padding-left: 10px;'>"; // Create unordered list with some padding for better display
    
        // Iterate over the links and append them to the documentList
        links.forEach(link => {
          let fileName = link.getAttribute('href');
          if (fileName !== '../' && fileName !== '/documents/') { // Skip the parent directory link
            documentList += `<li class="doc-li"><a href="/documents/orders/${fileName}" target="_blank">${decodeURIComponent(fileName)}</a></li>`;
          }
        });
    
        documentList += "</ul>";
    
        // Insert the generated HTML into the panel
        container.innerHTML = documentList;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        container.innerHTML = "<p>Error loading documents.</p>"; // Handle error case
      });
  }
}


////////////////////////////////////////////////////////////////////////////////////////
/*  END OF DOCUMENT LIST CODE */
////////////////////////////////////////////////////////////////////////////////////////