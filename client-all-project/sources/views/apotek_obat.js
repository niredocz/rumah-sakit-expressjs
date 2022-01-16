/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Obat extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Obat",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahObat(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshObat(),
						label: "Refresh",
						type: "iconButton",
						width: 100
					},
					{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.ubahObat(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusObat(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelObat",
					columns: [{
						id: "id",
						header: ["ID Obat", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "nama",
						header: ["Nama", {
							content: "textFilter"
						}],
						width: 300
					},
					{
						id: "harga",
						header: ["Harga", {
							content: "textFilter"
						}],
						width: 300
					}
					],
					pager: "pagerObat",
				},
				{
					view: "pager",
					id: "pagerObat",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formObat() {
		return {
			view: "window",
			id: "windowFormObat",
			width: 600,
			position: "center",
			modal: true,
			move: true,
			head: {
				view: "toolbar",
				margin: -4,
				cols: [{
					view: "label",
					label: "Tambah",
					id: "judulFormObat"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormObat').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formObat",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Obat",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "text",
					label: "Nama",
					name: "nama",
					labelWidth: 200,
					required: true
				},
				{
					view: "text",
					label: "Harga",
					name: "harga",
					labelWidth: 200,
					required: true
				},
				{
					cols: [{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.simpanObat(),
						label: "Simpan",
						width: 120,
						borderless: true
					},
					{
						template: "",
						borderless: true
					},
					]
				}
				]
			}
		};
	}

	refreshObat() {
		$$("tabelObat").clearAll();
		$$("tabelObat").load("http://localhost:3003/obat");
	}
	tambahObat() {
		$$("windowFormObat").show();
		$$("formObat").clear();
		$$("judulFormObat").setValue("Form Tambah Obat");
	}
	ubahObat() {
		var row = $$("tabelObat").getSelectedItem();
		if (row) {
			$$("windowFormObat").show();
			$$("formObat").clear();
			$$("formObat").setValues(row);
			$$("judulFormObat").setValue("Form Ubah Obat");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanObat() {
		var context = this;
		if ($$("formObat").validate()) {
			var dataKirim = $$("formObat").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormObat").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshObat();
						$$("windowFormObat").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormObat").enable();
				}
			};
			$$("windowFormObat").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3003/obat", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3003/obat", dataKirim, callbackHasil);
			}
		}
	}

	hapusObat() {
		var row = $$("tabelObat").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormObat").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshObat();
						$$("windowFormObat").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormObat").enable();
				}
			};
			webix.confirm({
				type: "confirm-warning",
				title: "Konfirmasi",
				ok: "Yakin",
				cancel: "Batal",
				text: "Anda yakin ingin menghapus data ini ?",
				callback: function (jwb) {
					if (jwb) {
						webix.ajax().del("http://localhost:3003/obat", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formObat());
	}
	ready() {
		this.refreshObat();
	}
}