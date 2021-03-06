(function () {
    var app = angular.module('app', ['chart.js', 'ui.bootstrap', 'ui.bootstrap.modal']);
    app.controller('AppController', function ($scope, $http, $timeout) {
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
        $scope.resetPie = function () {
            $scope.labels = ['Stock 1: ' + $scope.stock1.StockSymbol, 'Stock 2: ' + $scope.stock2.StockSymbol, 'Stock 3: ' + $scope.stock3.StockSymbol];
            $scope.data = [
                parseInt($scope.model.Stock1Percent),
                parseInt($scope.model.Stock2Percent),
                parseInt($scope.model.Stock3Percent)
            ];
        };
        
        // Line Chart
        $scope.resetLine = function () {
            $scope.lineLabels = ['Stock 1: ' + $scope.stock1.StockSymbol, 'Stock 2: ' + $scope.stock2.StockSymbol, 'Stock 3: ' + $scope.stock3.StockSymbol];
            $scope.lineSeries = ['Year Low', 'Year High'];
            $scope.lineData = [
                [   
                    parseInt($scope.stock1.YearLow),
                    parseInt($scope.stock2.YearLow),
                    parseInt($scope.stock3.YearLow)
                ],
                [
                    parseInt($scope.stock1.YearHigh),
                    parseInt($scope.stock2.YearHigh),
                    parseInt($scope.stock3.YearHigh)
                ]
            ];

            $timeout(function () {
                $scope.lineLabels = ['Stock 1: ' + $scope.stock1.StockSymbol, 'Stock 2: ' + $scope.stock2.StockSymbol, 'Stock 3: ' + $scope.stock3.StockSymbol];
                $scope.lineSeries = ['Day\'s Low', 'Current Price', 'Day\'s High'];
                $scope.lineData = [
                    [   
                        parseInt($scope.stock1.DaysLow),
                        parseInt($scope.stock2.DaysLow),
                        parseInt($scope.stock3.DaysLow)
                    ],
                    [
                        parseInt($scope.stock1.StockCurrentPrice),
                        parseInt($scope.stock2.StockCurrentPrice),
                        parseInt($scope.stock3.StockCurrentPrice)
                    ],
                    [
                        parseInt($scope.stock1.DaysHigh),
                        parseInt($scope.stock2.DaysHigh),
                        parseInt($scope.stock3.DaysHigh)
                    ]
                ];
            }, 4000);
        };
        
        // Bar Chart
        $scope.resetBar = function () {
            $scope.barLabels = ['Stock 1: ' + $scope.stock1.StockSymbol, 'Stock 2: ' + $scope.stock2.StockSymbol, 'Stock 3: ' + $scope.stock3.StockSymbol];

            $scope.barData = [
                [
                    parseInt($scope.model.Stock1Percent),
                    parseInt($scope.model.Stock2Percent),
                    parseInt($scope.model.Stock3Percent)
                ]
            ];
        };
        
        // calls the chart and numShares functions at once
        function calculateData(){
            numShares();
            $scope.resetPie();
            $scope.resetLine();
            $scope.resetBar();
        };
        
        // move the slider handles on value change
        $scope.move = function (num) {
            if (num === 1)
                $("#slider1").slider('value', $scope.model.Stock1Percent);
            if (num === 2)
                $("#slider2").slider('value', $scope.model.Stock2Percent);
            if (num === 3)
                $("#slider3").slider('value', $scope.model.Stock3Percent);
        };
        
        // calculates all percentages on stock 1 percent value change
        $scope.calculateStock1 = function () {
            $scope.model.Stock1Percent = parseInt(document.getElementById("currentval1").value);
            $scope.stock1HasChanged = true;
            
            // Balance percentages
            var diff = MaxPercent - $scope.model.Stock1Percent;
            if ($scope.stock2HasChanged && !$scope.stock3HasChanged) // if only stock2 is larger than the diff between stock1 and 100, change it's value
            {
                if (parseInt($scope.model.Stock2Percent) >= diff) {
                    $scope.model.Stock2Percent = diff;
                    $scope.move(2);
                }               
            }
            else if (!$scope.stock2HasChanged && $scope.stock3HasChanged) // if only stock3 is larger than the diff between stock1 and 100, change it's value
            {
                if (parseInt($scope.model.Stock3Percent) >= diff) {
                    $scope.model.Stock3Percent = diff;
                    $scope.move(3);
                }               
            }
            else if ($scope.stock2HasChanged && $scope.stock3HasChanged) // if the MaxPercent has been reached, lower the other two values if they've already changed
            {
                if (parseInt($scope.model.Stock2Percent) + parseInt($scope.model.Stock3Percent) + parseInt($scope.model.Stock1Percent) > MaxPercent)
                {
                   var tmp = (parseInt($scope.model.Stock2Percent) + parseInt($scope.model.Stock3Percent) + parseInt($scope.model.Stock1Percent)) - 100;
                    while (tmp > 0)
                    {
                        if ($scope.model.Stock2Percent > 0)
                        {
                            $scope.model.Stock2Percent = $scope.model.Stock2Percent - 1;
                            $scope.move(2);
                            tmp--;
                        }
                        if ($scope.model.Stock3Percent > 0)
                        {
                            if (tmp > 0)
                            {
                                $scope.model.Stock3Percent = $scope.model.Stock3Percent - 1;
                                $scope.move(3);
                                tmp--;
                            }
                        }
                    }
                }
            }
            $scope.move(1);
            calculateData();
        };
        
        // calculates all percentages on stock 2 percent value change
        $scope.calculateStock2 = function () {
            $scope.model.Stock2Percent = document.getElementById("currentval2").value;
            $scope.stock2HasChanged = true;
            // Balance percentages
            var diff = MaxPercent - $scope.model.Stock2Percent;
            if ($scope.stock1HasChanged && !$scope.stock3HasChanged) // if only stock1 is larger than the diff between stock1 and 100, change it's value
            {
                if (parseInt($scope.model.Stock1Percent) >= diff) {
                    $scope.model.Stock1Percent = diff;
                    $scope.move(1);
                }              
            }
            else if (!$scope.stock1HasChanged && $scope.stock3HasChanged) // if only stock3 is larger than the diff between stock1 and 100, change it's value
            {
                if (parseInt($scope.model.Stock3Percent) >= diff) {
                    $scope.model.Stock3Percent = diff;
                    $scope.move(3);
                }                
            }
            else if ($scope.stock1HasChanged && $scope.stock3HasChanged) // if the MaxPercent has been reached, lower the other two values if they've already changed
            {
                if (parseInt($scope.model.Stock1Percent + $scope.model.Stock3Percent + parseInt($scope.model.Stock2Percent)) > MaxPercent) {
                     var tmp = (parseInt($scope.model.Stock2Percent) + parseInt($scope.model.Stock3Percent) + parseInt($scope.model.Stock1Percent)) - 100;
                    while (tmp > 0) {
                        if ($scope.model.Stock1Percent > 0)
                        {
                            $scope.model.Stock1Percent = $scope.model.Stock1Percent - 1;
                            $scope.move(1);
                            tmp--;
                        }
                        if ($scope.model.Stock3Percent > 0 && tmp > 0)
                        {
                            $scope.model.Stock3Percent = $scope.model.Stock3Percent - 1;
                            $scope.move(3);
                            tmp--;
                        }
                    }
                }
            }
            $scope.move(2);
            calculateData();
        };
        
        // calculates all percentages on stock 3 percent value change
        $scope.calculateStock3 = function () {
            $scope.model.Stock3Percent = document.getElementById("currentval3").value;
            $scope.stock3HasChanged = true;
            // Balance percentages
            var diff = MaxPercent - $scope.model.Stock3Percent;
            if ($scope.stock1HasChanged && !$scope.stock2HasChanged) // if only stock1 is larger than the diff between stock1 and 100, change it's value
            {
                if (parseInt($scope.model.Stock1Percent) >= diff) {
                    $scope.model.Stock1Percent = diff;
                    $scope.move(1);
                } 
            }
            else if (!$scope.stock1HasChanged && $scope.stock2HasChanged) // if only stock2 is larger than the diff between stock1 and 100, change it's value
            {
                if (parseInt($scope.model.Stock2Percent) >= diff) {
                    $scope.model.Stock2Percent = diff;
                    $scope.move(2);
                }    
            }
            else if ($scope.stock1HasChanged && $scope.stock2HasChanged) // if the MaxPercent has been reached, lower the other two values if they've already changed
            {
                if (parseInt($scope.model.Stock1Percent + $scope.model.Stock2Percent + parseInt($scope.model.Stock3Percent)) > MaxPercent) 
                {
                    var tmp = (parseInt($scope.model.Stock2Percent) + parseInt($scope.model.Stock3Percent) + parseInt($scope.model.Stock1Percent)) - 100;
                    while (tmp > 0)
                    {
                        if ($scope.model.Stock1Percent > 0)
                        {
                            $scope.model.Stock1Percent = $scope.model.Stock1Percent - 1;
                            $scope.move(1);
                            tmp--;                            
                        }
                        if ($scope.model.Stock2Percent > 0 && tmp > 0)
                        {
                            $scope.model.Stock2Percent = $scope.model.Stock2Percent - 1;
                            $scope.move(2);
                            tmp--;
                        }
                    }
                }
            }             
            $scope.move(3);
            calculateData();
        };
        
        function numShares() //calculates number of shares       
        {
            if ($scope.model.InvestedAmount !== '')
            {
                var amt1 = parseInt((parseFloat($scope.model.InvestedAmount) * (parseFloat($scope.model.Stock1Percent) / 100)) / parseFloat($scope.stock1.StockCurrentPrice));
                var amt2 = parseInt((parseFloat($scope.model.InvestedAmount) * (parseFloat($scope.model.Stock2Percent) / 100)) / parseFloat($scope.stock2.StockCurrentPrice));
                var amt3 = parseInt((parseFloat($scope.model.InvestedAmount) * (parseFloat($scope.model.Stock3Percent) / 100)) / parseFloat($scope.stock3.StockCurrentPrice));

                 if (parseFloat(amt1) ||  amt1 === 0)
                {
                    $scope.model.Stock1NumShares = amt1;
                    $scope.model.Stock1InvestedAmt = parseFloat(amt1 * $scope.stock1.StockCurrentPrice).toFixed(2);
                }else
                {
                    $scope.model.Stock1InvestedAmt =0;
                    $scope.model.Stock1NumShares = 0;
                }
                if (parseFloat(amt2) || amt2 === 0)
                {
                    $scope.model.Stock2NumShares = amt2;
                    $scope.model.Stock2InvestedAmt = parseFloat(amt2 * $scope.stock2.StockCurrentPrice).toFixed(2);
                }else
                {
                    $scope.model.Stock2InvestedAmt = 0;
                    $scope.model.Stock2NumShares = 0;
                }
                if (parseFloat(amt3) || amt3 === 0)
                {
                    $scope.model.Stock3NumShares = amt3;
                    $scope.model.Stock3InvestedAmt = parseFloat(amt3 * $scope.stock3.StockCurrentPrice).toFixed(2);
                }else
                {
                    $scope.model.Stock3InvestedAmt = 0;
                    $scope.model.Stock3NumShares = 0;
                }

                $scope.model.LeftoverAmount = parseFloat($scope.model.InvestedAmount).toFixed(2) - (parseFloat($scope.model.Stock1InvestedAmt) + parseFloat($scope.model.Stock2InvestedAmt) + parseFloat($scope.model.Stock3InvestedAmt));
            }
        }
        
        // get current stock prices and populate dropdowns
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22AAPL%22%2C%22AMD%22%2C%22AMZN%22%2C%22BBY%22%2C%22CSCO%22%2C%22EA%22%2C%22FORD%22%2C%22GE%22%2C%22GOOG%22%2C%22HPQ%22%2C%22HTCH%22%2C%22IBM%22%2C%22INTC%22%2C%22LGAH%22%2C%22LNVGF%22%2C%22LOGI%22%2C%22MSFT%22%2C%22MSI%22%2C%22NOK%22%2C%22NTDOF%22%2C%22SMSGF%22%2C%22SNE%22%2C%22T%22%2C%22TXN%22%2C%22VZ%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
                .success(function (response) {
                    $scope.responseList = response;
                })
                .then(function () {
                    angular.forEach($scope.responseList.query.results.quote, function (item) {
                        $scope.stock = {
                            StockSymbol: item.symbol,
                            StockCurrentPrice: item.LastTradePriceOnly,
                            DaysHigh: item.DaysHigh,
                            DaysLow: item.DaysLow,
                            YearHigh: item.YearHigh,
                            YearLow: item.YearLow
                        };
                        $scope.stockList.push($scope.stock);
                    });
                });
        
        $scope.openModal = function(){
            $scope.showModal = true;
        };
        
        $scope.ok = function() {
          $scope.showModal = false;
        };

        $scope.cancel = function() {
          $scope.showModal = false;
        };

        // load the page
//        $scope.onLoad = function () {
//
//        };
//        $scope.onLoad();
    });
    
    'use strict';
    app.controller('TicksCtrl', ['$scope', '$interval', function ($scope, $interval) {
            var maximum = document.getElementById('container').clientWidth / 2 || 300;
            $scope.data = [[]];
            $scope.labels = [];
            $scope.options = {
                animation: false,
                showScale: true,
                showTooltips: false,
                pointDot: true,
                datasetStrokeWidth: 0.5,
                scaleFontColor: "red",
                scaleGridLineColor : "white"
            };
            // Update the dataset at 25FPS for a smoothly-animating chart
            $interval(function () {
                getLiveChartData();
            }, 600);
            function getLiveChartData() {
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
    function getRandomValue(data) {
        var l = data.length, previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        return y < 0 ? 0 : y > 100 ? 100 : y;
    }
}());

$(function () {
    $("#slider1").slider({
        max: 100,
        min: 0,
        value: 0,
        slide: function (e, ui) {
            $('#currentval1').val(ui.value);
        }
    });
}); 

$(function () {
    $("#slider2").slider({
        max: 100,
        min: 0,
        value: 0,
        slide: function (e, ui) {
            $('#currentval2').val(ui.value);
        }
    });
});
$(function () {
    $("#slider3").slider({
        max: 100,
        min: 0,
        value: 0,
        slide: function (e, ui) {
            $('#currentval3').val(ui.value);
        }
    });
}); 
