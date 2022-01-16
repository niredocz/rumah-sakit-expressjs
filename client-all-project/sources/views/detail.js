import { JetView } from "webix-jet";

export default class detail extends JetView {
  config() {
    var ui = {
      rows: [
        { view: "template", template: "Data Transaksi Detail", type: "header" },
        {
          view: "toolbar",
          paddingY: 2,
          cols: [
            {
              view: "button",
              click: () => this.tambahdetail(),
              label: "Tambah",
              type: "iconButton",
              width: 100,
            },
            {
              view: "button",
              click: () => this.refreshdetail(),
              label: "Refresh",
              type: "iconButton",
              width: 100,
            },
            { template: "", borderless: true },
            {
              view: "button",
              click: () => this.ubahdetail(),
              label: "Ubah",
              type: "iconButton",
              width: 100,
            },
            {
              view: "button",
              click: () => this.hapusdetail(),
              label: "Hapus",
              type: "iconButton",
              width: 100,
            },
          ],
        },
        {
          view: "datatable",
          select: true,
          id: "tabeldetail",
          columns: [
            {
              id: "id",
              header: ["Id", { content: "textFilter" }],
              width: 100,
            },
            {
              id: "id_transaksi_penunjang",
              header: ["Id_Transaksi_Penunjang", { content: "textFilter" }],
              width: 300,
            },
            {
              id: "id_jenis_penunjang",
              header: ["Id_Jenis_Penunjang", { content: "textFilter" }],
              width: 300,
            },
            {
              id: "hasil",
              header: ["hasil", { content: "textFilter" }],
              width: 300,
            },
            {
              id: "biaya",
              header: ["Biaya", { content: "textFilter" }],
              width: 300,
            },
          ],
          pager: "pagerdetail",
        },
        {
          view: "pager",
          id: "pagerdetail",
          template: "{common.prev()} {common.pages()} {common.next()}",
          size: 20,
          group: 5,
        },
      ],
    };
    return ui;
  }
  formdetail() {
    return {
      view: "window",
      id: "windowFormdetail",
      width: 600,
      position: "center",
      modal: true,
      move: true,
      head: {
        view: "toolbar",
        margin: -4,
        cols: [
          { view: "label", label: "Tambah", id: "judulFormdetail" },
          {
            view: "button",
            type: "iconButton",
            label: "Tutup",
            width: 80,
            click: "$$('windowFormdetail').hide();",
          },
        ],
      },
      body: {
        view: "form",
        id: "formdetail",
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
            view: "richselect",
            label: "Id_Transaksi_Penunjang",
            name: "id_transaksi_penunjang",
            options: "http://localhost:5000/penunjangDetail/options",
            labelWidth: 100,
            required: true,
          },
          {
            view: "richselect",
            label: "Id_Jenis_Penunjang",
            name: "id_jenis_penunjang",
            options: "http://localhost:5000/penunjangDetail/options1",
            labelWidth: 100,
            required: true,
          },
          {
            view: "text",
            label: "Hasil",
            name: "hasil",
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
                click: () => this.simpandetail(),
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
  refreshdetail() {
    $$("tabeldetail").clearAll();
    $$("tabeldetail").load("http://localhost:5000/penunjangDetail");
  }
  tambahdetail() {
    $$("windowFormdetail").show();
    $$("formdetail").clear();
    $$("judulFormdetail").setValue("Form Tambah detail");
  }
  ubahdetail() {
    var row = $$("tabeldetail").getSelectedItem();
    if (row) {
      $$("windowFormdetail").show();
      $$("formdetail").clear();
      $$("formdetail").setValues(row);
      $$("judulFormdetail").setValue("Form Ubah detail");
    } else {
      webix.alert("Tidak ada data akun yang dipilih");
    }
  }
  simpandetail() {
    var context = this;
    if ($$("formdetail").validate()) {
      var dataKirim = $$("formdetail").getValues();
      var callbackHasil = {
        success: function (response, data, xhr) {
          $$("windowFormdetail").enable();
          var response = JSON.parse(response);
          webix.alert(response.pesan);
          if (response.status == true) {
            context.refreshdetail();
            $$("windowFormdetail").hide();
          }
        },
        error: function (text, data, xhr) {
          webix.alert(text);
          $$("windowFormdetail").enable();
        },
      };
      $$("windowFormdetail").disable();
      if (dataKirim.createdAt === undefined) {
        webix
          .ajax()
          .post("http://localhost:5000/penunjangDetail", dataKirim, callbackHasil);
      } else {
        webix
          .ajax()
          .put("http://localhost:5000/penunjangDetail", dataKirim, callbackHasil);
      }
    }
  }
  hapusdetail() {
    var row = $$("tabeldetail").getSelectedItem();
    if (row) {
      var context = this;
      var callbackHasil = {
        success: function (response, data, xhr) {
          $$("windowFormdetail").enable();
          var response = JSON.parse(response);
          webix.alert(response.pesan);
          if (response.status == true) {
            context.refreshdetail();
            $$("windowFormdetail").hide();
          }
        },
        error: function (text, data, xhr) {
          webix.alert(text);
          $$("windowFormdetail").enable();
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
              .del("http://localhost:5000/penunjangDetail", row, callbackHasil);
          }
        },
      });
    } else {
      webix.alert("Tidak ada data yang dipilih");
    }
  }
  init() {
    this.ui(this.formdetail());
  }
  ready() {
    this.refreshdetail();
  }
}
