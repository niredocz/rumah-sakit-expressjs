/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class TransaksiBayar extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Bayar",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTransaksiBayar(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTransaksiBayar(),
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
						click: () => this.transaksiBayarPdf(),
						label: "Cetak PDF",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.ubahTransaksiBayar(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTransaksiBayar(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					autoConfig:true,
					select: true,
					id: "tabelTransaksiBayar",
					columns: [{
						id: "id",
						header: ["ID Transaksi Bayar", {
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
					}
					],
					pager: "pagerTransaksiBayar",
				},
				{
					view: "pager",
					id: "pagerTransaksiBayar",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formTransaksiBayar() {
		return {
			view: "window",
			id: "windowFormTransaksiBayar",
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
					id: "judulFormTransaksiBayar"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTransaksiBayar').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTransaksiBayar",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Transaksi Bayar",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "ID Transaksi Periksa",
					name: "id_transaksi_periksa",
					options: "http://localhost:3004/transaksi_periksa/options",
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
						click: () => this.simpanTransaksiBayar(),
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

	refreshTransaksiBayar() {
		$$("tabelTransaksiBayar").clearAll();
		$$("tabelTransaksiBayar").load("http://localhost:3004/bayar");
	}
	tambahTransaksiBayar() {
		$$("windowFormTransaksiBayar").show();
		$$("formTransaksiBayar").clear();
		$$("judulFormTransaksiBayar").setValue("Form Tambah Transaksi Bayar");
	}
	ubahTransaksiBayar() {
		var row = $$("tabelTransaksiBayar").getSelectedItem();
		if (row) {
			$$("windowFormTransaksiBayar").show();
			$$("formTransaksiBayar").clear();
			$$("formTransaksiBayar").setValues(row);
			$$("judulFormTransaksiBayar").setValue("Form Ubah Transaksi Bayar");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanTransaksiBayar() {
		var context = this;
		if ($$("formTransaksiBayar").validate()) {
			var dataKirim = $$("formTransaksiBayar").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiBayar").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiBayar();
						$$("windowFormTransaksiBayar").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiBayar").enable();
				}
			};
			$$("windowFormTransaksiBayar").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3004/bayar", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3004/bayar", dataKirim, callbackHasil);
			}
		}
	}

	hapusTransaksiBayar() {
		var row = $$("tabelTransaksiBayar").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiBayar").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiBayar();
						$$("windowFormTransaksiBayar").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiBayar").enable();
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
						webix.ajax().del("http://localhost:3004/bayar", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	transaksiBayarPdf() {
		var row = $$("tabelTransaksiBayar").getSelectedItem();
		if (row) {
			$$("transaksiBayar").parse(row);
			this.webix.print($$("transaksiBayar"));
		} else {
			this.webix.alert("Tidak ada data yang dipilih");
		}
	}

	transaksiBayar() {
		return {
			view: "template",
			id: "transaksiBayar",
			template: `
			<div class="pdf-content">
				<div class="title">
					<img src='../../codebase/images/logo-sistem.png'>
				</div>
				<table class="tabel-pdf">
					<tr class="content-wrap">
						<td class="field">ID</td>
						<td class="content"> : #id#</td>
					</tr>
					<tr class="content-wrap">
						<td class="field">ID Transaksi Periksa</td>
						<td class="content"> : #id_transaksi_periksa#</td>
					</tr>
				</table>
			</div>
		`};
	}

	init() {
		this.ui(this.formTransaksiBayar());
		this.ui(this.transaksiBayar());
	}
	ready() {
		this.refreshTransaksiBayar();
	}
}