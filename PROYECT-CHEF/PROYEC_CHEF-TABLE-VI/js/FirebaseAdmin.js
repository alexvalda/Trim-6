class FirebaseAdminUser {
  constructor(idTbody) {
    this.objTbody = document.getElementById(idTbody);
    this.URL =
      "https://api-rest-cheftable-default-rtdb.firebaseio.com/api/user";
  }

  async getDataAdmin() {
    return fetch(this.URL + ".json")
      .then((res) => {
        if (!res.ok) {
          console.log("Result: Problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        this.setTableAdmin(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async getDataAdminById(id) {
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

  setTableAdmin(data) {
    let contRow = 1;
    let rowTable = "";
    let btnActions = "";
    for (const admin in data) {
      let rowId = "row-" + admin;
      btnActions =
        '<div class="btn-group " role="group" aria-label="Basic mixed styles example">' +
        '<button type="button" onclick="showAdmin(\'' +
        admin +
        '\')" class="btn btn-info"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/eye-fill.svg"></button>' +
        '<button type="button" onclick="editAdmin(\'' +
        admin +
        '\')" class="btn btn-warning"><img class="img img-fluid" src="/PROYEC_CHEF-TABLE-VI/img/icons/pencil-square.svg"></button>' +
        '<button type="button" onclick="deleteAdmin(\'' +
        admin +
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
        data[admin].name +
        "</td>" +
        "<td>" +
        data[admin].email +
        "</td>" +
        "<td>" +
        data[admin].tipo +
        "</td>" +
        "<td class='text-center'>" +
        data[admin].estado +
        "</td>" +
        "<td class='text-center'>" +
        btnActions +
        "</td>" +
        "<tr>";
      contRow++;
    }
    this.objTbody.innerHTML = rowTable;
  }

  async setCreateAdmin(data) {
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
        this.getDataAdmin();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async setUpdateAdmin(id, data) {
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
        this.getDataAdmin();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }

  async setDeleteAdmin(id) {
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
