/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {JetView} from "webix-jet";

export default class TindakanMedis extends JetView {
	config() {
		var ui = {
			rows: [
				{
					view: "template",
					template: "Data Tindakan Medis",
					type: "header"
				},
				{
					view: "toolbar",
					paddingY: 2,
					cols: [{
						view: "button",
						click: () => this.tambahTindakanMedis(),
						label: "Tambah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.refreshTindakanMedis(),
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
						click: () => this.kartuTindakanPdf(),
						label: "Cetak Rekam Medis",
						type: "iconButton",
						width: 180
					},
					{
						view: "button",
						click: () => this.ubahTindakanMedis(),
						label: "Ubah",
						type: "iconButton",
						width: 100
					},
					{
						view: "button",
						click: () => this.hapusTindakanMedis(),
						label: "Hapus",
						type: "iconButton",
						width: 100
					}
					]
				},
				{
					view: "datatable",
					select: true,
					id: "tabelTindakanMedis",
					columns: [{
						id: "id",
						header: ["ID Tindakan Medis", {
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
					pager: "pagerTindakanMedis",
				},
				{
					view: "pager",
					id: "pagerTindakanMedis",
					template: "{common.prev()} {common.pages()} {common.next()}",
					size: 20,
					group: 5
				},
			]
		};

		return ui;
	}
	formTindakanMedis() {
		return {
			view: "window",
			id: "windowFormTindakanMedis",
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
					id: "judulFormTindakanMedis"
				},
				{
					view: "button",
					type: "iconButton",
					label: "Tutup",
					width: 80,
					click: "$$('windowFormTindakanMedis').hide();"
				},
				]
			},
			body: {
				view: "form",
				id: "formTindakanMedis",
				borderless: true,
				elements: [{
					view: "text",
					label: "ID Tindakan Medis",
					name: "id",
					labelWidth: 200,
					required: true
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
						click: () => this.simpanTindakanMedis(),
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

	refreshTindakanMedis() {
		$$("tabelTindakanMedis").clearAll();
		$$("tabelTindakanMedis").load("http://localhost:3001/tindakan-medis");
	}
	tambahTindakanMedis() {
		$$("windowFormTindakanMedis").show();
		$$("formTindakanMedis").clear();
		$$("judulFormTindakanMedis").setValue("Form Tambah Tindakan Medis");
	}
	ubahTindakanMedis() {
		var row = $$("tabelTindakanMedis").getSelectedItem();
		if (row) {
			$$("windowFormTindakanMedis").show();
			$$("formTindakanMedis").clear();
			$$("formTindakanMedis").setValues(row);
			$$("judulFormTindakanMedis").setValue("Form Ubah Tindakan Medis");
		} else {
			webix.alert("Tidak ada data akun yang dipilih");
		}
	}
	simpanTindakanMedis() {
		var context = this;
		if ($$("formTindakanMedis").validate()) {
			var dataKirim = $$("formTindakanMedis").getValues();
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTindakanMedis").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTindakanMedis();
						$$("windowFormTindakanMedis").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTindakanMedis").enable();
				}
			};
			$$("windowFormTindakanMedis").disable();
			if (dataKirim.createdAt === undefined) {
				webix.ajax().post("http://localhost:3001/tindakan-medis", dataKirim, callbackHasil);
			} else {
				webix.ajax().put("http://localhost:3001/tindakan-medis", dataKirim, callbackHasil);
			}
		}
	}

	hapusTindakanMedis() {
		var row = $$("tabelTindakanMedis").getSelectedItem();
		if (row) {
			var context = this;
			var callbackHasil = {
				success: function (response, data, xhr) {
					$$("windowFormTindakanMedis").enable();
					var response = JSON.parse(response);
					webix.alert(response.pesan);
					if (response.status == true) {
						context.refreshTindakanMedis();
						$$("windowFormTindakanMedis").hide();
					}
				},
				error: function (text, data, xhr) {
					webix.alert(text);
					$$("windowFormTindakanMedis").enable();
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
						webix.ajax().del("http://localhost:3001/tindakan-medis", row, callbackHasil);
					}
				}
			});
		} else {
			webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartuTindakanPdf() {
		var row = $$("tabelTindakanMedis").getSelectedItem();
		if (row) {
			$$("kartuTindakan").parse(row);
			this.webix.print($$("kartuTindakan"));
		} else {
			this.webix.alert("Tidak ada data yang dipilih");
		}
	}

	kartuTindakan() {
		return {
			view: "template",
			id: "kartuTindakan",
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
							<td class="field">Nama</td>
							<td class="content"> : #nama#</td>
						</tr>
						<tr class="content-wrap">
							<td class="field">Biaya</td>
							<td class="content"> : #biaya#</td>
						</tr>
					</table>
				</div>
			`
		};
	}

	init() {
		this.ui(this.formTindakanMedis());
		this.ui(this.kartuTindakan());
	}
	ready() {
		this.refreshTindakanMedis();
	}
}