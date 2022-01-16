/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class TransaksiBayarDetail extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Bayar Detail",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTransaksiBayarDetail(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTransaksiBayarDetail(),
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
						click: () => this.transaksiBayarDetailPdf(),
						label: "Cetak PDF",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.ubahTransaksiBayarDetail(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTransaksiBayarDetail(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelTransaksiBayarDetail",
					columns: [{
						id: "id",
						header: ["ID Transaksi Bayar Detail", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_transaksi_bayar",
						header: ["ID Transaksi Bayar", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "jumlah_bayar",
						header: ["Jumlah Bayar", {
							content: "textFilter"
						}],
						width: 200
					}
					],
					pager: "pagerTransaksiBayarDetail",
				},
				{
					view: "pager",
					id: "pagerTransaksiBayarDetail",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formTransaksiBayarDetail() {
		return {
			view: "window",
			id: "windowFormTransaksiBayarDetail",
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
					id: "judulFormTransaksiBayarDetail"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTransaksiBayarDetail').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTransaksiBayarDetail",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Transaksi Bayar Detail",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "richselect",
					label: "ID Transaksi Bayar",
					name: "id_transaksi_bayar",
					options: "http://localhost:3004/bayar-detail/options",
					labelWidth: 200,
					required: true
				},
				// {
				// 	view: "text",
				// 	label: "ID Transaksi Bayar",
				// 	name: "id_transaksi_bayar",
				// 	labelWidth: 200,
				// 	required: true
				// },
				{
					view: "text",
					label: "Jumlah Bayar",
					name: "jumlah_bayar",
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
						click: () => this.simpanTransaksiBayarDetail(),
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

	refreshTransaksiBayarDetail() {
		$$("tabelTransaksiBayarDetail").clearAll();
		$$("tabelTransaksiBayarDetail").load("http://localhost:3004/bayar-detail");
	}
	tambahTransaksiBayarDetail() {
		$$("windowFormTransaksiBayarDetail").show();
		$$("formTransaksiBayarDetail").clear();
		$$("judulFormTransaksiBayarDetail").setValue("Form Tambah Transaksi Bayar Detail");
	}
	ubahTransaksiBayarDetail() {
		var row = $$("tabelTransaksiBayarDetail").getSelectedItem();
		if (row) {
			$$("windowFormTransaksiBayarDetail").show();
			$$("formTransaksiBayarDetail").clear();
			$$("formTransaksiBayarDetail").setValues(row);
			$$("judulFormTransaksiBayarDetail").setValue("Form Ubah Transaksi Bayar Detail");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanTransaksiBayarDetail() {
		var context = this;
		if ($$("formTransaksiBayarDetail").validate()) {
			var dataKirim = $$("formTransaksiBayarDetail").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiBayarDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiBayarDetail();
						$$("windowFormTransaksiBayarDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiBayarDetail").enable();
				}
			};
			$$("windowFormTransaksiBayarDetail").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3004/bayar-detail", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3004/bayar-detail", dataKirim, callbackHasil);
			}
		}
	}

	hapusTransaksiBayarDetail() {
		var row = $$("tabelTransaksiBayarDetail").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTransaksiBayarDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTransaksiBayarDetail();
						$$("windowFormTransaksiBayarDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTransaksiBayarDetail").enable();
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
						webix.ajax().del("http://localhost:3004/bayar-detail", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	transaksiBayarDetailPdf() {
		var row = $$("tabelTransaksiBayarDetail").getSelectedItem();
		if (row) {
			$$("transaksiBayarDetail").parse(row);
			this.webix.print($$("transaksiBayarDetail"));
		} else {
			this.webix.alert("Tidak ada data yang dipilih");
		}
	}

	transaksiBayarDetail() {
		return {
			view: "template",
			id: "transaksiBayarDetail",
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
						<td class="field">ID Transaksi Bayar</td>
						<td class="content"> : #id_transaksi_bayar#</td>
					</tr>
					<tr class="content-wrap">
						<td class="field">Jumlah Bayar</td>
						<td class="content"> : #jumlah_bayar#</td>
					</tr>
				</table>
			</div>
		`};
	}

	init() {
		this.ui(this.formTransaksiBayarDetail());
		this.ui(this.transaksiBayarDetail());
	}
	ready() {
		this.refreshTransaksiBayarDetail();
	}
}