var db = firebase.database();
var imgArr;
var imgName = [];
let uploadCount = 1;

var inputElement = document.getElementById("images");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  document.getElementById("showImages").innerHTML = "";
  if (this.files.length > 3) {
    swal("Only first 3 Images will be uploaded");
    document.getElementById("showImages").innerHTML = "";
  } else {
    imgArr = this.files;
  }
  console.log("img", imgArr);
}

var imgLinks = [];

function uploadImages(i) {
  var filename = Math.floor(100444234000 + Math.random() * 9032012000);
  imgName.push(filename);
  console.log(imgName);

  var file = imgArr[i];
  var metadata = {
    contentType: file.type
  };
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child("Images/" + filename).put(file, metadata);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          // console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING:
          // console.log("Upload is running");
          break;
      }
    },
    function(error) {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          break;
      }
    },
    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // console.log("File available at", downloadURL);
        imgLinks.push(downloadURL);
        console.log("upco", uploadCount);

        if (uploadCount === imgArr.length) {
          console.log("add chala2");
          add();
        } else {
          uploadCount++;
        }
        // console.log('downloaded', imgLinks);
      });
    }
  );
}

function imgLoop() {
  // e.preventDefault();
  console.log("upload", imgArr.length);
  for (let i = 0; i < imgArr.length; i++) {
    uploadImages(i);
    console.log("add chala1");
  }
  return false;
}

function add() {
  let name = document.getElementById("name").value;
  let priceUnit = document.getElementById("priceUnit").value;
  let price = document.getElementById("price").value;
  let purpose = document.getElementById("purpose").value;
  let category = document.getElementById("category").value;
  let bedroom = document.getElementById("bedroom").value;
  let bathroom = document.getElementById("bathroom").value;
  let floor = document.getElementById("floor").value;
  let areaUnit = document.getElementById("areaUnit").value;
  let area = document.getElementById("area").value;
  let description = document.getElementById("description").value;
  description = description.replace(/\r\n|\n/g,'<br>');
  let link = document.getElementById("link").value;
  let address = document.getElementById("address").value;

  let adImages = imgLinks;

  let obj = {
    name: name,
    priceUnit,
    price,
    purpose,
    category,
    bedroom,
    bathroom,
    floor,
    areaUnit,
    area,
    description,
    address,
    link,
    isSold: false,
    imgName: imgName,
    adImages: adImages,
    date: new Date().toDateString()
  };
  let locationRef = db.ref("All");
  locationRef.push(obj);
  swal("Good job!", "Hurray your task has been posted!", "success").then(
    value => {
      location.href = "index.html";
    }
  );
}
