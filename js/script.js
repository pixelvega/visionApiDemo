let imageUrl = 'https://storage.googleapis.com/t3chbucket/images/';

document.addEventListener("DOMContentLoaded", function() {
    //Initialize api with api key
    gapi.load('client', start);   
    
    //Buttons functions
    document.getElementById("btn-test-api").addEventListener('click', function () {
      getInfoImage('faces/face5.jpeg', demostrationExecute)
    });

    document.getElementById("btn-exercise-1").addEventListener('click', function () {
      getInfoImage('faces/face2.jpg', exercise1Execute); 
    });

    document.getElementById("btn-extra").addEventListener('click', function () {
      getInfoImage('architecture/locations/location2.jpg', extraExecute);
    });

    //Tab function with jquery
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });    
});

function start() {
  // Initializes the client with the API key and the Google Vision API.
  gapi.client.init({
    'apiKey': "AIzaSyBbUq316_3xhBPNz8Ad1i4xu7ujOHq8RXQ",
    'discoveryDocs': ['https://content.googleapis.com/discovery/v1/apis/vision/v1/rest']    
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

function getInfoImage(imageName, functionToExecute) {
  return gapi.client.vision.images.annotate({
    "resource": {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": imageUrl + imageName
            }
          },
          "features": [
            {
              "type": "IMAGE_PROPERTIES"
            },
            {
              "type": "TYPE_UNSPECIFIED"
            },
            {
              "type": "FACE_DETECTION"
            },
            {
              "type": "OBJECT_LOCALIZATION"
            },
            {
              "type": "LABEL_DETECTION"
            },
            {
              "type": "LANDMARK_DETECTION"
            }
          ]
        }
      ]
    }
  })    
  .then(function(response) {
    functionToExecute(response.result);
  },
  function(err) { console.error("Execute error", err); });
}

function demostrationExecute (infoImage){ 
  //Transform info to json data
  let jsonInfoImage = JSON.stringify(infoImage, undefined, 4);
  document.getElementById("code-json-demostration").innerHTML = jsonInfoImage;
  document.getElementsByClassName('col-btn-test')[0].style.display = 'none';
  
  //Functions get faces, hapiness and labels info
  document.getElementsByClassName('numberFaces')[0].textContent   = detectFaces(infoImage);
  detectHappiness(infoImage);
  detectLabels(infoImage);
  
  document.getElementsByClassName('info-test-image')[0].style.display = 'block'; 
  document.getElementsByClassName('info-test-image')[1].style.display = 'block';     
}


function exercise1Execute (infoImage){  
  let jsonInfoImage = JSON.stringify(infoImage, undefined, 4);
  document.getElementById("code-json-exercise-1").innerHTML = jsonInfoImage;
  document.getElementsByClassName('col-btn-exercise-1')[0].style.display = 'none';
  document.getElementsByClassName('info-image-1')[0].style.display = 'block';
}

function extraExecute (infoImage){
  let jsonInfoImage = JSON.stringify(infoImage, undefined, 4);
  document.getElementById("code-json-extra").innerHTML = jsonInfoImage;
  document.getElementsByClassName('col-btn-extra')[0].style.display = 'none';
  document.getElementsByClassName('info-image-extra')[0].style.display = 'block';     
}

function detectFaces(infoImage){
  let faces = infoImage.responses[0].faceAnnotations;
  return faces.length;
}

function detectHappiness(infoImage){
    let facesArray = infoImage.responses[0].faceAnnotations;
    facesArray.forEach(index => {
        let joyListElement = document.createElement('li');
        let joyData = document.createTextNode(index.joyLikelihood);
        joyListElement.appendChild(joyData);
        document.getElementsByClassName('infoHappy')[0].appendChild(joyListElement);
    });
}

function detectLabels(infoImage){//MANU append create elem
    let arrayLabels = infoImage.responses[0].labelAnnotations;
    arrayLabels.forEach(label => {
        let labelListElement = document.createElement('li');
        let labelData = document.createTextNode(label.description);
        labelListElement.appendChild(labelData);
        document.getElementsByClassName('labelsInfo')[0].appendChild(labelListElement);
    });
}
