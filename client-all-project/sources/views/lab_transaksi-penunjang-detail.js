/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class Detail extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Transaksi Penunjang Detail",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahDetail(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshDetail(),
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
						click: () => this.kartuDetailPdf(),
						label: "Cetak PDF",
						type: "iconButton",
						width: 180
					},
					{
						view: "button",
						click: () => this.ubahDetail(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusDetail(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelDetail",
					columns: [{
						id: "id",
						header: ["ID Transaksi Penunjang Detail", {
							content: "textFilter"
						}],
						width: 100
					},
					{
						id: "id_transaksi_penunjang",
						header: ["ID Transaksi Penunjang", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "id_jenis_penunjang",
						header: ["ID Jenis Penunjang", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "hasil",
						header: ["Hasil", {
							content: "textFilter"
						}],
						width: 200
					},
					{
						id: "biaya",
						header: ["Biaya", {
							content: "textFilter"
						}],
						width: 200
					}
					],
					pager: "pagerDetail",
				},
				{
					view: "pager",
					id: "pagerDetail",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formDetail() {
		return {
			view: "window",
			id: "windowFormDetail",
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
					id: "judulFormDetail"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormDetail').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formDetail",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Transaksi Penunjang Detail",
					name: "id",
					labelWidth: 250,
					required: true
				},
				{
					view: "richselect",
					label: "ID Transaksi Penunjang",
					name: "id_transaksi_penunjang",
					options: "http://localhost:3002/penunjang-detail/options",
					labelWidth: 250,
					required: true,
				},
				{
					view: "richselect",
					label: "ID Jenis Penunjang",
					name: "id_jenis_penunjang",
					options: "http://localhost:3002/penunjang-detail/options1",
					labelWidth: 250,
					required: true,
				},
				{
					view: "text",
					label: "Hasil",
					name: "hasil",
					labelWidth: 250,
					required: true
				},
				{
					view: "text",
					label: "Biaya",
					name: "biaya",
					labelWidth: 250,
					required: true
				},
				{
					cols: [{
						template: "",
						borderless: true
					},
					{
						view: "button",
						click: () => this.simpanDetail(),
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

	refreshDetail() {
		$$("tabelDetail").clearAll();
		$$("tabelDetail").load("http://localhost:3002/penunjang-detail");
	}
	tambahDetail() {
		$$("windowFormDetail").show();
		$$("formDetail").clear();
		$$("judulFormDetail").setValue("Form Tambah Transaksi Penunjang Detail");
	}
	ubahDetail() {
		var row = $$("tabelDetail").getSelectedItem();
		if (row) {
			$$("windowFormDetail").show();
			$$("formDetail").clear();
			$$("formDetail").setValues(row);
			$$("judulFormDetail").setValue("Form Ubah Transaksi Penunjang Detail");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanDetail() {
		var context = this;
		if ($$("formDetail").validate()) {
			var dataKirim = $$("formDetail").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshDetail();
						$$("windowFormDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormDetail").enable();
				}
			};
			$$("windowFormDetail").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3002/penunjang-detail", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3002/penunjang-detail", dataKirim, callbackHasil);
			}
		}
	}

	hapusDetail() {
		var row = $$("tabelDetail").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormDetail").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshDetail();
						$$("windowFormDetail").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormDetail").enable();
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
						webix.ajax().del("http://localhost:3002/penunjang-detail", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartuDetailPdf() {
		var row = $$("tabelDetail").getSelectedItem();
		if (row) {
			$$("kartuDetail").parse(row);
			this.webix.print($$("kartuDetail"));
		} else {
			this.webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartuDetail() {
		return {
			view: "template",
			id: "kartuDetail",
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
							<td class="field">ID Transaksi Penunjang </td>
							<td class="content"> : #id_transaksi_penunjang#</td>
						</tr>
						<tr class="content-wrap">
							<td class="field">ID Jenis Penunjang</td>
							<td class="content"> : #id_jenis_penunjang#</td>
						</tr>
						<tr class="content-wrap">
							<td class="field">Nama</td>
							<td class="content"> : #hasil#</td>
						</tr>
						<tr class="content-wrap">
							<td class="field">Biaya</td>
							<td class="content"> : #biaya#</td>
						</tr>
					</table>
				</div>
			</div>
			`
		};
	}

	init() {
		this.ui(this.formDetail());
		this.ui(this.kartuDetail());
	}
	ready() {
		this.refreshDetail();
	}
}