/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Diagnosa extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Diagnosa",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahDiagnosa(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshDiagnosa(),
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
						click: () => this.ubahDiagnosa(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusDiagnosa(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelDiagnosa",
					columns: [{
						id: "id",
						header: ["ID Diagnosa", {
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
					}
					],
					pager: "pagerDiagnosa",
				},
				{
					view: "pager",
					id: "pagerDiagnosa",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formDiagnosa() {
		return {
			view: "window",
			id: "windowFormDiagnosa",
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
					id: "judulFormDiagnosa"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormDiagnosa').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formDiagnosa",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Diagnosa",
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
						click: () => this.simpanDiagnosa(),
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

	refreshDiagnosa() {
		$$("tabelDiagnosa").clearAll();
		$$("tabelDiagnosa").load("http://localhost:3001/diagnosa");
	}
	tambahDiagnosa() {
		$$("windowFormDiagnosa").show();
		$$("formDiagnosa").clear();
		$$("judulFormDiagnosa").setValue("Form Tambah Diagnosa");
	}
	ubahDiagnosa() {
		var row = $$("tabelDiagnosa").getSelectedItem();
		if (row) {
			$$("windowFormDiagnosa").show();
			$$("formDiagnosa").clear();
			$$("formDiagnosa").setValues(row);
			$$("judulFormDiagnosa").setValue("Form Ubah Diagnosa");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanDiagnosa() {
		var context = this;
		if ($$("formDiagnosa").validate()) {
			var dataKirim = $$("formDiagnosa").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormDiagnosa").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshDiagnosa();
						$$("windowFormDiagnosa").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormDiagnosa").enable();
				}
			};
			$$("windowFormDiagnosa").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/diagnosa", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/diagnosa", dataKirim, callbackHasil);
			}
		}
	}

	hapusDiagnosa() {
		var row = $$("tabelDiagnosa").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormDiagnosa").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshDiagnosa();
						$$("windowFormDiagnosa").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormDiagnosa").enable();
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
						webix.ajax().del("http://localhost:3001/diagnosa", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formDiagnosa());
	}
	ready() {
		this.refreshDiagnosa();
	}
}