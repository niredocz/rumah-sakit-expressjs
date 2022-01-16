/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class TransaksiObatDetail extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Obat Detail",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTransaksiObatDetail(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTransaksiObatDetail(),
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
						click: () => this.kartutabelTransaksiObatDetailPdf(),
						label: "Cetak PDF",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.ubahTransaksiObatDetail(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTransaksiObatDetail(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelTransaksiObatDetail",
					columns: [{
						id: "id",
						header: ["ID Transaksi Obat Detail", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_transaksi_obat",
						header: ["ID Transaksi Obat", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_obat",
						header: ["ID Obat", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "jumlah",
						header: ["Jumlah", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "harga",
						header: ["Harga", {
							content: "textFilter"
						}],
						width: 300
					}
					],
					pager: "pagerTransaksiObatDetail",
				},
				{
					view: "pager",
					id: "pagerTransaksiObatDetail",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}

	formTransaksiObatDetail() {
		return {
			view: "window",
			id: "windowFormTransaksiObatDetail",
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
					id: "judulFormTransaksiObatDetail"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTransaksiObatDetail').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTransaksiObatDetail",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Transaksi Obat Detail",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "ID Transaksi Obat",
					name: "id_transaksi_obat",
					options: "http://localhost:3003/transaksi-obat-detail/options",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "ID Obat",
					name: "id_obat",
					options: "http://localhost:3003/transaksi-obat-detail/options1",
					labelWidth: 200,
					required: true
				},
				// {
				// 	view: "text",
				// 	label: "ID Transaksi Obat",
				// 	name: "id_transaksi_obat",
				// 	labelWidth: 200,
				// 	required: true
				// },
				// {
				// 	view: "text",
				// 	label: "ID Obat",
				// 	name: "id_obat",
				// 	labelWidth: 200,
				// 	required: true
				// },
				{
					view: "text",
					label: "Jumlah",
					name: "jumlah",
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
						click: () => this.simpanTransaksiObatDetail(),
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

	refreshTransaksiObatDetail() {
		$$("tabelTransaksiObatDetail").clearAll();
		$$("tabelTransaksiObatDetail").load("http://localhost:3003/transaksi-obat-detail");
	}

	tambahTransaksiObatDetail() {
		$$("windowFormTransaksiObatDetail").show();
		$$("formTransaksiObatDetail").clear();
		$$("judulFormTransaksiObatDetail").setValue("Form Tambah Transaksi Obat Detail");
	}

	ubahTransaksiObatDetail() {
		var row = $$("tabelTransaksiObatDetail").getSelectedItem();
		if (row) {
			$$("windowFormTransaksiObatDetail").show();
			$$("formTransaksiObatDetail").clear();
			$$("formTransaksiObatDetail").setValues(row);
			$$("judulFormTransaksiObatDetail").setValue("Form Ubah Transaksi Obat Detail");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}

	simpanTransaksiObatDetail() {
		var context = this;
		if ($$("formTransaksiObatDetail").validate()) {
			var dataKirim = $$("formTransaksiObatDetail").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiObatDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiObatDetail();
						$$("windowFormTransaksiObatDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiObatDetail").enable();
				}
			};
			$$("windowFormTransaksiObatDetail").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3003/transaksi-obat-detail", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3003/transaksi-obat-detail", dataKirim, callbackHasil);
			}
		}
	}

	hapusTransaksiObatDetail() {
		var row = $$("tabelTransaksiObatDetail").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiObatDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiObatDetail();
						$$("windowFormTransaksiObatDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiObatDetail").enable();
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
						webix.ajax().del("http://localhost:3003/transaksi-obat-detail", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartutabelTransaksiObatDetailPdf(){
		var row = $$("tabelTransaksiObatDetail").getSelectedItem();
		if (row){
			$$("kartutabelTransaksiObatDetail").parse(row);
			this.webix.print($$("kartutabelTransaksiObatDetail"));
		} else {
			this.webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartutabelTransaksiObatDetail() {
		return {
			view: "template",
			id: "kartutabelTransaksiObatDetail",
			template: `
			<div class="pdf-content">
				<div class="title">
					<img src='../../codebase/images/logo-sistem.png'>
				</div>
				<table class="tabel-pdf">
					<tr class="content-wrap">
						<td class="field">ID Transaksi Obat Detail</td>
						<td class="content"> : #id#</td>
					</tr>
					<tr class="content-wrap">
						<td class="field">ID Transaksi Obat</td>
						<td class="content"> : #id_transaksi_obat#</td>
					</tr>
					<tr class="content-wrap">
						<td class="field">ID Obat</td>
						<td class="content"> : #id_obat#</td>
					</tr>
					<tr class="content-wrap">
						<td class="field">Jumlah</td>
						<td class="content"> : #jumlah#</td>
					</tr>
					<tr class="content-wrap">
						<td class="field">Harga</td>
						<td class="content"> : #harga#</td>
					</tr>
				</table>
			</div>
		`};
	}

	init() {
		this.ui(this.formTransaksiObatDetail());
		this.ui(this.kartutabelTransaksiObatDetail());
	}
	ready() {
		this.refreshTransaksiObatDetail();
	}
}