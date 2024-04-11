class FirebaseComandaUser {
  constructor(idTbody) {
    this.objTbody = document.getElementById(idTbody);
    this.URL =
      "https://api-rest-cheftable-default-rtdb.firebaseio.com/api/comanda";
  }

  async getDataComanda() {
    return fetch(this.URL + ".json")
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        this.setTableComanda(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async getDataComandaById(id) {
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

  setTableComanda(data) {
    let contRow = 1;
    let rowTable = "";
    let btnActions = "";
    for (const comanda in data) {
      let rowId = "row-" + comanda;
      btnActions =
        '<div class="btn-group " role="group" aria-label="Basic mixed styles example">' +
        '<button type="button" onclick="showComanda(\'' +
        comanda +
        '\')" class="btn btn-info"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/eye-fill.svg"></button>' +
        '<button type="button" onclick="editComanda(\'' +
        comanda +
        '\')" class="btn btn-warning"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/pencil-square.svg"></button>' +
        '<button type="button" onclick="deleteComanda(\'' +
        comanda +
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
        data[comanda].menu +
        "</td>" +
        "<td>" +
        data[comanda].precio +
        "</td>" +
        "<td>" +
        data[comanda].fecha +
        "</td>" +
        "<td class='text-center'>" +
        btnActions +
        "</td>" +
        "<tr>";
      contRow++;
    }
    this.objTbody.innerHTML = rowTable;
  }

  async setCreateComanda(data) {
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
        this.getDataComanda();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async setUpdateComanda(id, data) {
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
        this.getDataComanda();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async setDeleteComanda(id) {
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
