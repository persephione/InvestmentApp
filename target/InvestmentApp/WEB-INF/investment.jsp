<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.util.List"%>
<%@page import="java.io.*,java.util.*, javax.servlet.*"%>
<%@page contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="investment.*"%>
 
<jsp:useBean id="investmentDao" type="investment.InvestmentDao" scope="request" />
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
 
<html ng-app="app">
    <head>
        <title>Stock App</title>
        <script src="//code.angularjs.org/1.2.9/angular.min.js"></script>
        <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.1.js"></script>
        
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="http://www.tinavanriper.com/files/bootstrap-theme.min.css">
        <link rel="stylesheet" href="http://www.tinavanriper.com/files/bootstrap.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
        
        <script src="http://www.tinavanriper.com/files/Chart.js"></script>
        <script src="http://www.tinavanriper.com/files/angular-chart.js"></script>
        <script src="http://www.tinavanriper.com/files/ui-bootstrap-tpls.min.js"></script>
        <script src="http://www.tinavanriper.com/files/smoothscroll.min.js"></script>
        
        <script type="text/javascript">
            <%@ include file="app.js" %>    
        </script>
        
        <style type="text/css">
            <%@ include file="angular-chart.css" %>
            <%@ include file="style.css" %>
            <%@ include file="app.css" %>
        </style>
        
    </style>
    </head>
 
    <body ng-controller="AppController">
        <div class="container">
            <br /><br />
            <div class="container-fluid">
               <div class="text-center aspect-ratio" style="height:300px;" id="container" ng-controller="TicksCtrl">
                   <canvas width='1200' height='190' id="hero-bar" class="chart chart-line " data="data" options="options" labels="labels"></canvas>
                   <div class="header">
                       <div class="headerText tradeGothic"><h1><strong>Stock Investment App</strong></h1></div>
                  </div>
               </div>
            </div>
            
            <form method="POST" action="investment.html">
                <!----------------------- Left Pane ----------------------->
                <br /><br />
                <div class="leftPane">
                    <!-- Input name and investment amount -->
                    <div class="inputDiv">
                        <table class="inputTableTop">
                            <tr>
                                <td><input type="text" 
                                           ng-model="model.InvestorName" 
                                           id="InvestorName"
                                           name="InvestorName" 
                                           placeholder="Enter Your Name" 
                                           required />
                                </td>
                                <td><input type="text" 
                                           ng-model="model.InvestedAmount"
                                           id="InvestedAmount"
                                           name="InvestedAmount" 
                                           placeholder="Total Investment" 
                                           required />
                                </td>
                                <td>Purchase Date:
                                    <%
                                        Date today = new Date(System.currentTimeMillis());
                                        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");       
                                        String PurchaseDate = df.format(today);
                                        out.print(PurchaseDate);
                                     %>
                                     <input type="text" disabled id="PurchaseDate" name="PurchaseDate" value="PurchaseDate" hidden />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label>Stock 1</label>
                                    <div class="green"> 
                                        <select
                                            data-ng-model="stock1"
                                            data-ng-options="stock as (stock.StockSymbol + ' &nbsp; $' + stock.StockCurrentPrice) for stock in stockList">
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <label>Stock 2</label>
                                    <div class="blue">
                                        <select
                                            data-ng-model="stock2"
                                            data-ng-options="stock as (stock.StockSymbol + ' &nbsp; $' + stock.StockCurrentPrice) for stock in stockList">
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <label>Stock 3</label>
                                    <div class="purple">
                                        <select
                                            data-ng-model="stock3"
                                            data-ng-options="stock as (stock.StockSymbol + ' &nbsp; $' + stock.StockCurrentPrice) for stock in stockList">
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Sliders -->
                    <div class="sliderDiv">
                        <br /><br />
                        <table>
                            <tr>
                                <td>
                                    Stock 1:&nbsp; {{ stock1.StockSymbol }}
                                    <div id="slider1" ng-click="calculateStock1()"></div>
                                    <div><input id="currentval1" 
                                                type="text" 
                                                value="0"
                                                style="border: none;"
                                                ng-model="model.Stock1Percent"
                                                ng-blur="calculateStock1()"></div>
                                </td>
                                <td>
                                    Stock 2:&nbsp; {{ stock2.StockSymbol }}
                                    <div id="slider2" ng-click="calculateStock2()"></div>
                                    <div><input id="currentval2" 
                                                type="text" 
                                                value="0" 
                                                style="border: none;" 
                                                ng-model="model.Stock2Percent"
                                                ng-blur="calculateStock2()"></div>
                                </td>
                                <td>
                                    Stock 3:&nbsp; {{ stock3.StockSymbol }}
                                    <div id="slider3" ng-click="calculateStock3()"></div>
                                    <div><input id="currentval3" 
                                                type="text" 
                                                value="0" 
                                                style="border: none;" 
                                                ng-model="model.Stock3Percent"
                                                ng-blur="calculateStock3()"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <!----------------------- Right Pane ----------------------->
                <div class="rightPane">
                    <!-- Table of Stocks -->
                    <table class="stockTable">
                        <tr>
                            <th></th>
                            <th>Stock</th>
                            <th>Percentage</th>
                            <th>Number of Shares</th>
                            <th>Invested Amount</th>
                        </tr>
                        <tr class="green">
                            <td>Stock 1</td>
                            <td>{{ stock1.StockSymbol }}</td>
                            <td>{{ model.Stock1Percent }}%</td>
                            <td>{{ model.Stock1NumShares }}</td>
                            <td>{{ model.Stock1InvestedAmt }}</td>
                        </tr>
                        <tr class="blue">
                            <td>Stock 2</td>
                            <td>{{ stock2.StockSymbol }}</td>
                            <td>{{ model.Stock2Percent }}%</td>
                            <td>{{ model.Stock2NumShares }}</td>
                            <td>{{ model.Stock2InvestedAmt }}</td>
                        </tr>
                        <tr class="purple">
                            <td>Stock 3</td>
                            <td>{{ stock3.StockSymbol }}</td>
                            <td>{{ model.Stock3Percent }}%</td>
                            <td>{{ model.Stock3NumShares }}</td>
                            <td>{{ model.Stock3InvestedAmt }}</td>
                        </tr>
                        <tr class="orange">
                            <td colspan="2">Leftover Amount</td>
                            <td>{{ model.LeftoverPercent }}%</td>
                            <td></td>
                            <td>{{ model.LeftoverAmount | number:2}}</td>
                        </tr>
                    </table>
                    <br /><br />
                    
                    <!-- Pie of Stocks -->
                    <div class="stockPie">    
                        <div id="pie-chart">
                            <div class="panel panel-default">
                              <div class="panel-heading">Pie Chart</div>
                              <div class="panel-body">
                                <canvas id="pie" class="chart chart-pie chart-xs" data="data" labels="labels" legend="legend"></canvas>
                              </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div>
                        <input type="submit" value="Submit" class="submitButton btn-lg" />
                    </div>
                </div>
                
                <!-- Assign angular values to html elements to post to db -->
                <input type="hidden" name="LeftoverAmount" id="LeftoverAmount" value="{{ model.LeftoverAmount }}" />            
                <input type="hidden" name="Stock1Symbol" id="Stock1Symbol" value="{{ stock1.StockSymbol }}" />
                <input type="hidden" name="Stock1CurrentPrice" id="Stock1CurrentPrice" value="{{ stock1.StockCurrentPrice }}" />
                <input type="hidden" name="Stock1NumShares" id="Stock1NumShares" value="{{ model.Stock1NumShares }}" />
                <input type="hidden" name="Stock1Percent" id="Stock1Percent" value="{{ model.Stock1Percent }}" />

                <input type="hidden" name="Stock2Symbol" id="Stock2Symbol" value="{{ stock2.StockSymbol }}" />
                <input type="hidden" name="Stock2CurrentPrice" id="Stock2CurrentPrice" value="{{ stock2.StockCurrentPrice }}" />
                <input type="hidden" name="Stock2NumShares" id="Stock2NumShares" value="{{ model.Stock2NumShares }}" />
                <input type="hidden" name="Stock2Percent" id="Stock2Percent" value="{{ model.Stock2Percent }}" />

                <input type="hidden" name="Stock3Symbol" id="Stock3Symbol" value="{{ stock3.StockSymbol }}" />
                <input type="hidden" name="Stock3CurrentPrice" id="Stock3CurrentPrice" value="{{ stock3.StockCurrentPrice }}" />
                <input type="hidden" name="Stock3NumShares" id="Stock3NumShares" value="{{ model.Stock3NumShares }}" />
                <input type="hidden" name="Stock3Percent" id="Stock3Percent" value="{{ model.Stock3Percent }}" />
            </form>
            <br /><br />
            
            <div class="bottomSection">
                <br /><br />
                <table class="investmentsTable">
                    <tr><th colspan="2">*** INVESTMENTS CURRENTLY IN THE DATABASE ***</th></tr>
                        <% for (Investment investment : investmentDao.getAllInvestments()) { %>
                            <tr><td> <%= investment %> </td></tr>
                        <% } %>           
                </table>  
            </div>
        </div>      
        <script>  
            // this updates the stock1 percentage value
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
        </script>      
     </body>
 </html>
        

                