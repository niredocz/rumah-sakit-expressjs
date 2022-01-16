/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class TransaksiPeriksa extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Periksa",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTransaksiPeriksa(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTransaksiPeriksa(),
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
						click: () => this.ubahTransaksiPeriksa(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTransaksiPeriksa(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelTransaksiPeriksa",
					columns: [{
						id: "id",
						header: ["ID Transaksi Periksa", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_dokter",
						header: ["ID Dokter", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_pasien",
						header: ["ID Pasien", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_diagnosa",
						header: ["ID Diagnosa", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "biaya",
						header: ["Biaya", {
							content: "textFilter"
						}],
						width: 300
					}
					],
					pager: "pagerTransaksiPeriksa",
				},
				{
					view: "pager",
					id: "pagerTransaksiPeriksa",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formTransaksiPeriksa() {
		return {
			view: "window",
			id: "windowFormTransaksiPeriksa",
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
					id: "judulFormTransaksiPeriksa"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTransaksiPeriksa').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTransaksiPeriksa",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Transaksi Periksa",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "Id_Dokter",
					name: "id_dokter",
					options: "http://localhost:3001/transaksi-periksa/options",
					labelWidth: 200,
					required: true,
				},
				{
					view: "richselect",
					label: "Id_Pasien",
					name: "id_pasien",
					options: "http://localhost:3001/pasien/options",
					labelWidth: 200,
					required: true,
				},
				{
					view: "richselect",
					label: "Id_Diagnosa",
					name: "id_diagnosa",
					options: "http://localhost:3001/transaksi-periksa/options1",
					labelWidth: 200,
					required: true,
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
						click: () => this.simpanTransaksiPeriksa(),
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

	refreshTransaksiPeriksa() {
		$$("tabelTransaksiPeriksa").clearAll();
		$$("tabelTransaksiPeriksa").load("http://localhost:3001/transaksi-periksa");
	}
	tambahTransaksiPeriksa() {
		$$("windowFormTransaksiPeriksa").show();
		$$("formTransaksiPeriksa").clear();
		$$("judulFormTransaksiPeriksa").setValue("Form Tambah Transaksi Periksa");
	}
	ubahTransaksiPeriksa() {
		var row = $$("tabelTransaksiPeriksa").getSelectedItem();
		if (row) {
			$$("windowFormTransaksiPeriksa").show();
			$$("formTransaksiPeriksa").clear();
			$$("formTransaksiPeriksa").setValues(row);
			$$("judulFormTransaksiPeriksa").setValue("Form Ubah Transaksi Periksa");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanTransaksiPeriksa() {
		var context = this;
		if ($$("formTransaksiPeriksa").validate()) {
			var dataKirim = $$("formTransaksiPeriksa").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiPeriksa").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiPeriksa();
						$$("windowFormTransaksiPeriksa").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiPeriksa").enable();
				}
			};
			$$("windowFormTransaksiPeriksa").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/transaksi-periksa", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/transaksi-periksa", dataKirim, callbackHasil);
			}
		}
	}

	hapusTransaksiPeriksa() {
		var row = $$("tabelTransaksiPeriksa").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiPeriksa").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiPeriksa();
						$$("windowFormTransaksiPeriksa").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiPeriksa").enable();
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
						webix.ajax().del("http://localhost:3001/transaksi-periksa", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formTransaksiPeriksa());
	}
	ready() {
		this.refreshTransaksiPeriksa();
	}
}