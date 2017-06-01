sap.ui.define([
	"sap/ui/core/ValueState"],
	function(ValueState) {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(0);
		},

        itskStatus: function(value) {
        	if (value === "0") {
				return "Планирование";
        	}
        	else if (value === "1") {
        		return "Согласование";
        	}
        	else{
        		return "-";
        	}
		}

	};

});