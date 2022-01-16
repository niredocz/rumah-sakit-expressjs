/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class rawatJalan extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Rawat Jalan",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahRawatJalan(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshRawatJalan(),
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
						click: () => this.ubahRawatJalan(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusRawatJalan(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelRawatJalan",
					columns: [{
						id: "id",
						header: ["ID Rawat Jalan", {
							content: "textFilter"
						}],
						width: 100
					},
					{
						id: "no_rm",
						header: ["No RM", {
							content: "textFilter"
						}],
						width: 100
					},
					{
						id: "id_poli",
						header: ["ID Poli", {
							content: "textFilter"
						}],
						width: 300
					}
					],
					pager: "pagerRawatJalan",
				},
				{
					view: "pager",
					id: "pagerRawatJalan",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formRawatJalan() {
		return {
			view: "window",
			id: "windowFormRawatJalan",
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
					id: "judulFormRawatJalan"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormRawatJalan').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formRawatJalan",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Rawat Jalan",
					name: "id",
					labelWidth: 100,
					required: true
				},
				{
					view: "text",
					label: "No RM",
					name: "no_rm",
					labelWidth: 100,
					required: true
				},
				{
					view: "text",
					label: "ID Poli",
					name: "id_poli",
					labelWidth: 100,
					required: true
				},
				{
					cols: [{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.simpanRawatJalan(),
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

	refreshRawatJalan() {
		$$("tabelRawatJalan").clearAll();
		$$("tabelRawatJalan").load("http://localhost:3000/rawatJalan");
	}
	tambahRawatJalan() {
		$$("windowFormRawatJalan").show();
		$$("formRawatJalan").clear();
		$$("judulFormRawatJalan").setValue("Form Tambah Rawat Jalan");
	}
	ubahRawatJalan() {
		var row = $$("tabelRawatJalan").getSelectedItem();
		if (row) {
			$$("windowFormRawatJalan").show();
			$$("formRawatJalan").clear();
			$$("formRawatJalan").setValues(row);
			$$("judulFormRawatJalan").setValue("Form Ubah Rawat Jalan");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanRawatJalan() {
		var context = this;
		if ($$("formRawatJalan").validate()) {
			var dataKirim = $$("formRawatJalan").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormRawatJalan").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshRawatJalan();
						$$("windowFormRawatJalan").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormRawatJalan").enable();
				}
			};
			$$("windowFormRawatJalan").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3000/rawatJalan", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3000/rawatJalan", dataKirim, callbackHasil);
			}
		}
	}

	hapusRawatJalan() {
		var row = $$("tabelRawatJalan").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormRawatJalan").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshRawatJalan();
						$$("windowFormRawatJalan").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormRawatJalan").enable();
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
						webix.ajax().del("http://localhost:3000/rawatJalan", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}
	

	init() {
		this.ui(this.formRawatJalan());
	}
	ready() {
		this.refreshRawatJalan();
	}
}