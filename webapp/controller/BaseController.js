sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function (Controller, Fragment) {
	"use strict";

	return Controller.extend("demo.Train_27_Fragment.controller.BaseController", {
		
		//フラグメントをロード
		loadFragment: function (sFragmentName, oController, sId) {
			if (!this._aFragments) {
				this._aFragments = {};
			}
			
			return new Promise(function(resolve, reject) {
				if (!this._aFragments[sFragmentName]) {
					var sName = this.getOwnerComponent().getMetadata().getComponentName() + ".fragment." + sFragmentName;
					Fragment.load({
						id: sId,
						name: sName,
						controller: oController
					}).then(function(oFragment) {
						this._aFragments[sFragmentName] = oFragment;
						this.getView().addDependent(oFragment);
						resolve(this._aFragments[sFragmentName]);
					}.bind(this));				
				}else {
					resolve(this._aFragments[sFragmentName]);
				}
			}.bind(this));
		},
		
		//ロードされていることがわかっているフラグメントを取得したいとき
		getFragment: function (sFragmentName) {
			return this._aFragments[sFragmentName];
		}

	});
});