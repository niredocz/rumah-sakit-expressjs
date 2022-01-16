/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Transaksi extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Penunjang",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTransaksiPenunjang(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTransaksiPenunjang(),
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
						click: () => this.ubahTransaksiPenunjang(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTransaksiPenunjang(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelTransaksiPenunjang",
					columns: [{
						id: "id",
						header: ["ID", {
							content: "textFilter"
						}],
						width: 100
					},
					{
						id: "id_transaksi_periksa",
						header: ["ID Transaksi Periksa", {
							content: "textFilter"
						}],
						width: 300
					}],
					pager: "pagerTransaksiPenunjang",
				},
				{
					view: "pager",
					id: "pagerTransaksiPenunjang",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}

	formTransaksiPenunjang() {
		return {
			view: "window",
			id: "windowFormTransaksiPenunjang",
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
					id: "judulFormTransaksiPenunjang"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTransaksiPenunjang').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTransaksiPenunjang",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "Id_Transaksi_Periksa",
					name: "id_transaksi_periksa",
					options: "http://localhost:3002/transaksi_periksa/options",
					labelWidth: 200,
					required: true,
				},
				{
					cols: [{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.simpanTransaksiPenunjang(),
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

	refreshTransaksiPenunjang() {
		$$("tabelTransaksiPenunjang").clearAll();
		$$("tabelTransaksiPenunjang").load("http://localhost:3002/penunjang");
	}
	tambahTransaksiPenunjang() {
		$$("windowFormTransaksiPenunjang").show();
		$$("formTransaksiPenunjang").clear();
		$$("judulFormTransaksiPenunjang").setValue("Form Tambah Transaksi Penunjang");
	}
	ubahTransaksiPenunjang() {
		var row = $$("tabelTransaksiPenunjang").getSelectedItem();
		if (row) {
			$$("windowFormTransaksiPenunjang").show();
			$$("formTransaksiPenunjang").clear();
			$$("formTransaksiPenunjang").setValues(row);
			$$("judulFormTransaksiPenunjang").setValue("Form Ubah Transaksi Penunjang");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanTransaksiPenunjang() {
		var context = this;
		if ($$("formTransaksiPenunjang").validate()) {
			var dataKirim = $$("formTransaksiPenunjang").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiPenunjang").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiPenunjang();
						$$("windowFormTransaksiPenunjang").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiPenunjang").enable();
				}
			};
			$$("windowFormTransaksiPenunjang").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3002/penunjang", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3002/penunjang", dataKirim, callbackHasil);
			}
		}
	}

	hapusTransaksiPenunjang() {
		var row = $$("tabelTransaksiPenunjang").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiPenunjang").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiPenunjang();
						$$("windowFormTransaksiPenunjang").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiPenunjang").enable();
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
						webix.ajax().del("http://localhost:3002/penunjang", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formTransaksiPenunjang());
	}
	ready() {
		this.refreshTransaksiPenunjang();
	}
}