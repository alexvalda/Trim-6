// Constante que representa el ID del cuerpo de la tabla donde se mostrarán los datos del inventario
const tbodyId = "tbody";
const firebaseComanda = new FirebaseComandaUser(tbodyId); // Instancia de FirebaseInventarioUser para interactuar con la base de datos del inventario
const formUser = document.getElementById("formUser"); // Elemento del formulario y botón de envío
const btnSubmit = document.getElementById("btnSubmit");
const preload = document.getElementById("preload"); // Elemento de carga y modal de Bootstrap
const myModal = new bootstrap.Modal(document.getElementById("modalApp"), {});
const textConfirm = "Press a button to Delete!\nAccept or Cancel."; // Mensaje de confirmación para la eliminación de un registro
var getIdComanda = ""; // Variable para almacenar el ID del registro de inventario
var validate = true; // Variable para validar si se está creando un nuevo registro o editando uno existente

// Función para obtener los datos del inventario desde Firebase y mostrarlos en la tabla
function getDataComanda() {
  showPreload(); // Mostrar indicador de carga
  firebaseComanda.getDataComanda().then((result) => {
    hidePreload(); // Ocultar indicador de carga
    console.log(); // Realizar alguna acción con los datos obtenidos
  });
}

// Función para preparar el formulario para crear un nuevo registro
function createComanda() {
  validate = true; // Establecer modo de validación como verdadero
  cleanForm(); // Limpiar el formulario
  enableForm(); // Habilitar los campos del formulario
  btnSubmit.disabled = false; // Habilitar el botón de envío
  showModal(); // Mostrar el modal
}

// Función para mostrar los detalles de un registro de inventario
function showComanda(id) {
  cleanForm(); // Limpiar el formulario
  disableForm(); // Deshabilitar los campos del formulario
  showPreload(); // Mostrar indicador de carga
  firebaseComanda.getDataComandaById(id).then((data) => {
    setDataForm(data); // Establecer los datos en el formulario
    hidePreload(); // Ocultar indicador de carga
  });
  btnSubmit.disabled = true; // Deshabilitar el botón de envío
  showModal(); // Mostrar el modal
}

// Función para preparar el formulario para editar un registro existente
function editComanda(id) {
  validate = false; // Establecer modo de validación como falso
  cleanForm(); // Limpiar el formulario
  enableForm(); // Habilitar los campos del formulario
  showPreload(); // Mostrar indicador de carga
  getIdComanda = id; // Almacenar el ID del registro que se está editando
  firebaseComanda.getDataComandaById(id).then((data) => {
    setDataForm(data); // Establecer los datos en el formulario
    hidePreload(); // Ocultar indicador de carga
  });
  btnSubmit.disabled = false; // Habilitar el botón de envío
  showModal(); // Mostrar el modal
}

// Función para eliminar un registro de inventario
function deleteComanda(id) {
  console.log("ID a eliminar:", id);
  if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
    showPreload(); // Mostrar indicador de carga
    firebaseComanda
      .setDeleteComanda(id)
      .then((data) => {
        getDataComanda(); // Recargar los datos del inventario
        hidePreload(); // Ocultar indicador de carga
      })
      .catch((error) => {
        console.error("Error al eliminar el registro:", error); // Manejar errores
        hidePreload(); // Ocultar indicador de carga
      });
  }
}

// Evento de envío del formulario
formUser.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  let inputId = document.getElementById("id");
  if (inputId.value.length === 0) {
    inputId.value = uuid.v1(); // Generar un nuevo ID si no se proporciona uno
  }
  let elements = formUser.querySelectorAll("input");
  var jsonArray = {};
  // Construir un objeto JSON con los datos del formulario
  for (const elem of elements) {
    jsonArray[elem.id] = elem.value;
  }
  // Verificar si se está creando un nuevo registro o editando uno existente, y llamar al método correspondiente en Firebase
  if (validate) {
    firebaseComanda.setCreateComanda(jsonArray).then(hideModal()); // Crear un nuevo registro
  } else {
    firebaseComanda.setUpdateComanda(getIdComanda, jsonArray).then(hideModal()); // Actualizar un registro existente
  }
});

// Función para mostrar el modal
function showModal() {
  myModal.show();
}

// Función para ocultar el modal
function hideModal() {
  myModal.hide();
}

// Función para limpiar el formulario
function cleanForm() {
  formUser.reset();
}

// Función para habilitar los campos del formulario
function enableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
}

// Función para deshabilitar los campos del formulario
function disableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
}

// Función para establecer datos en el formulario
function setDataForm(data) {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] && elements[i].id && data && data[elements[i].id]) {
      document.getElementById(elements[i].id).value = data[elements[i].id];
    }
  }
}

// Función para mostrar el indicador de carga
function showPreload() {
  if (preload) {
    // Verificar si preload no es null
    preload.style.display = "block";
  }
}

// Función para ocultar el indicador de carga
function hidePreload() {
  if (preload) {
    preload.style.display = "none";
  }
}

// Evento de carga de la ventana para cargar los datos del inventario al abrir la página
window.addEventListener("load", (e) => {
  getDataComanda();
});
