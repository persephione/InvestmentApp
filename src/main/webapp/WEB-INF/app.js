(function(){
    var app = angular.module('app', ['chart.js', 'ui.bootstrap']);
    
    app.controller('AppController', function($scope, $http) {       
        $scope.model = {
            InvestorName: '',
            InvestedAmount: '',
            LeftoverAmount: 0.00,
            LeftoverPercent: 0,
            Stock1NumShares: '',
            Stock1Percent: 0,
            Stock1InvestedAmt: '',
            Stock2NumShares: '',
            Stock2Percent: 0,
            Stock2InvestedAmt: '',
            Stock3NumShares: '',
            Stock3Percent: 0,
            Stock3InvestedAmt: ''
        };
        
        $scope.stock1 = {};
        $scope.stock2 = {};
        $scope.stock3 = {};
        $scope.stock1HasChanged = false;
        $scope.stock2HasChanged = false;
        $scope.stock3HasChanged = false;
        var MaxPercent = 100;
        $scope.stock = {};  
        $scope.stockList = [];
        
        // Pie Chart
        $scope.resetPie = function(){
            $scope.labels = [$scope.stock1.StockSymbol, $scope.stock2.StockSymbol, $scope.stock3.StockSymbol, 'Leftover Amount'];
            $scope.data = [
                parseInt($scope.model.Stock1Percent),
                parseInt($scope.model.Stock2Percent), 
                parseInt($scope.model.Stock3Percent), 
                parseInt($scope.model.LeftoverPercent)
            ];
            // still working on the colors -------------------------------------------------
            //$scope.colours = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];
            //$scope.colours = ['#FFFFFF', 'blue', 'purple', 'orange'];
            $scope.legend = true;            
        };
        
        // move the slider handles on value change
        $scope.move = function(num){
            if(num === 1)
                $("#slider1").slider('value', $scope.model.Stock1Percent);
            if(num === 2)
                $("#slider2").slider('value', $scope.model.Stock2Percent);
            if(num === 3)
                $("#slider3").slider('value', $scope.model.Stock3Percent);
        };

        // calculates all percentages on stock 1 percent value change
        $scope.calculateStock1 = function(){
            $scope.model.Stock1Percent = parseInt(document.getElementById("currentval1").value);
            $scope.stock1HasChanged = true;
            
            // Balance percentages
            var diff = MaxPercent - $scope.model.Stock1Percent;
            if($scope.stock2HasChanged && !$scope.stock3HasChanged) // if only stock2 is larger than the diff between stock1 and 100, change it's value
            {  
                if(parseInt($scope.model.Stock2Percent) >= diff) {
                    $scope.model.Stock2Percent =  diff;
                    $scope.move(2);
                }
            } 
            else if(!$scope.stock2HasChanged && $scope.stock3HasChanged) // if only stock3 is larger than the diff between stock1 and 100, change it's value
            {
                if(parseInt($scope.model.Stock3Percent) >= diff) {
                    $scope.model.Stock3Percent =  diff;
                    $scope.move(3);
                }
            } 
            else if($scope.stock2HasChanged && $scope.stock3HasChanged) // if the MaxPercent has been reached, lower the other two values if they've already changed
            {
                if(parseInt($scope.model.Stock2Percent) + parseInt($scope.model.Stock3Percent) >= diff) {
                    $scope.model.Stock2Percent = $scope.model.Stock2Percent - (diff / 2);
                    $scope.move(2);
                    $scope.model.Stock3Percent = $scope.model.Stock3Percent - (diff / 2);
                    $scope.move(3);
                }
            }
            $scope.resetPie();
            
            // test values until logic is put in ------------------------------- remove later
            $scope.model.Stock1NumShares = parseInt(1);
            $scope.model.Stock2NumShares = 1;
            $scope.model.Stock3NumShares = 1;
        };
        
        // calculates all percentages on stock 2 percent value change
        $scope.calculateStock2 = function(){
            $scope.model.Stock2Percent = document.getElementById("currentval2").value;
            $scope.stock2HasChanged = true;
            
            // Balance percentages
            var diff = MaxPercent - $scope.model.Stock2Percent;
            if($scope.stock1HasChanged && !$scope.stock3HasChanged) // if only stock1 is larger than the diff between stock1 and 100, change it's value
            {  
                if(parseInt($scope.model.Stock1Percent) >= diff) {
                    $scope.model.Stock1Percent =  diff;
                    $scope.move(1);
                }
            } 
            else if(!$scope.stock1HasChanged && $scope.stock3HasChanged) // if only stock3 is larger than the diff between stock1 and 100, change it's value
            {
                if(parseInt($scope.model.Stock3Percent) >= diff) {
                    $scope.model.Stock3Percent =  diff;
                    $scope.move(3);
                }
            } 
            else if($scope.stock1HasChanged && $scope.stock3HasChanged) // if the MaxPercent has been reached, lower the other two values if they've already changed
            {
                if(parseInt($scope.model.Stock1Percent + $scope.model.Stock3Percent) >= diff) {
                    $scope.model.Stock1Percent = $scope.model.Stock1Percent - (diff / 2);
                    $scope.move(1);
                    $scope.model.Stock3Percent = $scope.model.Stock3Percent - (diff / 2);
                    $scope.move(3);
                }
            }
            $scope.resetPie();
        };
        
        // calculates all percentages on stock 3 percent value change
        $scope.calculateStock3 = function(){
            $scope.model.Stock3Percent = document.getElementById("currentval3").value;
            $scope.stock3HasChanged = true;
            
            // Balance percentages
            var diff = MaxPercent - $scope.model.Stock3Percent;
            if($scope.stock1HasChanged && !$scope.stock2HasChanged) // if only stock1 is larger than the diff between stock1 and 100, change it's value
            {  
                if(parseInt($scope.model.Stock1Percent) >= diff) {
                    $scope.model.Stock1Percent =  diff;
                    $scope.move(1);
                }
            } 
            else if(!$scope.stock1HasChanged && $scope.stock2HasChanged) // if only stock2 is larger than the diff between stock1 and 100, change it's value
            {
                if(parseInt($scope.model.Stock2Percent) >= diff) {
                    $scope.model.Stock2Percent =  diff;
                    $scope.move(2);
                }
            } 
            else if($scope.stock1HasChanged && $scope.stock2HasChanged) // if the MaxPercent has been reached, lower the other two values if they've already changed
            {
                if(parseInt($scope.model.Stock1Percent + $scope.model.Stock2Percent) >= diff) {
                    $scope.model.Stock1Percent = $scope.model.Stock1Percent - (diff / 2);
                    $scope.move(1);
                    $scope.model.Stock2Percent = $scope.model.Stock2Percent - (diff / 2);
                    $scope.move(2);
                }
            }
            $scope.resetPie();
        };

        // get current stock prices and populate dropdowns
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22AAPL%22%2C%22AMD%22%2C%22AMZN%22%2C%22BBY%22%2C%22CSCO%22%2C%22EA%22%2C%22FORD%22%2C%22GE%22%2C%22GOOG%22%2C%22HPQ%22%2C%22HTCH%22%2C%22IBM%22%2C%22INTC%22%2C%22LGEAF%22%2C%22LNVGF%22%2C%22LOGI%22%2C%22MSFT%22%2C%22MSI%22%2C%22NOK%22%2C%22NTDOF%22%2C%22SMSGF%22%2C%22SNE%22%2C%22T%22%2C%22TXN%22%2C%22VZ%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
            .success(function(response) {$scope.responseList = response;})
            .then(function() {
                angular.forEach($scope.responseList.query.results.quote, function(item) {
                    $scope.stock = {
                          StockSymbol: item.symbol,
                          StockCurrentPrice: item.LastTradePriceOnly
                    };
                    $scope.stockList.push($scope.stock);
                });
            });
            
        // load the page
        $scope.onLoad = function () {
            $scope.resetPie();
        };

        $scope.onLoad();
    });

    // ----------------------- CHARTS---------------------------------------------------- //
    'use strict';

    app.controller('MenuCtrl', function ($scope) {
      $scope.isCollapsed = true;
      $scope.charts = ['Line', 'Doughnut', 'Pie', 'Base'];
    });

    app.controller('LineCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      $scope.series = ['Series A', 'Series B'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };

      $timeout(function () {
        $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.data = [
          [28, 48, 40, 19, 86, 27, 90],
          [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.series = ['Series C', 'Series D'];
      }, 3000);
    }]);

    app.controller('DoughnutCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
      $scope.data = [0, 0, 0];

      $timeout(function () {
        $scope.data = [350, 450, 100];
      }, 500);
    }]);

    app.controller('PieCtrl', function ($scope) {
      
    });

    app.controller('BaseCtrl', function ($scope) {
      $scope.labels = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
      $scope.data = [300, 500, 100, 40, 120];
      $scope.type = 'PolarArea';

      $scope.toggle = function () {
        $scope.type = $scope.type === 'PolarArea' ?  'Pie' : 'PolarArea';
      };
    });

    app.controller('TicksCtrl', ['$scope', '$interval', function ($scope, $interval) {
      var maximum = document.getElementById('container').clientWidth / 2 || 300;
      $scope.data = [[]];
      $scope.labels = [];
      $scope.options = {
        animation: false,
        showScale: false,
        showTooltips: false,
        pointDot: false,
        datasetStrokeWidth: 0.5
      };

      // Update the dataset at 25FPS for a smoothly-animating chart
      $interval(function () {
        getLiveChartData();
      }, 40);

      function getLiveChartData () {
        if ($scope.data[0].length) {
          $scope.labels = $scope.labels.slice(1);
          $scope.data[0] = $scope.data[0].slice(1);
        }

        while ($scope.data[0].length < maximum) {
          $scope.labels.push('');
          $scope.data[0].push(getRandomValue($scope.data[0]));
        }
      }
    }]);

    function getRandomValue (data) {
      var l = data.length, previous = l ? data[l - 1] : 50;
      var y = previous + Math.random() * 10 - 5;
      return y < 0 ? 0 : y > 100 ? 100 : y;
    }

    //app.controller('AppController', AppController);
}());