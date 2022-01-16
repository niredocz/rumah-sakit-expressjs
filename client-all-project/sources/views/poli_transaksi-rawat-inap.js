/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class RawatInap extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Rawat Inap",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahRawatInap(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshRawatInap(),
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
						click: () => this.kartuTransaksi_Rawat_InapPdf(),
						label: "Cetak Transaksi",
						type: "iconButton",
						width: 180
					},
					{
						view: "button",
						click: () => this.ubahRawatInap(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusRawatInap(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelRawatInap",
					columns: [{
						id: "id",
						header: ["ID Rawat Inap", {
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
						id: "kamar",
						header: ["Nomor Kamar", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "checkout",
						header: ["Waktu Checkout", {
							content: "textFilter"
						}],
						width: 300,
						format:webix.i18n.dateFormatStr
					}
					],
					pager: "pagerRawatInap",
				},
				{
					view: "pager",
					id: "pagerRawatInap",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formRawatInap() {
		return {
			view: "window",
			id: "windowFormRawatInap",
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
					id: "judulFormRawatInap"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormRawatInap').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formRawatInap",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Rawat Inap",
					name: "id",
					labelWidth: 200,
					required: true
				},
				{
					view: "text",
					label: "ID Pasien",
					name: "id_pasien",
					labelWidth: 200,
					required: true
				},
				{
					view: "text",
					label: "Nomor Kamar",
					name: "kamar",
					labelWidth: 200,
					required: true
				},
				{
					view: "datepicker",
					label: "Waktu Checkout",
					name: "checkout",
					labelWidth: 200,
					required: true,
					type: "day",
					value:new Date(1985, 0, 31)
				},
				{
					cols: [{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.simpanRawatInap(),
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

	refreshRawatInap() {
		$$("tabelRawatInap").clearAll();
		$$("tabelRawatInap").load("http://localhost:3001/transaksi-rawat-inap");
	}
	tambahRawatInap() {
		$$("windowFormRawatInap").show();
		$$("formRawatInap").clear();
		$$("judulFormRawatInap").setValue("Form Tambah Rawat Inap");
	}
	ubahRawatInap() {
		var row = $$("tabelRawatInap").getSelectedItem();
		if (row) {
			$$("windowFormRawatInap").show();
			$$("formRawatInap").clear();
			$$("formRawatInap").setValues(row);
			$$("judulFormRawatInap").setValue("Form Ubah Rawat Inap");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanRawatInap() {
		var context = this;
		if ($$("formRawatInap").validate()) {
			var dataKirim = $$("formRawatInap").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormRawatInap").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshRawatInap();
						$$("windowFormRawatInap").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormRawatInap").enable();
				}
			};
			$$("windowFormRawatInap").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/transaksi-rawat-inap", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/transaksi-rawat-inap", dataKirim, callbackHasil);
			}
		}
	}

	hapusRawatInap() {
		var row = $$("tabelRawatInap").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormRawatInap").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshRawatInap();
						$$("windowFormRawatInap").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormRawatInap").enable();
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
						webix.ajax().del("http://localhost:3001/transaksi-rawat-inap", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartuTransaksi_Rawat_InapPdf() {
		var row = $$("tabelRawatInap").getSelectedItem();
		if (row) {
			$$("kartuTransaksi_Rawat_Inap").parse(row);
			this.webix.print($$("kartuTransaksi_Rawat_Inap"));
		} else {
			this.webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartuTransaksi_Rawat_Inap() {
		return {
			view: "template",
			id: "kartuTransaksi_Rawat_Inap",
			template: `
				<div class="pdf-content">
					<div class="title">
						<img src='../../codebase/images/logo-sistem.png'>
					</div>
					<table class="tabel-pdf">
						<tr class="content-wrap">
							<td class="field">ID </td>
							<td class="content"> : #id#</td>
						</tr>
						<tr class="content-wrap">
							<td class="field">ID Pasien</td>
							<td class="content"> : #id_pasien#</td>
						</tr>
						<tr class="content-wrap">
							<td class="field">Kamar</td>
							<td class="content"> : #kamar#</td>
						</tr>
			  <tr class="content-wrap">
							<td class="field">Checkout</td>
							<td class="content"> : #checkout#</td>
						</tr>
					</table>
				</div>
			`
		};
	}

	init() {
		this.ui(this.formRawatInap());
		this.ui(this.kartuTransaksi_Rawat_Inap());
	}
	ready() {
		this.refreshRawatInap();
	}
}