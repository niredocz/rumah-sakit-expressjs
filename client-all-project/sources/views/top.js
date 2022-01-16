import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config(){
		// Set Header title
		var header = {
			type:"header", template:"Menu Sistem", css:"webix_header app_header"
		};

		// List Sidebar Menu
		var menu_data = [
			{id:"start", value:"Dashboard", icon:"fas fa-clinic-medical" },
			{id: "pendaftaran", icon: "fas fa-notes-medical", value: "Project Pendaftaran",  data:[
				{ value: "Pasien", id: "pendaftaran_pasien", icon: "fas fa-user-injured"},
				{ value: "Rawat Jalan", id: "pendaftaran_rawat_jalan", icon: "fas fa-blind"}
			]},
			{id: "poli", icon: "fas fa-users", value: "Project Poli",  data:[
				{ id: "poli_poli", value: "Poli", icon: "fas fa-syringe"},
				{ id: "poli_dokter", value: "Dokter", icon: "fas fa-user-md"},
				{ id: "poli_diagnosa", value: "Diagnosa", icon: "fas fa-diagnoses"},
				{ id: "poli_tindakan-medis", value: "Tindakan Medis", icon: "fas fa-hand-holding-medical"},
				{ id: "poli_transaksi-periksa", value: "Transaksi Periksa", icon: "fas fa-weight"},
				{ id: "poli_transaksi-periksa-detail", value: "Transaksi Periksa Detail", icon: "fas fa-weight"},
				{ id: "poli_transaksi-rawat-inap", value: "Transaksi Rawat Inap", icon: "fas fa-procedures"},
			]},
			{id: "lab", icon: "fas fa-flask", value: "Project Lab",  data:[
				{ id: "lab_jenis-penunjang", value: "Jenis Penunjang", icon: "fas fa-laptop-medical"},
				{ id: "lab_transaksi-penunjang", value: "Transaksi Penunjang", icon: "fas fa-file-medical"},
				{ id: "lab_transaksi-penunjang-detail", value: "Transaksi Penunjang Detail", icon: "fas fa-file-medical"},
			]},
			{id: "apotek", icon: "fas fa-briefcase-medical", value: "Project Apotek",  data:[
				{ id: "apotek_obat", value: "Obat", icon: "fas fa-pills"},
				{ id: "apotek_transaksi-obat", value: "Transaksi Obat", icon: "fas fa-book-medical"},
				{ id: "apotek_transaksi-obat-detail", value: "Transaksi Obat Detail", icon: "fas fa-book-medical"},
			]},
			{id: "kasir", icon: "fas fa-cash-register", value: "Project Kasir",  data:[
				{ id: "kasir_transaksi-bayar", value: "Transaksi Bayar", icon: "fas fa-money-check-alt"},
				{ id: "kasir_transaksi-bayar-detail", value: "Transaksi Bayar Detail", icon: "fas fa-money-check-alt"},
			]}
		];

		// Menu Initial
		var menu = {
			view:"sidebar",
			id:"top:menu", 
			css:"app_menu",
			width:280,
			layout:"y",
			data: menu_data
		};

		// UI Init
		var ui = {
			type:"clean",
			paddingX:5,
			css:"app_layout",
			cols:[
				{
					paddingX:5,
					paddingY:10,
					rows: [ {css:"webix_shadow_medium",rows:[header, menu]} ]},
				{type:"wide", paddingY:10, paddingX:5,rows:[
					{ $subview:true } 
				]}
			]
		};

		return ui;
	}

	init(){
		this.use(plugins.Menu, "top:menu");
	}
}