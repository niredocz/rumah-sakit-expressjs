/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Poli extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Poli",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahPoli(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshPoli(),
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
						click: () => this.ubahPoli(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusPoli(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelPoli",
					columns: [{
						id: "id",
						header: ["ID Poli", {
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
					],
					pager: "pagerPoli",
				},
				{
					view: "pager",
					id: "pagerPoli",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formPoli() {
		return {
			view: "window",
			id: "windowFormPoli",
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
					id: "judulFormPoli"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormPoli').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formPoli",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Poli",
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
					cols: [{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.simpanPoli(),
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

	refreshPoli() {
		$$("tabelPoli").clearAll();
		$$("tabelPoli").load("http://localhost:3001/poli");
	}
	tambahPoli() {
		$$("windowFormPoli").show();
		$$("formPoli").clear();
		$$("judulFormPoli").setValue("Form Tambah Poli");
	}
	ubahPoli() {
		var row = $$("tabelPoli").getSelectedItem();
		if (row) {
			$$("windowFormPoli").show();
			$$("formPoli").clear();
			$$("formPoli").setValues(row);
			$$("judulFormPoli").setValue("Form Ubah Poli");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanPoli() {
		var context = this;
		if ($$("formPoli").validate()) {
			var dataKirim = $$("formPoli").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormPoli").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshPoli();
						$$("windowFormPoli").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormPoli").enable();
				}
			};
			$$("windowFormPoli").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/poli", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/poli", dataKirim, callbackHasil);
			}
		}
	}

	hapusPoli() {
		var row = $$("tabelPoli").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormPoli").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshPoli();
						$$("windowFormPoli").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormPoli").enable();
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
						webix.ajax().del("http://localhost:3001/poli", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formPoli());
	}
	ready() {
		this.refreshPoli();
	}
}