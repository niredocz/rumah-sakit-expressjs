import { JetView } from "webix-jet";

export default class penunjang extends JetView {
  config() {
    var ui = {
      rows: [
        { view: "template", template: "Data Penunjang", type: "header" },
        {
          view: "toolbar",
          paddingY: 2,
          cols: [
            {
              view: "button",
              click: () => this.tambahpenunjang(),
              label: "Tambah",
              type: "iconButton",
              width: 100,
            },
            {
              view: "button",
              click: () => this.refreshpenunjang(),
              label: "Refresh",
              type: "iconButton",
              width: 100,
            },
            { template: "", borderless: true },
            {
              view: "button",
              click: () => this.ubahpenunjang(),
              label: "Ubah",
              type: "iconButton",
              width: 100,
            },
            {
              view: "button",
              click: () => this.hapuspenunjang(),
              label: "Hapus",
              type: "iconButton",
              width: 100,
            },
          ],
        },
        {
          view: "datatable",
          select: true,
          id: "tabelpenunjang",
          columns: [
            {
              id: "id",
              header: ["Id", { content: "textFilter" }],
              width: 100,
            },
            {
              id: "id_transaksi_periksa",
              header: ["Id_Transaksi_Periksa", { content: "textFilter" }],
              width: 300,
            },
          ],
          pager: "pagerpenunjang",
        },
        {
          view: "pager",
          id: "pagerpenunjang",
          template: "{common.prev()} {common.pages()} {common.next()}",
          size: 20,
          group: 5,
        },
      ],
    };
    return ui;
  }
  formpenunjang() {
    return {
      view: "window",
      id: "windowFormpenunjang",
      width: 600,
      position: "center",
      modal: true,
      move: true,
      head: {
        view: "toolbar",
        margin: -4,
        cols: [
          { view: "label", label: "Tambah", id: "judulFormpenunjang" },
          {
            view: "button",
            type: "iconButton",
            label: "Tutup",
            width: 80,
            click: "$$('windowFormpenunjang').hide();",
          },
        ],
      },
      body: {
        view: "form",
        id: "formpenunjang",
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
            label: "Id_Transaksi_Periksa",
            name: "id_transaksi_periksa",
            options: "http://localhost:5000/transaksi_periksa/options",
            labelWidth: 100,
            required: true,
          },
          {
            cols: [
              { template: "", borderless: true },
              {
                view: "button",
                click: () => this.simpanpenunjang(),
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
  refreshpenunjang() {
    $$("tabelpenunjang").clearAll();
    $$("tabelpenunjang").load("http://localhost:5000/penunjang");
  }
  tambahpenunjang() {
    $$("windowFormpenunjang").show();
    $$("formpenunjang").clear();
    $$("judulFormpenunjang").setValue("Form Tambah penunjang");
  }
  ubahpenunjang() {
    var row = $$("tabelpenunjang").getSelectedItem();
    if (row) {
      $$("windowFormpenunjang").show();
      $$("formpenunjang").clear();
      $$("formpenunjang").setValues(row);
      $$("judulFormpenunjang").setValue("Form Ubah penunjang");
    } else {
      webix.alert("Tidak ada data akun yang dipilih");
    }
  }
  simpanpenunjang() {
    var context = this;
    if ($$("formpenunjang").validate()) {
      var dataKirim = $$("formpenunjang").getValues();
      var callbackHasil = {
        success: function (response, data, xhr) {
          $$("windowFormpenunjang").enable();
          var response = JSON.parse(response);
          webix.alert(response.pesan);
          if (response.status == true) {
            context.refreshpenunjang();
            $$("windowFormpenunjang").hide();
          }
        },
        error: function (text, data, xhr) {
          webix.alert(text);
          $$("windowFormpenunjang").enable();
        },
      };
      $$("windowFormpenunjang").disable();
      if (dataKirim.createdAt === undefined) {
        webix
          .ajax()
          .post("http://localhost:5000/penunjang", dataKirim, callbackHasil);
      } else {
        webix
          .ajax()
          .put("http://localhost:5000/penunjang", dataKirim, callbackHasil);
      }
    }
  }
  hapuspenunjang() {
    var row = $$("tabelpenunjang").getSelectedItem();
    if (row) {
      var context = this;
      var callbackHasil = {
        success: function (response, data, xhr) {
          $$("windowFormpenunjang").enable();
          var response = JSON.parse(response);
          webix.alert(response.pesan);
          if (response.status == true) {
            context.refreshpenunjang();
            $$("windowFormpenunjang").hide();
          }
        },
        error: function (text, data, xhr) {
          webix.alert(text);
          $$("windowFormpenunjang").enable();
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
              .del("http://localhost:5000/penunjang", row, callbackHasil);
          }
        },
      });
    } else {
      webix.alert("Tidak ada data yang dipilih");
    }
  }
  init() {
    this.ui(this.formpenunjang());
  }
  ready() {
    this.refreshpenunjang();
  }
}
