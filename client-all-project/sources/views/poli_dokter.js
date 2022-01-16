/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Dokter extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Dokter",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahDokter(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshDokter(),
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
						click: () => this.ubahDokter(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusDokter(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelDokter",
					columns: [{
						id: "id",
						header: ["ID Dokter", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_poli",
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
					{
						id: "biaya",
						header: ["Biaya", {
							content: "textFilter"
						}],
						width: 300
					}
					],
					pager: "pagerDokter",
				},
				{
					view: "pager",
					id: "pagerDokter",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formDokter() {
		return {
			view: "window",
			id: "windowFormDokter",
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
					id: "judulFormDokter"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormDokter').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formDokter",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Dokter",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "Id_Poli",
					name:"id_poli",
					options: "http://localhost:3001/dokter/options",
					labelWidth: 200,
					required: true,
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
						click: () => this.simpanDokter(),
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

	refreshDokter() {
		$$("tabelDokter").clearAll();
		$$("tabelDokter").load("http://localhost:3001/dokter");
	}
	tambahDokter() {
		$$("windowFormDokter").show();
		$$("formDokter").clear();
		$$("judulFormDokter").setValue("Form Tambah Dokter");
	}
	ubahDokter() {
		var row = $$("tabelDokter").getSelectedItem();
		if (row) {
			$$("windowFormDokter").show();
			$$("formDokter").clear();
			$$("formDokter").setValues(row);
			$$("judulFormDokter").setValue("Form Ubah Dokter");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanDokter() {
		var context = this;
		if ($$("formDokter").validate()) {
			var dataKirim = $$("formDokter").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormDokter").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshDokter();
						$$("windowFormDokter").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormDokter").enable();
				}
			};
			$$("windowFormDokter").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/dokter", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/dokter", dataKirim, callbackHasil);
			}
		}
	}

	hapusDokter() {
		var row = $$("tabelDokter").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormDokter").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshDokter();
						$$("windowFormDokter").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormDokter").enable();
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
						webix.ajax().del("http://localhost:3001/dokter", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formDokter());
	}
	ready() {
		this.refreshDokter();
	}
}