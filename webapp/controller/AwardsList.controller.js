sap.ui.define([
	"itsk/QuarterlyAward/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"itsk/QuarterlyAward/model/formatter"
], function(BaseController, JSONModel, MessageToast, formatter) {
	"use strict";

	return BaseController.extend("itsk.QuarterlyAward.controller.AwardsList", {
		formatter: formatter,
		
		onInit: function() {
			
            var RequestsSet = new sap.ui.model.json.JSONModel("/webapp/localService/mockdata/RequestsSet.json");
            //var AppruvalSet = new JSONModel("/webapp/localService/mockdata/AppruvalSet.json");
            // load json to do a tree
			var json = (function() {
		        json = null;
		        $.ajax({
		            'async': false,
		            'global': false,
		            'url': "/webapp/localService/mockdata/AppruvalSet.json",
		            'dataType': "json",
		            'success': function (data) {
		                json = data;
		            }
		        });
		        return json;
		    })();
			var data = json;
			
			//get TREE
            var flat = {};
            for (var i = 0; i < data.d.results.length; i++) {
                var key = 'id' + data.d.results[i].ObjidBu; //ID
                //flat[key] = data.d.results[i];
                //flat[key].StextBu = data.d.results[i].StextBu;
                //flat[key].children = [];
                flat[key] = [];
            }
            // add child container array to each node
            for (var i in flat) {
                flat[i].children = []; // add children container
                flat[key].StextBu = [];
            }
            // populate the child container arrays
            var sum1 = 0;
            /*var sumAll = 0;*/
            for (var i = 0; i < data.d.results.length; i++) {
                var parentkey = 'id' + data.d.results[i].ObjidBu; //ParentId
                if (flat[parentkey]) {
            		flat[parentkey].children.push(data.d.results[i]);
                	flat[parentkey].StextBu = data.d.results[i].StextBu;
                	flat[parentkey].Visible = false;
                	sum1 = sum1 + parseInt(data.d.results[i].Bonus);
                	flat[parentkey].Bonus = sum1;
                	/*sumAll = sum1 + parseInt(data.d.results[i].Bonus);*/
                }
            }
            
            console.info("Bonus");
            console.log(sum1);
            console.info("flat by budget");
			console.log(flat);

            // find the root nodes (no parent found) and create the hierarchy tree from them
            var root = [];
            for (var i in flat) {
                var parentkey = 'id' + flat[i].ObjidBu; //ParentId
                if (!flat[parentkey]) {
                    root.push(flat[i]);
                }
            }
            console.log(root);
            
            var AppruvalSet = new sap.ui.model.json.JSONModel(root);
			this.setModel(RequestsSet, "RequestsSet");
			this.setModel(AppruvalSet, "AppruvalSet");
			console.info("Данные Людей");
			console.log(RequestsSet);
			console.log(AppruvalSet);
			/* END PEOPLE */
		},
		
		onPress: function(oEvent) {
			this._showObject(oEvent.getSource());
		},
		onApprove: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		},
		onDel: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		},
		
		onNavBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			}
		},

		onSearch: function(oEvent) {
			/*if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var oTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(oTableSearchState);
			}*/
			MessageToast.show("Do search!");
		}
		
	});

});