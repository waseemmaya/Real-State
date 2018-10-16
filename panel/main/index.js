var db = firebase.database();

function getdata() {
  let a = document.getElementById("main");

  let dataRef = db.ref("All");
  dataRef.on("child_added", snap => {
    let data = snap.val();
    let key = snap.key;

    a.innerHTML += `
    <tr id="${key}">
                    <td>${data.name}</td>
                    <td>${data.price}</td>
                    <td>${data.address}</td>
                    <td><button onClick="edit('${key}')" class="btn btn-primary btn-sm float-right">Edit</button></td>
                    <td><button class="btn btn-danger btn-sm float-right" onClick="delTask('${key}')">Delete</button></td>                    
                </tr>
    `;
  });
}

function edit(key) {
  let a = document.getElementById(key);
  let dataRef = db.ref(`All/${key}`);
  dataRef.once("value", snap => {
    let data = snap.val();
    let key = snap.key;
    a.innerHTML = `
    <tr id="${key}">
    <td>
    <div class="col">
        <label for="Ad Title">Ad Title</label>
        <input type="text" id="name" class="form-control" value="${
          data.name
        }" />
    </div>
</td>
<td>
    <div class="col">
        <label for="Price">Price</label>
        <input type="text" id="price" class="form-control" value="${
          data.price
        }" />
    </div>
</td>
<td>
    <div class="col">
        <label for="Address">Address</label>
        <input type="text" id="address" class="form-control" value="${
          data.address
        }" />
    </div>
</td>

    <td><button onClick="update('${key}')" class="btn btn-secondary btn-sm float-right">Update</button>
    </td>
    <td><button onClick="cancel('${key}')" class="btn btn-warning btn-sm float-right">Cancel</button></td>                    

</tr>
    `;
  });
}

function update(key) {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let address = document.getElementById("address").value;

  var postData = {
    name,
    price,
    address
  };
  var adRef = db.ref(`All/${key}`);
  adRef.update(postData).then((val) => {
    let a = document.getElementById(key);
    let dataRef = db.ref(`All/${key}`);
    dataRef.once("value", snap => {
      let data = snap.val();
      let key = snap.key;
  
      a.innerHTML = `
      <tr id="${key}">
                      <td>${data.name}</td>
                      <td>${data.price}</td>
                      <td>${data.address}</td>
                      <td><button onClick="edit('${key}')" class="btn btn-primary btn-sm float-right">Edit</button></td>
                      <td><button class="btn btn-danger btn-sm float-right" onClick="delTask('${key}')">Delete</button></td>                    
                  </tr>
      `;
    });
      
  })
}

function cancel(key) {
  let a = document.getElementById(key);
  let dataRef = db.ref(`All/${key}`);
  dataRef.once("value", snap => {
    let data = snap.val();
    let key = snap.key;

    a.innerHTML = `
    <tr id="${key}">
                    <td>${data.name}</td>
                    <td>${data.price}</td>
                    <td>${data.address}</td>
                    <td><button onClick="edit('${key}')" class="btn btn-primary btn-sm float-right">Edit</button></td>
                    <td><button class="btn btn-danger btn-sm float-right" onClick="delTask('${key}')">Delete</button></td>                    
                </tr>
    `;
  });
}

function delTask(key) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      let delRef = db.ref(`All/${key}`);

      delRef.once("value", snap => {
        let allImages = snap.val().imgName;

        for (let i = 0; i < allImages.length; i++) {
          var storageRef = firebase.storage().ref();
          var imgRef = storageRef.child(`Images/${allImages[i]}`);
          imgRef
            .delete()
            .then(() => {
              delRef.remove();
            })
            .catch(error => {});
        }

        var elem = document.getElementById(key);
        elem.remove();
      });
      swal("Poof! Your file has been deleted!", {
        icon: "success"
      });
    } else {
      swal("Your file is safe!");
    }
  });
}
