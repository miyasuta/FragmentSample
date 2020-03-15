/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"demo/Train_27_Fragment/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});