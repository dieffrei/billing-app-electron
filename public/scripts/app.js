angular.module('billingSystemApp', [])
    .controller('MainController', ['$http', '$interval', function($http, $interval){

        let vm = this;
        const context = 'http://localhost:3000';
        vm.opportunities = [];

        function loadOpportunities() {
            $http.get(context + '/opportunity').then((response) => {
                console.log('Opportunities', response);

                let _opps = [];
                _.each(response.data, (_event) => {
                    _opps.push(JSON.parse(_event.payload.Payload__c));
                });

                vm.opportunities = _opps;
            });
        }

        let socket = io(context);
        socket.on('opportunity', function(msg){
            console.log('Opportunity Received: ', msg);
            new Notification('Nova oportunidade', {
                body: msg.payload.OpportunityName__c
            });
            loadOpportunities();
        });

        vm.reject = function(opp) {

        };

        vm.generateInvoice = function(opp) {
            console.log('Generate Invoice for ', opp);
            $http.post(context + '/invoice', opp).then((response) => {

            })

        };

        loadOpportunities();

    }]);
