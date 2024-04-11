class FirebaseInventarioUser {
  constructor(idTbody) {
    this.objTbody = document.getElementById(idTbody);
    this.URL =
      "https://api-rest-cheftable-default-rtdb.firebaseio.com/api/inventarios";
  }

  async getDataInventario() {
    return fetch(this.URL + ".json")
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        this.setTableInventario(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async getDataInventarioById(id) {
    return fetch(this.URL + "/" + id + ".json")
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setTableInventario(data) {
    let contRow = 1;
    let rowTable = "";
    let btnActions = "";
    for (const inventario in data) {
      let rowId = "row-" + inventario;
      btnActions =
        '<div class="btn-group " role="group" aria-label="Basic mixed styles example">' +
        '<button type="button" onclick="showInventario(\'' +
        inventario +
        '\')" class="btn btn-info"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/eye-fill.svg"></button>' +
        '<button type="button" onclick="editInventario(\'' +
        inventario +
        '\')" class="btn btn-warning"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/pencil-square.svg"></button>' +
        '<button type="button" onclick="deleteInventario(\'' +
        inventario +
        '\')" class="btn btn-danger"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/trash3-fill.svg"></button>' +
        "</div>";
      rowTable +=
        "<tr id='" +
        rowId +
        "'>" +
        "<td>" +
        contRow +
        "</td>" +
        "<td>" +
        data[inventario].producto +
        "</td>" +
        "<td>" +
        data[inventario].cantidad +
        "</td>" +
        "<td>" +
        data[inventario].categoria +
        "</td>" +
        "<td class='text-center'>" +
        data[inventario].proveedor +
        "</td>" +
        "<td class='text-center'>" +
        btnActions +
        "</td>" +
        "<tr>";
      contRow++;
    }
    this.objTbody.innerHTML = rowTable;
  }

  async setCreateInventario(data) {
    return fetch(this.URL + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        this.getDataInventario();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async setUpdateInventario(id, data) {
    return fetch(this.URL + "/" + id + ".json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        this.getDataInventario();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async setDeleteInventario(id) {
    return fetch(this.URL + "/" + id + ".json", {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }
}
