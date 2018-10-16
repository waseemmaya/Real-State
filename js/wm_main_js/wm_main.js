var db = firebase.database();

var count = 2;

var a = document.getElementById("main");

fetchAll = () => {
  count = count + 2;
  let locationRef = db.ref("All").limitToLast(count);

  locationRef.on("child_added", snap => {
    let data = snap.val();
    let key = snap.key;
    a.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4">
                    <div class="caviar-single-dish wow fadeInUp" data-wow-delay="0.5s">
                        <img src="${data.adImages[0]}" alt="">
                        <div class="dish-info">
                            <h6 class="dish-name">${data.name}</h6>
                            <p class="dish-price"><a onclick="openAd('${key}')" href="javascript:void(0)">click</a></p>
                        </div>
                    </div>
                </div>
    `;
  });
};


catHome = () => {
  let a = document.getElementById("catWise");
  let locationRef = db
    .ref("All")
    .orderByChild("category")
    .equalTo("Home");
  locationRef.on("child_added", snap => {
    let data = snap.val();
    let key = snap.key;
    a.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4">
                    <div class="caviar-single-dish wow fadeInUp" data-wow-delay="0.5s">
                        <img src="${data.adImages[0]}" alt="">
                        <div class="dish-info">
                            <h6 class="dish-name">${data.name}</h6>
                            <p class="dish-price"><a onclick="openAd('${key}')" href="javascript:void(0)">${
      data.category
    }</a></p>
                        </div>
                    </div>
                </div>
    `;
  });

  return false;
};

catFlat = () => {
  let a = document.getElementById("catWise");
  let locationRef = db
    .ref("All")
    .orderByChild("category")
    .equalTo("Flat");

  locationRef.on("child_added", snap => {
    let data = snap.val();
    let key = snap.key;
    a.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4">
                    <div class="caviar-single-dish wow fadeInUp" data-wow-delay="0.5s">
                        <img src="${data.adImages[0]}" alt="">
                        <div class="dish-info">
                            <h6 class="dish-name">${data.name}</h6>
                            <p class="dish-price"><a onclick="openAd('${key}')" href="javascript:void(0)">${
      data.category
    }</a></p>
                        </div>
                    </div>
                </div>
    `;
  });

  return false;
};

catBungalow = () => {
  let a = document.getElementById("catWise");
  let locationRef = db
    .ref("All")
    .orderByChild("category")
    .equalTo("Bungalow");

  locationRef.on("child_added", snap => {
    let data = snap.val();
    let key = snap.key;
    a.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4">
                    <div class="caviar-single-dish wow fadeInUp" data-wow-delay="0.5s">
                        <img src="${data.adImages[0]}" alt="">
                        <div class="dish-info">
                            <h6 class="dish-name">${data.name}</h6>
                            <p class="dish-price"><a onclick="openAd('${key}')" href="javascript:void(0)">${
      data.category
    }</a></p>
                        </div>
                    </div>
                </div>
    `;
  });

  return false;
};

function openAd(key) {
  localStorage.setItem("adID", key);
  location.href = "View_Post.html";
  return false;
}



function adView() {
  let adId = localStorage.getItem("adID");

  let slider = document.getElementById("slider");
  let imgRef = db.ref(`All/${adId}`);
  imgRef.on("value", snap => {
    let data = snap.val();
    slider.innerHTML += `
    <div class="text-block"> 
    <a href="${
      data.link
    }"><img class="mapicon" src="https://image.flaticon.com/icons/svg/149/149060.svg" alt="icon"/>
    <span class="mapLink">Map</span></a>
  </div>
    `;
    data.adImages.map(val => {
      return (slider.innerHTML += `
      <img class="mySlides sliderImages" src="${val}" style='width:100%'>
      
      `);
    });
  });
  dataView();
}

function dataView() {
  let adId = localStorage.getItem("adID");
  let desc = document.getElementById("desc");
  let title = document.getElementById("title");

  let table = document.getElementById("table");
  let dataRef = db.ref(`All/${adId}`);
  dataRef.on("value", snap => {
    let data = snap.val();
    title.innerText = data.name;
    table.innerHTML = `
    <tbody>
    <tr>
      <td>Category</td>
      <td>${data.category}</td>
      <td>Area</td>
      <td>${data.area} ${data.areaUnit}</td>
    </tr>
    <tr>
      <td>Price</td>
      <td>PKR ${data.price} ${data.priceUnit}</td>
      <td>Purpose</td>
      <td>${data.purpose}</td>
    </tr>
    <tr>
<td>Status</td>
<td>${data.isSold ? "Sold" : "Available"}</td>
   
    <td>Bedroom(s)</td>
    <td>${data.bedroom}</td>
  </tr>
  <tr>
  <td>Bathroom(s)</td>
  <td>${data.bathroom}</td>
  <td>Posted at</td>
  <td>${data.date}</td>
</tr>
<tr>
<td>Location</td>
<td colspan="4">${data.address}</td>
</tr>

  </tbody>
    `;
    desc.innerHTML += `
    <h2>Discription</h2>
    <div>
    <p id="paragraph">
    ${data.description}
  </p>
    </div>
    `;
  });
}
