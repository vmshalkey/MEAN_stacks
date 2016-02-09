(function(){
	var app = angular.module('myApp', []);

		app.factory("customerFactory", function(){
			var factory = {};
			var errors = {};
			var customers = [
				{name: "Nikki Brown", created_at: "Thur Feb 26 2015 12:03:17 GMT-0800 (PST)"},
				{name: "Vanessa Shalkey", created_at: "Thur Feb 26 2015 12:03:17 GMT-0800 (PST)"},
				{name: "Brittney Hillsbery", created_at: "Thur Feb 26 2015 12:03:17 GMT-0800 (PST)"}
			];

			factory.getCustomers = function(callback){
				callback(customers);
			}

			factory.addCustomer = function(customer) {
				for (var i = 0; i < customers.length; i++) {
					if (customers[i].name === customer.name) {
						errors.message = "That customer was already added.";
						return false;
					} else {
						errors = {};
					}
				}
				customers.push({name: customer.name, created_at: Date()});
			}

			factory.errorMsgs = function() {
				return errors;
			}

			factory.removeCustomer = function(name) {
				for(var i = 0; i < customers.length; i++) {
					if(customers[i].name === name) {
						customers.splice(i, 1);
					}
				}
			}

			return factory;
		})

		app.controller("customersController", function($scope, customerFactory){
			$scope.customers = [];
			$scope.errors = {};

			customerFactory.getCustomers(function(data) {
				$scope.customers = data;
			});

			$scope.addCustomer = function() {
				customerFactory.addCustomer($scope.newCustomer);
				$scope.errors = customerFactory.errorMsgs();
			}


			$scope.removeCustomer = function(name) {
				customerFactory.removeCustomer(name);
			}
		})

		app.controller("ordersController", function($scope, orderFactory) {

		})

	}());