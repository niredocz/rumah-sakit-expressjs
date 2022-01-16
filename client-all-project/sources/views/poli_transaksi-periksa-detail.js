/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class TransaksiPeriksaDetail extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Periksa Detail",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTransaksiPeriksaDetail(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTransaksiPeriksaDetail(),
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
						click: () => this.ubahTransaksiPeriksaDetail(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTransaksiPeriksaDetail(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelTransaksiPeriksaDetail",
					columns: [{
						id: "id",
						header: ["ID Transaksi Periksa Detail", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_transaksi_periksa",
						header: ["ID Transaksi Periksa", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_tindakan",
						header: ["ID Tindakan", {
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
					pager: "pagerTransaksiPeriksaDetail",
				},
				{
					view: "pager",
					id: "pagerTransaksiPeriksaDetail",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formTransaksiPeriksaDetail() {
		return {
			view: "window",
			id: "windowFormTransaksiPeriksaDetail",
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
					id: "judulFormTransaksiPeriksaDetail"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTransaksiPeriksaDetail').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTransaksiPeriksaDetail",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Transaksi Periksa Detail",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "text",
					label: "ID Transaksi Periksa",
					name: "id_transaksi_periksa",
					labelWidth: 200,
					required: true
				},
				{
					view: "text",
					label: "ID Tindakan",
					name: "id_tindakan",
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
						click: () => this.simpanTransaksiPeriksaDetail(),
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

	refreshTransaksiPeriksaDetail() {
		$$("tabelTransaksiPeriksaDetail").clearAll();
		$$("tabelTransaksiPeriksaDetail").load("http://localhost:3001/transaksi-periksa-detail");
	}
	tambahTransaksiPeriksaDetail() {
		$$("windowFormTransaksiPeriksaDetail").show();
		$$("formTransaksiPeriksaDetail").clear();
		$$("judulFormTransaksiPeriksaDetail").setValue("Form Tambah Transaksi Periksa Detail");
	}
	ubahTransaksiPeriksaDetail() {
		var row = $$("tabelTransaksiPeriksaDetail").getSelectedItem();
		if (row) {
			$$("windowFormTransaksiPeriksaDetail").show();
			$$("formTransaksiPeriksaDetail").clear();
			$$("formTransaksiPeriksaDetail").setValues(row);
			$$("judulFormTransaksiPeriksaDetail").setValue("Form Ubah Transaksi Periksa Detail");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanTransaksiPeriksaDetail() {
		var context = this;
		if ($$("formTransaksiPeriksaDetail").validate()) {
			var dataKirim = $$("formTransaksiPeriksaDetail").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiPeriksaDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiPeriksaDetail();
						$$("windowFormTransaksiPeriksaDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiPeriksaDetail").enable();
				}
			};
			$$("windowFormTransaksiPeriksaDetail").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/transaksi-periksa-detail", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/transaksi-periksa-detail", dataKirim, callbackHasil);
			}
		}
	}

	hapusTransaksiPeriksaDetail() {
		var row = $$("tabelTransaksiPeriksaDetail").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiPeriksaDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiPeriksaDetail();
						$$("windowFormTransaksiPeriksaDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiPeriksaDetail").enable();
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
						webix.ajax().del("http://localhost:3001/transaksi-periksa-detail", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	init() {
		this.ui(this.formTransaksiPeriksaDetail());
	}
	ready() {
		this.refreshTransaksiPeriksaDetail();
	}
}