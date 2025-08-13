pui.genie['subfile'] = true;
var hybridSkin = {};

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
    var backdrop = newElement(5, 15, "img", "/profoundui/proddata/images/login.gif", "backdrop_image");
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
    
    var msg = get('D_24_1');
    if (msg!='' && pui.genie.alertMsg=='') {
      pui.genie.alertMsg = msg;
      if (pui.genie.alertMsg.substr(0,3) == 'CPF') pui.genie.alertMsg = pui.genie.alertMsg.substr(8);
      if (pui.genie.alertMsg.substr(0,1) == '-') pui.genie.alertMsg = pui.genie.alertMsg.substr(1);
    }
    hideElement('D_24_1');
    hybridSkin.signon = true;
  }
  else {
    hybridSkin.signon = false;
  }
  pui["loading animation"]["css"] = 'pui-hybrid-animation';
  if (pui.genie.afterInit == null) {
    pui.genie.afterInit = function() {
    
      if (pui.genie.displaySize == 132) hybridSkin.screenWidth = 1500;
      else hybridSkin.screenWidth = 775;    
    
      hybridSkin.displayLogo();
      hybridSkin.displayUser();
      hybridSkin.removeHeader();
      hybridSkin.createHeader();
      hybridSkin.createSideMenu();
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

  //upload button on work with items page
  // if(detectScreen('D_2_21','            Work With Items')) {
  //   //show only on this screen
  //   document.getElementById("myButton").style.display = "block";
  // }
  // else{
  //   document.getElementById("myButton").style.display = "none";
  // }
}

// function navigateToWDSLMainMenu() {
//     if (typeof pui !== 'undefined' && pui.genie && typeof pui.genie.navigate === 'function') {
//         pui.genie.navigate('D_2_31');
//     } else {
//         console.error('Navigation function not defined or pui.genie object not available.');
//     }
// }
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


hybridSkin.resizeArea = function() {
  if (pui.genie.middleDiv != null) {
    var div5250 = getObj("5250");
    if (div5250 != null && div5250.style.width != "100%") {
      var windowWidth =  pui.getWindowSize().width;
      if (pui.genie.displaySize == 132) {
        pui.genie.middleDiv.style.height = "640px";
        div5250.style.position = "absolute";
        var position = (windowWidth - 950) / 2;
        if (position < 180) position = 180;
        div5250.style.left = position + "px";
      }
      else {
        pui.genie.middleDiv.style.height = "560px";
        div5250.style.position = "absolute";
        var position = (windowWidth - 620) / 2;
        if (position < 180) position = 180;
        div5250.style.left = position + "px";
      }
    }
  }
}


hybridSkin.displayLogo = function(dspf) {
  var logo = "logo.png";
  var logoElement = newElement("img", "/profoundui/userdata/genie skins/Codeworks/" + logo);
  logoElement.style.top = "-72px";
  if (dspf) logoElement.style.left = "5px";
  else logoElement.style.left = "-170px";
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
          div.style.fontSize = "15px";
        }
      }    
    }    
  }
}

hybridSkin.createSideMenu = function() {
  var inputs = document.getElementById("5250").getElementsByTagName("input");
  var buttons = [];
  var dups = {};
  var gotEnter = false;
  for (var i = 0; i < inputs.length; i++) {  
    var input = inputs[i];
    if (input.type != "button" || input.fkey == null)  continue;
    // don't add a nondisplay button to the side menu
    if (input.className.indexOf("hide") >= 0)  continue; 
    
    input.style.visibility = "hidden";
    if (dups[input.value] == true) continue;
    buttons.push({    
      fkey: input.fkey,
      text: input.value
    });
    dups[input.value] = true;
    if (input.fkey.toLowerCase() == "enter") gotEnter = true;    
  }
  
  // Include buttons from window formats
  var windowDivs = document.getElementById("5250").getElementsByClassName("Window");
  for (var j = 0; j < windowDivs.length; j++) {
    var windowDiv = windowDivs[j];
    var windowInputs = windowDiv.getElementsByTagName("input");
    for (var k = 0; k < windowInputs.length; k++) {
      var windowInput = windowInputs[k];
      if (windowInput.type == "button" && windowInput.fkey != null) {
        var buttonValue = windowInput.value;
        if (!dups[buttonValue]) {
          buttons.push({
            fkey: windowInput.fkey,
            text: buttonValue
          });
          dups[buttonValue] = true;
          windowInput.style.visibility = "hidden";
          if (windowInput.fkey.toLowerCase() == "enter") gotEnter = true;
        }
      }
    }
  }
  
  if (buttons.length > 0) {
    // sort buttons
    buttons.sort(function(a, b) {
      if (a.fkey < b.fkey) return -1;    
      else if (a.fkey == b.fkey) return 0;    
      else return 1;    
    });
    if (!gotEnter) {
      buttons.splice(0, 0, {
        fkey: "Enter",
        text: "Continue"
      });
    }
    
    // create panel
    var panel = newElement("div", "", "side");
    var panelTop = 75;
    if (hybridSkin.headingRows == 2) panelTop -= pui.multY;
    panel.style.top = panelTop + "px";
    panel.style.left = "-5px!important";
    panel.style.width = "165px";
    var height = buttons.length * 30 + 100;
    if (height < 450) height = 450;
    panel.style.height = height + "px";

    panel.className = "hybrid-actions";
  
    var top = 90;
    if (hybridSkin.headingRows == 2) top -= pui.multY;
    for (var i = 0; i < buttons.length; i++) {  
      var arrow = newElement("div", "", "arrow" + i);
      arrow.className = "fkey-arrow";
      arrow.innerHTML = "&gt;";
      arrow.style.left = "-102px";
      var fkeyLink = newElement("div", "", "fkey" + i);
      fkeyLink.className = "fkey-link";
      fkeyLink.innerHTML = buttons[i].text;
      fkeyLink.style.width = "140px";
      fkeyLink.style.whiteSpace = "normal";
      fkeyLink.fkey = buttons[i].fkey;
      fkeyLink.onclick = function(e) {
        var target = getTarget(e);
        if (target.fkey == null) target = target.parentNode;
        var fkey = target.fkey;
        pressKey(fkey);
      }
      
      if (i > 0) {
        top = (prevLink.offsetTop + prevLink.offsetHeight + 7);
      }
      arrow.style.top = (top-2) + "px";
      fkeyLink.style.top = top + "px";
      
      var prevLink = fkeyLink;  
    }
    document.body.appendChild(panel); // Append the panel to the body
  }
}

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

  if (key == "Help" && pui["5250"]["state"] == "P") {
  
    key = "ErrorHelp";
  
  }

  pressKey(key);
  
  if (Tab.autoHideKeypad == true) {
  
    Tab.hideKeypad(e);
  
  }
  else {

    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  
  }
  
}

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