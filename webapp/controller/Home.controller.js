sap.ui.define([
	"demo/Train_27_Fragment/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/m/ColumnListItem",
	"sap/m/Text"
], function (BaseController, MessageToast, Fragment, ColumnListItem, Text) {
	"use strict";

	return BaseController.extend("demo.Train_27_Fragment.controller.Home", {

		onInit: function () {
			this._oResurceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			this._oPage = this.byId("page");
		},
		
		onSubmit: function () {
			//ダイアログ内のコントロールにアクセス
			var sSupplier = this.byId(sap.ui.core.Fragment.createId("formFragment", "supplierId")).getValue();
			var sCompanyName = this.byId(sap.ui.core.Fragment.createId("formFragment", "companyName")).getValue();
			
			var sMessage = this._oResurceBundle.getText("message", [sSupplier, sCompanyName]);
			MessageToast.show(sMessage);
		},
		
		onShowDialog: function () {
			this.loadFragment("Dialog", this).then(function(oDialog) {
				oDialog.open();
			});                      
		},
		
		onClose: function () {
			this.getFragment("Dialog").close();
		},
		
		onItemPress: function (oEvent) {
			//選択されたサプライヤの情報を取得
			var sSupplierId = oEvent.getSource().getBindingContext().getProperty("SupplierID");
			var sCompanyName = oEvent.getSource().getBindingContext().getProperty("CompanyName");
			
			//フラグメントの項目にアクセス
			var oSupplier = this.byId(sap.ui.core.Fragment.createId("formFragment", "supplierId"));
			var oCompanyName = this.byId(sap.ui.core.Fragment.createId("formFragment", "companyName"));
			
			oSupplier.setValue(sSupplierId);
			oCompanyName.setValue(sCompanyName);
			
			//Productテーブルの表示
			this._showProducts(sSupplierId);
			//this._oDialog.close();
			this.getFragment("Dialog").close();
		},
		
		_showProducts: function (sSupplierId) {
			//テーブルのフラグメントをロード
			this.loadFragment("Table", this, "tableFragment").then(function(oTablePanel) {
				this._oPage.addContent(oTablePanel);
				this._bindTable(sSupplierId);
			}.bind(this));  
		},
		
		_bindTable: function (sSupplierId) {
			var sPath = "/Suppliers(" + sSupplierId + ")/Products";
			if (!this._oTemplate) {
				this._oTemplate = new ColumnListItem({
					cells: [
						new Text({
							text: "{ProductID}"
						}),
						new Text({
							text: "{ProductName}"
						}),
						new Text({
							text: "{CategoryID}"
						})					
					]
				});				
			}
			//フラグメント内のコントロールにアクセス
			var oTable = sap.ui.core.Fragment.byId("tableFragment", "productTable");
			oTable.bindItems({
				path: sPath,
				template: this._oTemplate
			});
		}
	});

});