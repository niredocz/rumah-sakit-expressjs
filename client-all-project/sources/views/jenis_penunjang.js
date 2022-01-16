import { JetView } from "webix-jet";

export default class jenis_penunjang extends JetView {
  config() {
    var ui = {
      rows: [
        { view: "template", template: "Data Jenis Penunjang", type: "header" },
        {
          view: "toolbar",
          paddingY: 2,
          cols: [
            {
              view: "button",
              click: () => this.tambahjenis_penunjang(),
              label: "Tambah",
              type: "iconButton",
              width: 100,
            },
            {
              view: "button",
              click: () => this.refreshjenis_penunjang(),
              label: "Refresh",
              type: "iconButton",
              width: 100,
            },
            { template: "", borderless: true },
            {
              view: "button",
              click: () => this.ubahjenis_penunjang(),
              label: "Ubah",
              type: "iconButton",
              width: 100,
            },
            {
              view: "button",
              click: () => this.hapusjenis_penunjang(),
              label: "Hapus",
              type: "iconButton",
              width: 100,
            },
          ],
        },
        {
          view: "datatable",
          select: true,
          id: "tabeljenis_penunjang",
          columns: [
            {
              id: "id",
              header: ["Id", { content: "textFilter" }],
              width: 100,
            },
            {
              id: "nama",
              header: ["Nama", { content: "textFilter" }],
              width: 300,
            },
            {
              id: "biaya",
              header: ["Biaya", { content: "textFilter" }],
              width: 300,
            },
          ],
          pager: "pagerjenis_penunjang",
        },
        {
          view: "pager",
          id: "pagerjenis_penunjang",
          template: "{common.prev()} {common.pages()} {common.next()}",
          size: 20,
          group: 5,
        },
      ],
    };
    return ui;
  }
  formjenis_penunjang() {
    return {
      view: "window",
      id: "windowFormjenis_penunjang",
      width: 600,
      position: "center",
      modal: true,
      move: true,
      head: {
        view: "toolbar",
        margin: -4,
        cols: [
          { view: "label", label: "Tambah", id: "judulFormjenis_penunjang" },
          {
            view: "button",
            type: "iconButton",
            label: "Tutup",
            width: 80,
            click: "$$('windowFormjenis_penunjang').hide();",
          },
        ],
      },
      body: {
        view: "form",
        id: "formjenis_penunjang",
        borderless: true,
        elements: [
          {
            view: "text",
            label: "Id",
            name: "id",
            labelWidth: 100,
            required: true,
          },
          {
            view: "text",
            label: "Nama",
            name: "nama",
            labelWidth: 100,
            required: true,
          },
          {
            view: "text",
            label: "Biaya",
            name: "biaya",
            labelWidth: 100,
            required: true,
          },
          {
            cols: [
              { template: "", borderless: true },
              {
                view: "button",
                click: () => this.simpanjenis_penunjang(),
                label: "Simpan",
                width: 120,
                borderless: true,
              },
              { template: "", borderless: true },
            ],
          },
        ],
      },
    };
  }
  refreshjenis_penunjang() {
    $$("tabeljenis_penunjang").clearAll();
    $$("tabeljenis_penunjang").load("http://localhost:5000/jenis_penunjang");
  }
  tambahjenis_penunjang() {
    $$("windowFormjenis_penunjang").show();
    $$("formjenis_penunjang").clear();
    $$("judulFormjenis_penunjang").setValue("Form Tambah jenis_penunjang");
  }
  ubahjenis_penunjang() {
    var row = $$("tabeljenis_penunjang").getSelectedItem();
    if (row) {
      $$("windowFormjenis_penunjang").show();
      $$("formjenis_penunjang").clear();
      $$("formjenis_penunjang").setValues(row);
      $$("judulFormjenis_penunjang").setValue("Form Ubah jenis_penunjang");
    } else {
      webix.alert("Tidak ada data akun yang dipilih");
    }
  }
  simpanjenis_penunjang() {
    var context = this;
    if ($$("formjenis_penunjang").validate()) {
      var dataKirim = $$("formjenis_penunjang").getValues();
      var callbackHasil = {
        success: function (response, data, xhr) {
          $$("windowFormjenis_penunjang").enable();
          var response = JSON.parse(response);
          webix.alert(response.pesan);
          if (response.status == true) {
            context.refreshjenis_penunjang();
            $$("windowFormjenis_penunjang").hide();
          }
        },
        error: function (text, data, xhr) {
          webix.alert(text);
          $$("windowFormjenis_penunjang").enable();
        },
      };
      $$("windowFormjenis_penunjang").disable();
      if (dataKirim.createdAt === undefined) {
        webix
          .ajax()
          .post("http://localhost:5000/jenis_penunjang", dataKirim, callbackHasil);
      } else {
        webix
          .ajax()
          .put("http://localhost:5000/jenis_penunjang", dataKirim, callbackHasil);
      }
    }
  }
  hapusjenis_penunjang() {
    var row = $$("tabeljenis_penunjang").getSelectedItem();
    if (row) {
      var context = this;
      var callbackHasil = {
        success: function (response, data, xhr) {
          $$("windowFormjenis_penunjang").enable();
          var response = JSON.parse(response);
          webix.alert(response.pesan);
          if (response.status == true) {
            context.refreshjenis_penunjang();
            $$("windowFormjenis_penunjang").hide();
          }
        },
        error: function (text, data, xhr) {
          webix.alert(text);
          $$("windowFormjenis_penunjang").enable();
        },
      };
      webix.confirm({
        type: "confirm-warning",
        title: "Konfirmasi",
        ok: "Yakin",
        cancel: "Batal",
        text: "Anda yakin ingin menghapus data ini ?",
        callback: function (jwb) {
          if (jwb) {
            webix
              .ajax()
              .del("http://localhost:5000/jenis_penunjang", row, callbackHasil);
          }
        },
      });
    } else {
      webix.alert("Tidak ada data yang dipilih");
    }
  }
  init() {
    this.ui(this.formjenis_penunjang());
  }
  ready() {
    this.refreshjenis_penunjang();
  }
}
