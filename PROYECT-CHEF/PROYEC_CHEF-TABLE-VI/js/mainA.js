const tbodyId = "tbody";
const firebaseAdmin = new FirebaseAdminUser(tbodyId);
const formUser = document.getElementById("formUser");
const btnSubmit = document.getElementById("btnSubmit");
const preload = document.getElementById("preload");
const myModal = new bootstrap.Modal(document.getElementById("modalApp"), {});
const textConfirm = "Press a button to Delete!\nAccept or Cancel.";

var getIdAdmin = "";
var validate = true;

function getDataAdmin() {
  showPreload();
  firebaseAdmin.getDataAdmin().then((result) => {
    hidePreload();
    console.log();
  });
}

function createAdmin() {
  validate = true;
  cleanForm();
  enableForm();
  btnSubmit.disabled = false;
  showModal();
}

function showAdmin(id) {
  cleanForm();
  disableForm();
  showPreload();
  firebaseAdmin.getDataAdminById(id).then((data) => {
    setDataForm(data);
    hidePreload();
  });
  btnSubmit.disabled = true;
  showModal();
}

function editAdmin(id) {
  validate = false;
  cleanForm();
  enableForm();
  showPreload();
  getIdAdmin = id;
  firebaseAdmin.getDataAdminById(id).then((data) => {
    setDataForm(data);
    hidePreload();
  });
  btnSubmit.disabled = false;
  showModal();
}

function deleteAdmin(id) {
  console.log("ID a eliminar:", id);
  if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
    showPreload();
    firebaseAdmin
      .setDeleteAdmin(id)
      .then((data) => {
        getDataAdmin();
        hidePreload();
      })
      .catch((error) => {
        console.error("Error al eliminar el registro:", error);
        hidePreload();
      });
  }
}

formUser.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputId = document.getElementById("id");
  if (inputId.value.length === 0) {
    inputId.value = uuid.v1();
  }
  let elements = formUser.querySelectorAll("input");
  var jsonArray = {};
  for (const elem of elements) {
    jsonArray[elem.id] = elem.value;
  }
  if (validate) {
    firebaseAdmin.setCreateAdmin(jsonArray).then(hideModal());
  } else {
    firebaseAdmin.setUpdateAdmin(getIdAdmin, jsonArray).then(hideModal());
  }
});

function showModal() {
  myModal.show();
}

function hideModal() {
  myModal.hide();
}

function cleanForm() {
  formUser.reset();
}

function enableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
}

function disableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
}

function setDataForm(data) {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] && elements[i].id && data && data[elements[i].id]) {
      document.getElementById(elements[i].id).value = data[elements[i].id];
    }
  }
}

function showPreload() {
  if (preload) {
    // Verificar si preload no es null
    preload.style.display = "block";
  }
}
function hidePreload() {
  if (preload) {
    preload.style.display = "none";
  }
}

window.addEventListener("load", (e) => {
  getDataAdmin();
});
