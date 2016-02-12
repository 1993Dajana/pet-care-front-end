'use strict';
petcareApp.
directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                console.log('hello');
                scope.$apply(function() {
                	
                    model.$setViewValue(element.val());
                    scope.post.address=element.val();
                    scope.post.latitude =  scope.gPlace.getPlace().geometry.location.lat();
                    scope.post.longitude =  scope.gPlace.getPlace().geometry.location.lng();
                    scope.showLocation = true;
                    scope.toAddLocation = false;
                    scope.addressShow = scope.post.address;
                    scope.collapsed = false;
                    console.log('kraj');
                });
            });
        }
    };
});