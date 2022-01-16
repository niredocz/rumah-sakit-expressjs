/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Jenis extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Jenis Penunjang",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahJenisPenunjang(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshJenisPenunjang(),
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
						click: () => this.ubahJenisPenunjang(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusJenisPenunjang(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelJenisPenunjang",
					columns: [{
						id: "id",
						header: ["ID Jenis Penunjang", {
							content: "textFilter"
						}],
						width: 100
					},
					{
						id: "nama",
						header: ["Nama", {
							content: "textFilter"
						}],
						width: 300
					},
					{
						id: "biaya",
						header: ["Biaya", {
							content: "textFilter"
						}],
						width: 300
					}
					],
					pager: "pagerJenisPenunjang",
				},
				{
					view: "pager",
					id: "pagerJenisPenunjang",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formJenisPenunjang() {
		return {
			view: "window",
			id: "windowFormJenisPenunjang",
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
					id: "judulFormJenisPenunjang"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormJenisPenunjang').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formJenisPenunjang",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Jenis Penunjang",
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
					label: "Biaya",
					name: "biaya",
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
						click: () => this.simpanJenisPenunjang(),
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

	refreshJenisPenunjang() {
		$$("tabelJenisPenunjang").clearAll();
		$$("tabelJenisPenunjang").load("http://localhost:3002/jenis");
	}
	tambahJenisPenunjang() {
		$$("windowFormJenisPenunjang").show();
		$$("formJenisPenunjang").clear();
		$$("judulFormJenisPenunjang").setValue("Form Tambah Jenis Penunjang");
	}
	ubahJenisPenunjang() {
		var row = $$("tabelJenisPenunjang").getSelectedItem();
		if (row) {
			$$("windowFormJenisPenunjang").show();
			$$("formJenisPenunjang").clear();
			$$("formJenisPenunjang").setValues(row);
			$$("judulFormJenisPenunjang").setValue("Form Ubah Jenis Penunjang");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanJenisPenunjang() {
		var context = this;
		if ($$("formJenisPenunjang").validate()) {
			var dataKirim = $$("formJenisPenunjang").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormJenisPenunjang").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshJenisPenunjang();
						$$("windowFormJenisPenunjang").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormJenisPenunjang").enable();
				}
			};
			$$("windowFormJenisPenunjang").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3002/jenis", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3002/jenis", dataKirim, callbackHasil);
			}
		}
	}

	hapusJenisPenunjang() {
		var row = $$("tabelJenisPenunjang").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormJenisPenunjang").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshJenisPenunjang();
						$$("windowFormJenisPenunjang").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormJenisPenunjang").enable();
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
						webix.ajax().del("http://localhost:3002/jenis", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formJenisPenunjang());
	}
	ready() {
		this.refreshJenisPenunjang();
	}
}