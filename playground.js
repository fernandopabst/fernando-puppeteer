const puppeteer = require("puppeteer");

const readXlsxFile = require("read-excel-file/node");
const path = require("path");
var fs = require("fs");
const downloadPath = path.resolve("./temp");

// POST content of Flow HTTP action

`{
    "headers": {
        "Connection": "Keep-Alive",
        "Accept": "application/json",
        "Host": "prod-115.westeurope.logic.azure.com",
        "User-Agent": "Mozilla/5.0,(Windows; U; Windows NT 5.1; en-US; rv:1.8.1.21),Gecko/20100312,Firefox/3.6",
        "Content-Length": "10381",
        "Content-Type": "application/json; charset=UTF-8"
    },
    "body": {
        "varClient": "Innovate UK (led by OPP)\r\n",
        "varContribution": "61,799.14\r\n",
        "varDuration": "18\r\n",
        "varIncome": "166,736.00\r\n",
        "varRIDS": "8,433.77\r\n",
        "varStart": "01/01/2021\r\n",
        "varTitle": "The development of date syrup wound dressings\r\n",
        "varStatus": "Submitted\r\n",
        "varType": "Pure Research (grant funded) (10%)\r\n",
        "varContent": "id=blitzstaffTimeTableblitz>\n            <tbody><tr>\n                <th style=blitzwidth:26%blitz>Staff member</th>\n                <th style=blitzwidth:13%blitz><span class=blitzml-2blitz>Unit</span></th>\n                <th style=blitzwidth:13%blitz><span class=blitzml-2blitz>Quantity</span></th>\n                <th style=blitzwidth:13%blitz><span class=blitzml-2blitz>Rate (£)</span></th>\n                <th style=blitzwidth:13%;blitz>On Costs Rate</th>\n                <th style=blitzwidth:16%;text-align:rightblitz><span class=blitzblitz>Total Cost (£)</span></th>\n                <th style=blitzwidth:6%blitz></th>\n            </tr>\n                \n                                                                            \n                            <tr>\n                                <td id=blitznameblitz style=blitzvertical-align:middleblitz>Sarah Maddocks</td>\n                                <td>\n                                    <select class=blitzform-control autosaveblitz name=blitzsm19222_st_unitblitz id=blitzsm19222_st_unitblitz readonly=blitzblitz>\n                                        <option value=blitz1blitz name=blitzHoursblitz>Hours</option>\n                                        <option value=blitz2blitz name=blitzDaysblitz>Days</option>\n                                        <option value=blitz3blitz name=blitzFTEblitz selected=blitzblitz>FTE</option>\n                                    </select>\n                                </td>\n                                <td><input type=blitznumberblitz step=blitzanyblitz id=blitzsm19222_st_quantityblitz name=blitzsm19222_st_quantityblitz value=blitz0.05blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'st');blitz readonly=blitzblitz></td>\n                                <td><input type=blitznumberblitz step=blitzanyblitz id=blitzsm19222_st_rateblitz name=blitzsm19222_st_rateblitz value=blitz82577.78blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'st');blitz readonly=blitzblitz></td>\n                                <td><input type=blitznumberblitz id=blitzsm19222_st_ocrateblitz name=blitzsm19222_st_ocrateblitz value=blitz35blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'st');blitz></td>\n\n                                <td><input id=blitzsm19222_st_totalCostblitz name=blitzsm19222_st_totalCostblitz value=blitz5574blitz class=blitzform-control-plaintext mr-3 num st_totalCostblitz style=blitztext-align:rightblitz readonly=blitzblitz></td>\n                                <td style=blitzvertical-align:middleblitz>\n                                    \n                                                                            <span class=blitzblitz title=blitzRemoveblitz><i style=blitzblitz class=blitzfar fa-trash-alt float-rightblitz></i></span> \n                                    \n                                    <input type=blitzhiddenblitz id=blitzsm19222_st_staffUserIdblitz name=blitzsm19222_st_staffUserIdblitz value=blitzsm19222blitz>\n                                    <input type=blitzhiddenblitz id=blitzsm19222_st_staffCostIdblitz name=blitzsm19222_st_staffCostIdblitz value=blitz956blitz>\n                                </td>\n                            </tr>\n                                                                                                                                                                        \n            <!-- clonable table row -->\n            <tr class=blitzhideblitz style=blitzdisplay:none;blitz>\n                <td id=blitzst_nameblitz style=blitzvertical-align:middleblitz></td>\n                <td>\n                    <select class=blitzform-control autosaveblitz name=blitzst_unitblitz id=blitzst_unitblitz>\n                        <option value=blitz1blitz name=blitzHoursblitz>Hours</option>\n                        <option value=blitz2blitz name=blitzDaysblitz>Days</option>\n                        <option value=blitz3blitz name=blitzFTEblitz>FTE</option>\n                    </select>\n                </td>\n                <td><input type=blitznumberblitz step=blitzanyblitz id=blitzst_quantityblitz name=blitzst_quantityblitz value=blitz0blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'st');blitz></td>\n                <td><input type=blitznumberblitz step=blitzanyblitz id=blitzst_rateblitz name=blitzst_rateblitz value=blitz0blitz class=blitzform-control cal autosaveblitz oninput=blitzcalculate(this, 'st');blitz></td>\n                <td><input type=blitznumberblitz id=blitzst_ocrateblitz name=blitzst_ocrateblitz value=blitz35blitz class=blitzform-control cal autosaveblitz oninput=blitzcalculate(this, 'st');blitz></td>\n                <td><input id=blitzst_totalCostblitz name=blitzst_totalCostblitz value=blitz0blitz class=blitzform-control-plaintext mr-3 st_totalCostblitz style=blitztext-align:rightblitz readonly=blitzblitz></td>\n                <td style=blitzvertical-align:middleblitz>\n                    <span class=blitz",
        "varContentHPL": "id=blitzhplCoverTableblitz>\n            <tbody><tr>\n                <th style=blitzwidth:26%blitz>Staff member</th>\n                <th style=blitzwidth:13%blitz><span class=blitzml-2blitz>Unit</span></th>\n                <th style=blitzwidth:13%blitz><span class=blitzml-2blitz>Quantity</span></th>\n                <th style=blitzwidth:13%blitz><span class=blitzml-2blitz>Rate (£)</span></th>\n                <th style=blitzwidth:13%;blitz>On Costs Rate</th>\n                <th style=blitzwidth:16%;text-align:rightblitz><span class=blitzblitz>Total Cost (£)</span></th>\n                <th style=blitzwidth:6%blitz></th>\n            </tr>\n            \n                                                                                                            <tr>\n                        <td id=blitznameblitz style=blitzvertical-align:middleblitz>Sarah Maddocks</td>\n                        <td>\n                            <select class=blitzform-control autosaveblitz name=blitzsm19222_hpl_unitblitz id=blitzsm19222_hpl_unitblitz readonly=blitzblitz>\n                                <option value=blitz1blitz name=blitzHoursblitz selected=blitzblitz>Hours</option>\n                                <option value=blitz2blitz name=blitzDaysblitz>Days</option>\n                                <option value=blitz3blitz name=blitzFTEblitz>FTE</option>\n                            </select>\n                        </td>\n                        \n                        <td><input type=blitznumberblitz step=blitzanyblitz id=blitzsm19222_hpl_quantityblitz name=blitzsm19222_hpl_quantityblitz value=blitz60blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'hpl');blitz readonly=blitzblitz></td>\n                        <td><input type=blitznumberblitz step=blitzanyblitz id=blitzsm19222_hpl_rateblitz name=blitzsm19222_hpl_rateblitz value=blitz50.06blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'hpl');blitz readonly=blitzblitz></td>\n                        <td><input type=blitznumberblitz id=blitzsm19222_hpl_ocrateblitz name=blitzsm19222_hpl_ocrateblitz value=blitz35blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'hpl');blitz></td>\n                        <td><input step=blitzanyblitz id=blitzsm19222_hpl_totalCostblitz name=blitzsm19222_hpl_totalCostblitz value=blitz4054.86blitz class=blitzform-control-plaintext num mr-3 hpl_totalCostblitz style=blitztext-align:rightblitz readonly=blitzblitz></td>\n                        <td style=blitzvertical-align:middleblitz>\n                                                            <span class=blitzblitz title=blitzRemoveblitz><i style=blitzblitz class=blitzfar fa-trash-alt float-rightblitz></i></span> \n                                                        <input type=blitzhiddenblitz id=blitzsm19222_hpl_staffUserIdblitz name=blitzsm19222_hpl_staffUserIdblitz value=blitzsm19222blitz>\n                            <input type=blitzhiddenblitz id=blitzsm19222_hpl_staffCostIdblitz name=blitzsm19222_hpl_staffCostIdblitz value=blitz957blitz>\n                        </td>\n                    </tr>\n                                                                                    \n            <!-- clonable table row -->\n            <tr class=blitzhideblitz style=blitzdisplay:none;blitz>\n                <td id=blitzhpl_nameblitz style=blitzvertical-align:middleblitz></td>\n                <td>\n                    <select class=blitzform-control autosaveblitz name=blitzhpl_unitblitz id=blitzhpl_unitblitz>\n                        <option value=blitz1blitz name=blitzHoursblitz>Hours</option>\n                        <option value=blitz2blitz name=blitzDaysblitz>Days</option>\n                        <option value=blitz3blitz name=blitzFTEblitz>FTE</option>\n                    </select>\n                </td>\n                <td><input type=blitznumberblitz step=blitzanyblitz id=blitzhpl_quantityblitz name=blitzhpl_quantityblitz value=blitz0blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'hpl');blitz></td>\n                <td><input type=blitznumberblitz step=blitzanyblitz id=blitzhpl_rateblitz name=blitzhpl_rateblitz value=blitz0blitz class=blitzform-control calc autosaveblitz oninput=blitzcalculate(this, 'hpl');blitz></td>\n                <td><input type=blitznumberblitz id=blitzhpl_ocrateblitz name=blitzhpl_ocrateblitz value=blitz35blitz class=blitzform-control cal autosaveblitz oninput=blitzcalculate(this, 'hpl');blitz></td>\n                <td><input id=blitzhpl_totalCostblitz name=blitzhpl_totalCostblitz value=blitz0blitz class=blitzform-control-plaintext mr-3 hpl_totalCostblitz style=blitztext-align:rightblitz readonly=blitzblitz></td>\n                <td style=blitzvertical-align:middleblitz>\n                    <span class=",
        "varID": "334",
        "summary": "Sarah Maddocks is applying as the research collaborators to Innovate UK for funding to develop the date syrup wound dressings.\r\n"
    }
}`;

// mock-up of Html

const htmlStringSummary = `

<!-- Projects Navigation -->


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Title -->
    <title>    Costing and Pricing
</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" 
    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    <!-- Styles -->
    <link href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/app.css" rel="stylesheet">
    <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/cmet.css>
        <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/candp.css>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/select2-bootstrap4-theme.css>
    
</head>
<body>
    <div id="app">
        <nav class="navbar-expand-lg container-fluid bg-dark-blue">
            <div class="container text-white">
                     
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-dark container-fluid bg-dark">
            <div class="container">
                <a class="navbar-brand" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing">
                                            <h1>Costing and Pricing</h1>
                                    </a>
                <div class="ml-auto">
                    <img src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/img/CMET-logo.png" height="75" alt="Cardiff Met Logo">
                </div>
            </div>
        </nav>
        <nav class="navbar navbar-dark navbar-expand-md container-fluid bg-mid-blue navbar-cmet-navigation" >
            <div class="container">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul class="navbar-nav">
                          <li class="nav-item"><a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing"><i class="fas fa-home"></i></a></li>
  <li class="nav-item active"><a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects">Projects <span class="sr-only">(current)</span></a></li>

   
  <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Approvals      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvals">Approvals</a>
        
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvalStreams/index">Assign Approvers</a>
        
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvals/manage">Manage Approvers</a>
        
      </div>
  </li>
  
                      </ul>
        
                    
<a type="button"
    style="color:white;"
    tabindex="0"
    role="button"
    data-trigger="focus"
    class="ml-auto btn btn-sm btn-cmet" 
    data-toggle="popover" 
    data-placement="bottom"
    data-html="true" 
    title="Fernando Pabst Silva" 
    data-content="&lt;strong&gt;Roles&lt;/strong&gt;&lt;br/&gt;Support Staff - CSSHS&lt;br/&gt;&lt;br/&gt;&lt;strong&gt;Capabilities&lt;/strong&gt;&lt;br/&gt;CSSHS - Assign Approvers&lt;br/&gt;CSSHS - Manage Approvals&lt;br/&gt;CSSHS - Manage Projects&lt;br/&gt;CSSHS - Submit Projects&lt;br/&gt;CSSHS - Delete Projects&lt;br/&gt;RIS and Finance Edit&lt;br/&gt;CSSHS - View Approvals&lt;br/&gt;">
    <i class="fas fa-user"></i>
</a>
                    
                </div>
            </div>
        </nav>

        <main class="py-2">
            
    <div class="container">

        <div class="row pt-2">
  <div class="col-md-12">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
                  <li class="breadcrumb-item" aria-current="page">Projects</li>
    <li class="breadcrumb-item active" aria-current="page">Mechanisms of increased sympathetic activity in acute and chronic hypoxia; potential role for the pulmonary vascular baroreceptors</li>
          </ol>
      </nav>
  </div>
</div>

                
        <div class="row">
            <div class="col-md-12">
                            </div>
        </div>

            <form method="POST" id="form" action="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/update">
    <input type="hidden" name="_method" value="PUT">    <input type="hidden" name="_token" value="4gJfAqCKBjKAOXAAENW7ZFl5pIuAOGZY3WxwUSRn">    <input type="hidden" id="projectId" name="projectId" value="340">
    <input type="hidden" id="btnSubmit" name="btnSubmit" value="">

        <div class="row">
            <div class="col-md-12">
                <div class="row mb-2">
    <div class="col-md-12">
        
            
        <a autofocus href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects" class="btn btn-cmet btn-sm"><i class="fas fa-arrow-left"></i> Back</a>
                                                         
                        <button  name="btnSubmit" value="Edit" class="btn btn-success btn-sm" onclick="$('#btnSubmit').val('Edit');$('#form').submit();$(this).attr('disabled',true)"><i class="fas fa-edit"></i>  Edit</button>
                                        
                                                    <button type="submit" name="btnSubmit" value="MakeLive" class="btn btn-success btn-sm"><i class="fas fa-play"></i>  Make Live</button>
                                 <!-- For tab-specific options -->
                    
                                                        <button name="btnSubmit" value="Delete" class="btn btn-danger btn-sm" onclick="$('#btnSubmit').val('Delete');$('#form').submit();$(this).attr('disabled',true)"><i class="fas fa-trash-alt"></i> Not proceeding</button>
                                
             
        

        <a href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/generatePDF" target="_blank" role="button" class="btn btn-cmet btn-sm"><i class="fas fa-print"></i> Print</a>

            
        
    </div>
</div>
            </div>
        </div>

        
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <label for="status" class="col-2 col-form-label" >Status</label>
                <input type="text" class="form-control-plaintext col-10" readonly value="Approved" />
            </div>
                    
                    </div>
    </div>

    
    
    <!-- Tabs -->
    <div class="row mb-4">
        <div class="col-md-12">
            <ul class="nav nav-tabs">
                
                
    
        
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/details">Details</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/personnel">Personnel</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/otherDirectCosts">Other Direct Costs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/riskAssessment">Risk Assessment</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/price">Price</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/attachments">Attachments</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/developmentScheme">R&I Dev Scheme</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/summary">Summary</a>
            </li>
                            <li class="nav-item">
                    <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/risAndFinance">RIS & Finance Only</a>
                </li>
            
        
    
          </ul>
        </div>
    </div>

 
        <input type="hidden" name="tab" value="summary">
    <input type="hidden" name="newTab" id="newTab" value="summary">
    

    <div class="row mt-4">
        <div class="col-md-6">
            <div class="card bg-light mb-3" >
                <div class="card-header"><h4>Overview</h4></div>
                <div class="card-body">
    
                    <div class="form-group row">
                        <label for="status" class="col-4 col-form-label" >Project</label>
                        <input type="text" class="form-control-plaintext col-8" readonly value="Mechanisms of increased sympathetic activity in acute and chronic hypoxia; potential role for the pulmonary vascular baroreceptors" />
                    </div>
                    <div class="form-group row">
                        <label for="description" class="col-4 col-form-label" >Summary</label>
                        <textarea class="form-control-plaintext col-8" readonly >Exploring the mechanistic role the pulmonary vasculature plays in autonomic control in hypoxia &amp; determining whether this control mechanism differs in those with altitude-related clinical pathology.</textarea>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-4 col-form-label" >Project Manager</label>
                        <input type="text" class="form-control-plaintext col-8" readonly value="Michael Stembridge" />
                    </div>
                    <div class="form-group row">
                        <label class="col-4 col-form-label" >Version</label>
                        <input type="text" class="form-control-plaintext col-8" readonly value="1" />
                    </div>
                    <div class="form-group row">
                        <label for="costCode" class="col-4 col-form-label">Cost Code</label>
                                                    <input type="text" value="To be completed by Finance" class="form-control-plaintext col-md-8"> 
                                            </div>
                    <hr/>
    
                    <div class="form-group row">
                        
                        <label for="status" class="col-6 col-form-label" >Price (ex VAT) (£)</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="9,950.00" style="text-align: right;"/>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" >Price (inc VAT) (£)</label>
                        <input type="text" class="form-control-plaintext col-3" readonly value="9,950.00" style="text-align: right;"/>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" style="padding-left:30px; !important; font-style:italic;">Direct Costs</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="18,701.98" style="text-align: right;"/>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" style="padding-left:30px !important; font-style:italic;">Contribution to Overheads</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="1,870.20" style="text-align: right;"/>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" >Total Costs (£)</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="20,572.18" style="text-align: right;"/>
                    </div>
    
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" style="font-weight: bold !important;" >Return (£)</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="-10,622.18" style="text-align: right; font-weight: bold !important;" />
                    </div>
    
                    <hr/>
    
    
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" >Notional Staff Costs</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="8,751.98" style="text-align: right;"/>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label"  >Contribution to Overheads</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="1,870.20" style="text-align: right;"/>
                    </div>
    
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" style="font-weight: bold !important;">Contribution to University (£)</label>
                    <input type="text" class="form-control-plaintext col-5" readonly value="0.00" style="text-align: right;font-weight: bold !important;"/>
                    </div>
    
                    <hr/>
                    <div class="form-group row">
                        <label for="status" class="col-6 col-form-label" >Development scheme (£)</label>
                        <input type="text" class="form-control-plaintext col-5" readonly value="0.00" style="text-align: right;"/>
                    </div>
        
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-12">
                    <div class="card bg-light mb-3" >
                        <div class="card-header">
                            <h4>
                                Risk                                <span class="float-right" style="line-height: inherit;">
                                    <i class="fas fa-circle" id="riskIndicator" style="font-size:20px"></i>
                                </span>
                            </h4>
                            <input type="hidden" id="riskLevel" value="1"/>
                            
                        </div>
                        <div class="card-body">
                            <br>
                            <table class="table table-sm table-hover">
                                <tr>
                                    <th style="border-top:none;"></th>
                                    <th style="border-top:none;">Category</th>
                                </tr>
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskHealthAndSafety"></i></span></td>
                                    <td>Health & Safety</td>
                                    <input type="hidden" id="HealthAndSafetyIssuesRiskLevel" value="1"/>
                                </tr>  
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskFinancial"></i></span></td>
                                    <td>Financial</td>
                                    <input type="hidden" id="FinancialRiskLevel" value="0"/>
                                </tr> 
                                <tr>
                                    <td><span class="align-text-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskEthics"></i></span></td>
                                    <td>Ethical</td>
                                    <input type="hidden" id="EthicalIssuesRiskLevel" value="1"/>
                                </tr>
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskIP"></i></span></td>
                                    <td>Intellectual Property Rights</td>
                                    <input type="hidden" id="IntellectualPropertyRiskLevel" value="0"/>
                                </tr>                            
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskSensitivities"></i></span></td>
                                    <td>Commercial Sensitivities</td>
                                    <input type="hidden" id="SensitivitiesRiskLevel" value="0"/>
                                </tr>                            
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskAvailability"></i></span></td>
                                    <td>Staff/Resource Availability</td>
                                    <input type="hidden" id="AvailabilityIssuesRiskLevel" value="0"/>
                                </tr>
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskData"></i></span></td>
                                    <td>Data protection/ management</td>
                                    <input type="hidden" id="DataRiskLevel" value="1"/>
                                </tr> 
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskMaterials"></i></span></td>
                                    <td>Material Transfer</td>
                                    <input type="hidden" id="MaterialRiskLevel" value="1"/>
                                </tr> 
                                <tr>
                                    <td><span class="align-bottom"><i class="fab fa-font-awesome-flag mr-3" id="riskOther"></i></span></td>
                                    <td>Any other relevant risks</td>
                                    <input type="hidden" id="OtherRiskLevel" value="1"/>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="card bg-light mb-3" >
                        <div class="card-header">
                            <h4>Approval History</h4>
                        </div>
                        <div class="card-body">
                            <br>
                            <table class="table table-sm table-hover">
                                <tr>
                                    
                                    <th style="border-top:none;" colspan="2">Approver / Group</th>
                                    <th style="border-top:none;" >Version</th>
                                    <th style="border-top:none;" class="float-right">Date / Time</th>
                                    
                                </tr>
    
                                                 
    
                                                                                    <tr>
                                                <td>
                                                                                                            <span class="align-text-bottom"><i class="fas fa-check-circle text-success" id=""></i></span>
                                                                                                    </td>
                                                <td>
                                                     
                                                        Robyn Jones   
                                                                                                    </td>
                                                <td>
                                                    1
                                                </td>
                                                <td style="text-align: right;">
                                                        
                                                        2021-09-23 10:55:27
    
    
                                                                                                    </td>
                                            </tr>
                                                                                    
    
                                                                                    <tr>
                                                <td>
                                                                                                            <span class="align-text-bottom"><i class="fas fa-check-circle text-success" id=""></i></span>
                                                                                                    </td>
                                                <td>
                                                     
                                                        Katie Thirlaway   
                                                                                                    </td>
                                                <td>
                                                    1
                                                </td>
                                                <td style="text-align: right;">
                                                        
                                                        2021-09-23 12:48:46
    
    
                                                                                                    </td>
                                            </tr>
                                                                                    
    
                                                                                    <tr>
                                                <td>
                                                                                                            <span class="align-text-bottom"><i class="fas fa-check-circle text-success" id=""></i></span>
                                                                                                    </td>
                                                <td>
                                                     
                                                        Sheldon Hanton   
                                                                                                    </td>
                                                <td>
                                                    1
                                                </td>
                                                <td style="text-align: right;">
                                                        
                                                        2021-09-23 16:03:43
    
    
                                                                                                    </td>
                                            </tr>
                                                                           
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            
        </div>
    </div>

    <div class="row mt-4 mb-4">
        <div class="col-md-12 ">
            <div class="form-inline float-right">


            
                

                    
                                            <a class="btn btnSub btn-cmet mr-2" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/developmentScheme"><i class="fas fa-arrow-left"></i> Previous</a>
                        <a class="btn btnSub btn-success" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/risAndFinance">Next <i class="fas fa-arrow-right"></i></a>
                                    

            
                
                
                
       
            </div>
        </div>
    </div>



        </form>

                
    </div>

        </main>
    </div>
    <footer class="footer container-fluid footer-outer">
        <div class="container footer-inner">
                        <img class="img-fluid float-right" src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/img/LIS-logo.png" style="max-height:100%;" alt="L&IS Logo">
        </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/js/app.js"></script>
    <script>
$( document ).ready(function() {
    $('[data-toggle="popover"]').popover();
});
</script>
<script>
$(document).ready(function(){
    
    var timer;
    var timeout = 1000 * 60 * 5; // Timout duration, 1000 = 1 second
    
    $('#form .autosave').keyup(function()
    {
        
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
 
    });

    // Select boxes and dates
    $('#form .autosave').change(function()
    {
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
 
    });

});
function saveData(){
    
    // Submit form (after 5 minutes of inactivity).
    $('#form').submit();    
    return;

};

function removeValueFromHiddenInput(inputId, val)
    {
        array = $('#'+inputId)[0].value.split(',');
        var index = array.indexOf(val);
        if (index !== -1) array.splice(index, 1);
        $('#'+inputId).val(array.toString());
    }

    function addValueToHiddenInput(inputId, val)
    {
        var inputValueString = $('#'+inputId)[0].value;
        array = [];
        if (inputValueString != "") {
            array = inputValueString.split(",");
        }
        array.push(val);
        $('#'+inputId).val(array.toString());

    }
</script>
<script>
function setRiskColour()
{

    var riskLevel = $('#riskLevel').val();

    if (riskLevel == 0 || riskLevel == 1)
    {
        $('#riskIndicator').addClass('text-success');
    }
    if (riskLevel == 2)
    {
        $('#riskIndicator').addClass('text-warning');
    }
    if (riskLevel == 3)
    {
        $('#riskIndicator').addClass('text-danger');
    }


    var eth = $('#EthicalIssuesRiskLevel').val();
    if (eth == 0 || eth == 1)
    {
        $('#riskEthics').addClass('text-success');
    }
    if (eth == 2)
    {
        $('#riskEthics').addClass('text-warning');
    }
    if (eth == 3)
    {
        $('#riskEthics').addClass('text-danger');
    }

    var sen = $('#SensitivitiesRiskLevel').val();
    if (sen == 0 || sen == 1)
    {
        $('#riskSensitivities').addClass('text-success');
    }
    if (sen == 2)
    {
        $('#riskSensitivities').addClass('text-warning');
    }
    if (sen == 3)
    {
        $('#riskSensitivities').addClass('text-danger');
    }

    var ava = $('#AvailabilityIssuesRiskLevel').val();
    if (ava == 0 || ava == 1)
    {
        $('#riskAvailability').addClass('text-success');
    }
    if (ava == 2)
    {
        $('#riskAvailability').addClass('text-warning');
    }
    if (ava == 3)
    {
        $('#riskAvailability').addClass('text-danger');
    }

    var hea = $('#HealthAndSafetyIssuesRiskLevel').val();
    if (hea == 0 || hea == 1)
    {
        $('#riskHealthAndSafety').addClass('text-success');
    }
    if (hea == 2)
    {
        $('#riskHealthAndSafety').addClass('text-warning');
    }
    if (hea == 3)
    {
        $('#riskHealthAndSafety').addClass('text-danger');
    }

    var int = $('#IntellectualPropertyRiskLevel').val();
    if (int == 0 || int == 1)
    {
        $('#riskIP').addClass('text-success');
    }
    if (int == 2)
    {
        $('#riskIP').addClass('text-warning');
    }
    if (int == 3)
    {
        $('#riskIP').addClass('text-danger');
    }


    var oth = $('#OtherRiskLevel').val();
    if (oth == 0 || oth == 1)
    {
        $('#riskOther').addClass('text-success');
    }
    if (oth == 2)
    {
        $('#riskOther').addClass('text-warning');
    }
    if (oth == 3)
    {
        $('#riskOther').addClass('text-danger');
    }

    var fin = $('#FinancialRiskLevel').val();
    if (fin == 0 || fin == 1)
    {
        $('#riskFinancial').addClass('text-success');
    }
    if (fin == 2)
    {
        $('#riskFinancial').addClass('text-warning');
    }
    if (fin == 3)
    {
        $('#riskFinancial').addClass('text-danger');
    }

    var mat = $('#MaterialRiskLevel').val();
    if (mat == 0 || mat == 1)
    {
        $('#riskMaterials').addClass('text-success');
    }
    if (mat == 2)
    {
        $('#riskMaterials').addClass('text-warning');
    }
    if (mat == 3)
    {
        $('#riskMaterials').addClass('text-danger');
    }

    var dat = $('#DataRiskLevel').val();
    if (dat == 0 || dat == 1)
    {
        $('#riskData').addClass('text-success');
    }
    if (dat == 2)
    {
        $('#riskData').addClass('text-warning');
    }
    if (dat == 3)
    {
        $('#riskData').addClass('text-danger');
    }
}


$( document ).ready(function() {
    setRiskColour();
});
</script>

</body>
</html>
`;

const htmlStringEditDetails = `
<!-- Projects Navigation -->


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Title -->
    <title>    Costing and Pricing
</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" 
    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    <!-- Styles -->
    <link href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/app.css" rel="stylesheet">
    <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/cmet.css>
        <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/candp.css>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/select2-bootstrap4-theme.css>
        <link href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet">

</head>
<body>
    <div id="app">
        <nav class="navbar-expand-lg container-fluid bg-dark-blue">
            <div class="container text-white">
                     
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-dark container-fluid bg-dark">
            <div class="container">
                <a class="navbar-brand" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing">
                                            <h1>Costing and Pricing</h1>
                                    </a>
                <div class="ml-auto">
                    <img src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/img/CMET-logo.png" height="75" alt="Cardiff Met Logo">
                </div>
            </div>
        </nav>
        <nav class="navbar navbar-dark navbar-expand-md container-fluid bg-mid-blue navbar-cmet-navigation" >
            <div class="container">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul class="navbar-nav">
                          <li class="nav-item"><a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing"><i class="fas fa-home"></i></a></li>
  <li class="nav-item active"><a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects">Projects <span class="sr-only">(current)</span></a></li>

   
  <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Approvals      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvals">Approvals</a>
        
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvalStreams/index">Assign Approvers</a>
        
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvals/manage">Manage Approvers</a>
        
      </div>
  </li>
  
                      </ul>
        
                    
<a type="button"
    style="color:white;"
    tabindex="0"
    role="button"
    data-trigger="focus"
    class="ml-auto btn btn-sm btn-cmet" 
    data-toggle="popover" 
    data-placement="bottom"
    data-html="true" 
    title="Fernando Pabst Silva" 
    data-content="&lt;strong&gt;Roles&lt;/strong&gt;&lt;br/&gt;Support Staff - CSSHS&lt;br/&gt;&lt;br/&gt;&lt;strong&gt;Capabilities&lt;/strong&gt;&lt;br/&gt;CSSHS - Assign Approvers&lt;br/&gt;CSSHS - Manage Approvals&lt;br/&gt;CSSHS - Manage Projects&lt;br/&gt;CSSHS - Submit Projects&lt;br/&gt;CSSHS - Delete Projects&lt;br/&gt;RIS and Finance Edit&lt;br/&gt;CSSHS - View Approvals&lt;br/&gt;">
    <i class="fas fa-user"></i>
</a>
                    
                </div>
            </div>
        </nav>

        <main class="py-2">
            
    <div class="container">

        <div class="row pt-2">
  <div class="col-md-12">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
                  <li class="breadcrumb-item" aria-current="page">Projects</li>
    <li class="breadcrumb-item active" aria-current="page">Mechanisms of increased sympathetic activity in acute and chronic hypoxia; potential role for the pulmonary vascular baroreceptors</li>
          </ol>
      </nav>
  </div>
</div>

                
        <div class="row">
            <div class="col-md-12">
                            </div>
        </div>

            <form method="POST" id="form" action="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/update">
    <input type="hidden" name="_method" value="PUT">    <input type="hidden" name="_token" value="4gJfAqCKBjKAOXAAENW7ZFl5pIuAOGZY3WxwUSRn">    <input type="hidden" id="projectId" name="projectId" value="340">
    <input type="hidden" id="btnSubmit" name="btnSubmit" value="">

        <div class="row">
            <div class="col-md-12">
                <div class="row mb-2">
    <div class="col-md-12">
        
            
        <a autofocus href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects" class="btn btn-cmet btn-sm"><i class="fas fa-arrow-left"></i> Back</a>
                                                         
                        <button  name="btnSubmit" value="Edit" class="btn btn-success btn-sm" onclick="$('#btnSubmit').val('Edit');$('#form').submit();$(this).attr('disabled',true)"><i class="fas fa-edit"></i>  Edit</button>
                                        
                                                    <button type="submit" name="btnSubmit" value="MakeLive" class="btn btn-success btn-sm"><i class="fas fa-play"></i>  Make Live</button>
                                 <!-- For tab-specific options -->
                    
                                                        <button name="btnSubmit" value="Delete" class="btn btn-danger btn-sm" onclick="$('#btnSubmit').val('Delete');$('#form').submit();$(this).attr('disabled',true)"><i class="fas fa-trash-alt"></i> Not proceeding</button>
                                
             
        

        <a href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/generatePDF" target="_blank" role="button" class="btn btn-cmet btn-sm"><i class="fas fa-print"></i> Print</a>

            
        
    </div>
</div>
            </div>
        </div>

        
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <label for="status" class="col-2 col-form-label" >Status</label>
                <input type="text" class="form-control-plaintext col-10" readonly value="Approved" />
            </div>
                    
                    </div>
    </div>

    
    
    <!-- Tabs -->
    <div class="row mb-4">
        <div class="col-md-12">
            <ul class="nav nav-tabs">
                
                
    
        
            <li class="nav-item">
                <a class="nav-link active" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/details">Details</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/personnel">Personnel</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/otherDirectCosts">Other Direct Costs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/riskAssessment">Risk Assessment</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/price">Price</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/attachments">Attachments</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/developmentScheme">R&I Dev Scheme</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/summary">Summary</a>
            </li>
                            <li class="nav-item">
                    <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/risAndFinance">RIS & Finance Only</a>
                </li>
            
        
    
          </ul>
        </div>
    </div>

 
    
    <input type="hidden" name="tab" value="details">
    <input type="hidden" name="newTab" id="newTab" value="details">
    <div class="form-group row">
        <label for="name" class="col-md-2 col-form-label">Project Title</label>
        <input type="text" class="col-md-10 form-control autosave" id="name" name="name" value="Mechanisms of increased sympathetic activity in acute and chronic hypoxia; potential role for the pulmonary vascular baroreceptors" disabled>
    </div>

    
    <div class="form-group row">
                    <label for="projectManager autosave" class="col-md-2 col-form-label">Project Manager</label>
            <select class="col-md-6 form-control" id="projectManager" name="projectManager" disabled>
                                    <option value="sm18107" selected="selected">Michael Stembridge</option> 
                 
            </select>


            <input type="hidden" id="projectManagerName" name="projectManagerName" />
            </div>

    <div class="form-group row">
        <label for="costCode" class="col-md-2 col-form-label">Cost Code</label>
                    <input type="text" value="To be completed by Finance" class="form-control-plaintext col-md-6 ml-1"> 
            </div>

    <div class="form-group row">
        <label for="client" class="col-md-2 col-form-label">Client</label>
        <input type="text" class="col-md-10 form-control autosave" id="client" name="client" value="The Physiological Society" disabled>
    </div>

    <div class="form-group row">
        <label for="clientContactName" class="col-md-2 col-form-label">Client Contact Name</label>
        <input type="text" class="col-md-10 form-control autosave" id="clientContactName" name="clientContactName" value="Chrissy Stokes" disabled>
    </div> 

    <div class="form-group row">
        <label for="clientContactEmail" class="col-md-2 col-form-label">Client Contact Email</label>
        <input type="text" class="col-md-10 form-control autosave" id="clientContactEmail" name="clientContactEmail" value="cstokes@physoc.org" disabled>
    </div> 

    <div class="form-group row">
        <label for="schoolOrUnit" class="col-md-2 col-form-label">School or Unit</label>
        <select name="schoolOrUnit" id="schoolOrUnit" class="col-md-10 form-control autosave" disabled>
                            <option value="1" >Cardiff School of Education and Social Policy</option>
                            <option value="2" >Cardiff School of Art and Design</option>
                            <option value="3" >Cardiff School of Management</option>
                            <option value="4" >Cardiff School of Technologies</option>
                            <option value="5" selected>Cardiff School of Sports and Health Sciences</option>
                            <option value="6" >PDR</option>
                    </select>
    </div>

    <div class="form-group row">
        <label for="startDate" class="col-md-2 col-form-label">Estimated Start Date</label>
        <input type="text" class="col-md-3 form-control datepicker autosave" id="startDate" name="startDate" 
        disabled
        value=01/09/2021
        >
    </div>


    <div class="form-group row">
        <label for="estimatedDurationInMonths" class="col-md-2 col-form-label">Estimated Duration in Months</label>
        <input type="text" class="col-md-3 form-control autosave" id="estimatedDurationInMonths" name="estimatedDurationInMonths" 
        disabled
        value=18
        >
    </div>

    <div class="form-group row">
        <label for="summary" class="col-md-2 col-form-label">
            Project Summary            <span
                class="ml-2" 
                data-toggle="popover" 
                data-placement="right"
                data-html="true"
                onclick="event.preventDefault();"
                data-content="For innovation projects, provide sufficient detail to include in client quotes.">
                <i class="fas fa-info-circle"></i>
            </span>
        </label>
        <textarea class="col-md-10 form-control" id="summary" name="summary" disabled>Exploring the mechanistic role the pulmonary vasculature plays in autonomic control in hypoxia &amp; determining whether this control mechanism differs in those with altitude-related clinical pathology.</textarea>
    </div>

    <div class="form-group row">
        <label for="projectType" class="col-md-2 col-form-label">Project Type</label>
        <select name="projectType" id="projectType" class="col-md-10 form-control autosave" disabled>
                            <option value="1" >Commerical (40%)</option>
                            <option value="2" >Applied Research (25%)</option>
                            <option value="3" selected>Pure Research (grant funded) (10%)</option>
                    </select>
    </div>

    <div class="form-group row">
        <label for="projectTypeJustification" class="col-md-2 col-form-label">Project Type Justification</label>
        <textarea class="col-md-10 form-control autosave" id="projectTypeJustification" name="projectTypeJustification" disabled>Cost Code: SRPSMS. Awarded 2018 - Project was halted due to covid. 
Fully funded research grant. Funder will pay up to £10k. Funds can be used to conduct pilot studies, develop a new technique or finalise a project. Funding cannot be used to fund PhD studentships or pay staff, to pay for-attending conferences, personal/salary or general office costs. However, the grants offer flexibility for small equipment purchases amongst others items.</textarea>
    </div>

    <div class="row mt-4 mb-4">
        <div class="col-md-12">
                                                <a class="btn btn-success float-right" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/340/edit/personnel">Next <i class="fas fa-arrow-right"></i></a>
                                        </div>
    </div>




        </form>

                
    </div>

        </main>
    </div>
    <footer class="footer container-fluid footer-outer">
        <div class="container footer-inner">
                        <img class="img-fluid float-right" src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/img/LIS-logo.png" style="max-height:100%;" alt="L&IS Logo">
        </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/js/app.js"></script>
    <script>
$( document ).ready(function() {
    $('[data-toggle="popover"]').popover();
});
</script>
<script>
$(document).ready(function(){
    
    var timer;
    var timeout = 1000 * 60 * 5; // Timout duration, 1000 = 1 second
    
    $('#form .autosave').keyup(function()
    {
        
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
 
    });

    // Select boxes and dates
    $('#form .autosave').change(function()
    {
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
 
    });

});
function saveData(){
    
    // Submit form (after 5 minutes of inactivity).
    $('#form').submit();    
    return;

};

function removeValueFromHiddenInput(inputId, val)
    {
        array = $('#'+inputId)[0].value.split(',');
        var index = array.indexOf(val);
        if (index !== -1) array.splice(index, 1);
        $('#'+inputId).val(array.toString());
    }

    function addValueToHiddenInput(inputId, val)
    {
        var inputValueString = $('#'+inputId)[0].value;
        array = [];
        if (inputValueString != "") {
            array = inputValueString.split(",");
        }
        array.push(val);
        $('#'+inputId).val(array.toString());

    }
</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
    <script>

        if($('#projectManagerName').length)
        {
        
            $("#projectManager").select2({
                theme: 'bootstrap4',
                minimumInputLength: 3,
                ajax: {
                    url: "https://cis2.cardiffmet.ac.uk/CostingAndPricing/staffSearch",
                    dataType: 'json',
                    type: "GET",
                    delay: 500,
                    data: function (params) {
                        var queryParameters = {
                            searchString: params.term
                        }
                        return queryParameters;
                    },
                    processResults: function (data) {
                        return {
                            results: $.map(data, function (item) {
                                return {
                                    text: item.forename + ' ' + item.surname + ' (' + item.user_id + ', ' + item.email + ')',
                                    id: item.user_id
                                }
                            })
                        };
                    }
                }
            }).on('change', function() {

                var selection = $(this).find(':selected');

                
                // Get just the name without the email and staff id.
                var name = selection[0].text.substr(0, selection[0].text.indexOf(' ('));

                // Store the name so we can use it incase validation fails.
                $('#projectManagerName').val(name);

                // Wait half a second, then update the name (we don't need the staff Id and email address any more).
                var timeout2 = 500; // Timout duration, 1000 = 1 second
                setTimeout(function() {updateName(name);}, timeout2); 

                var timer;
                var timeout = 1000 * 60 * 5; // Timout duration, 1000 = 1 second
                if(timer)
                {
                    clearTimeout(timer);
                }
                timer = setTimeout(saveData, timeout); 

            });


            function updateName(name) {
                $('#select2-projectManager-container').html(name);
            };

        }
    </script>

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

            <script src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/js/datepicker-en-GB.js"></script>
    
    <script>
        $('.datepicker').datepicker({
                inline: true,
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                showButtonPanel: true,
                yearRange: "-1:+5",
                beforeShow: function (input) {
                    setTimeout(function () {
                        var clearButton = $(input)
                            .datepicker("widget")
                            .find(".ui-datepicker-close");
                        clearButton.unbind("click").bind("click", function () { $.datepicker._clearDate(input); });
                    }, 1);
                }
            },
                            $.datepicker.regional["en-GB"]
                    );
    </script>

</body>
</html>`;

const htmlStringPersonnel = `<!-- Projects Navigation -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Title -->
    <title>    Costing and Pricing
</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" 
    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    <!-- Styles -->
    <link href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/app.css" rel="stylesheet">
    <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/cmet.css>
        <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/candp.css>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href=https://cis2.cardiffmet.ac.uk/CostingAndPricing/css/select2-bootstrap4-theme.css>
    
</head>
<body>
    <div id="app">
        <nav class="navbar-expand-lg container-fluid bg-dark-blue">
            <div class="container text-white">
                     
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-dark container-fluid bg-dark">
            <div class="container">
                <a class="navbar-brand" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing">
                                            <h1>Costing and Pricing</h1>
                                    </a>
                <div class="ml-auto">
                    <img src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/img/CMET-logo.png" height="75" alt="Cardiff Met Logo">
                </div>
            </div>
        </nav>
        <nav class="navbar navbar-dark navbar-expand-md container-fluid bg-mid-blue navbar-cmet-navigation" >
            <div class="container">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul class="navbar-nav">
                          <li class="nav-item"><a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing"><i class="fas fa-home"></i></a></li>
  <li class="nav-item active"><a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects">Projects <span class="sr-only">(current)</span></a></li>

   
  <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Approvals      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvals">Approvals</a>
        
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvalStreams/index">Assign Approvers</a>
        
                  <a class="dropdown-item" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/approvals/manage">Manage Approvers</a>
        
      </div>
  </li>
  
                      </ul>
        
                    
<a type="button"
    style="color:white;"
    tabindex="0"
    role="button"
    data-trigger="focus"
    class="ml-auto btn btn-sm btn-cmet" 
    data-toggle="popover" 
    data-placement="bottom"
    data-html="true" 
    title="Fernando Pabst Silva" 
    data-content="&lt;strong&gt;Roles&lt;/strong&gt;&lt;br/&gt;Support Staff - CSSHS&lt;br/&gt;&lt;br/&gt;&lt;strong&gt;Capabilities&lt;/strong&gt;&lt;br/&gt;CSSHS - Assign Approvers&lt;br/&gt;CSSHS - Manage Approvals&lt;br/&gt;CSSHS - Manage Projects&lt;br/&gt;CSSHS - Submit Projects&lt;br/&gt;CSSHS - Delete Projects&lt;br/&gt;RIS and Finance Edit&lt;br/&gt;CSSHS - View Approvals&lt;br/&gt;">
    <i class="fas fa-user"></i>
</a>
                    
                </div>
            </div>
        </nav>

        <main class="py-2">
            
    <div class="container">

        <div class="row pt-2">
  <div class="col-md-12">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
                  <li class="breadcrumb-item" aria-current="page">Projects</li>
    <li class="breadcrumb-item active" aria-current="page">Delivery of a Post-registration Foundation Training programme for new pharmacist registrants</li>
          </ol>
      </nav>
  </div>
</div>

                
        <div class="row">
            <div class="col-md-12">
                            </div>
        </div>

            <form method="POST" id="form" action="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/update">
    <input type="hidden" name="_method" value="PUT">    <input type="hidden" name="_token" value="DaAjwqT5yHrUOPelTo5fFeD1ma8eUpbkDOlMYIB0">    <input type="hidden" id="projectId" name="projectId" value="322">
    <input type="hidden" id="btnSubmit" name="btnSubmit" value="">

        <div class="row">
            <div class="col-md-12">
                <div class="row mb-2">
    <div class="col-md-12">
        
            
        <a autofocus href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects" class="btn btn-cmet btn-sm"><i class="fas fa-arrow-left"></i> Back</a>
                                                         
                        <button  name="btnSubmit" value="Edit" class="btn btn-success btn-sm" onclick="$('#btnSubmit').val('Edit');$('#form').submit();$(this).attr('disabled',true)"><i class="fas fa-edit"></i>  Edit</button>
                                        
                                                    <button type="submit" name="btnSubmit" value="MakeLive" class="btn btn-success btn-sm"><i class="fas fa-play"></i>  Make Live</button>
                                            <button type="submit" name="btnSubmit" value="SaveOnCosts" class="btn btn-success btn-sm"><i class="fas fa-save"></i>  Save On Costs</button>
     <!-- For tab-specific options -->
                    
                                                        <button name="btnSubmit" value="Delete" class="btn btn-danger btn-sm" onclick="$('#btnSubmit').val('Delete');$('#form').submit();$(this).attr('disabled',true)"><i class="fas fa-trash-alt"></i> Not proceeding</button>
                                
             
        

        <a href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/generatePDF" target="_blank" role="button" class="btn btn-cmet btn-sm"><i class="fas fa-print"></i> Print</a>

            
        
    </div>
</div>
            </div>
        </div>

        
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <label for="status" class="col-2 col-form-label" >Status</label>
                <input type="text" class="form-control-plaintext col-10" readonly value="Approved" />
            </div>
                    
                    </div>
    </div>

    
    
    <!-- Tabs -->
    <div class="row mb-4">
        <div class="col-md-12">
            <ul class="nav nav-tabs">
                
                
    
        
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/details">Details</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/personnel">Personnel</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/otherDirectCosts">Other Direct Costs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/riskAssessment">Risk Assessment</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/price">Price</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/attachments">Attachments</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/developmentScheme">R&I Dev Scheme</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/summary">Summary</a>
            </li>
                            <li class="nav-item">
                    <a class="nav-link" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/risAndFinance">RIS & Finance Only</a>
                </li>
            
        
    
          </ul>
        </div>
    </div>

 
    <input type="hidden" name="tab" value="personnel">
<input type="hidden" name="newTab" id="newTab" value="personnel">

<p class="mt-3 mb-3"><a href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/docs/Innovation Hourly Rates 2021-22.xlsx">Innovation Hourly Rates 2021-22</a></p>
<div class="form-group row">
        <label class="col-md-2 col-form-label">Staff time within contract (notional cost)</label>
    <div class="col-md-10">
        <table class="table table-hover table-sm" id="staffTimeTable">
            <tr>
                <th style="width:26%">Staff member</th>
                <th style="width:13%"><span class="ml-2">Unit</span></th>
                <th style="width:13%"><span class="ml-2">Quantity</span></th>
                <th style="width:13%"><span class="ml-2">Rate (£)</span></th>
                <th style="width:13%;">On Costs Rate</th>
                <th style="width:16%;text-align:right"><span class="">Total Cost (£)</span></th>
                <th style="width:6%"></th>
            </tr>
                
                                                                            
                            <tr>
                                <td id="name" style="vertical-align:middle">Huw Jones</td>
                                <td>
                                    <select class="form-control autosave" name="sm18054_st_unit" id="sm18054_st_unit" readonly>
                                        <option value="1" name="Hours" >Hours</option>
                                        <option value="2" name="Days" selected>Days</option>
                                        <option value="3" name="FTE" >FTE</option>
                                    </select>
                                </td>
                                <td><input type="number" step="any" id="sm18054_st_quantity" name="sm18054_st_quantity" value="4" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" step="any" id="sm18054_st_rate" name="sm18054_st_rate" value="246.46" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" id="sm18054_st_ocrate" name="sm18054_st_ocrate" value="35" class="form-control calc autosave"  oninput="calculate(this, 'st');" ></td>

                                <td><input id="sm18054_st_totalCost" name="sm18054_st_totalCost" value="1330.88" class="form-control-plaintext mr-3 num st_totalCost" style="text-align:right" readonly readonly></td>
                                <td style="vertical-align:middle">
                                    
                                                                            <span class="" title="Remove"><i style="" class="far fa-trash-alt float-right"></i></span> 
                                    
                                    <input type="hidden" id="sm18054_st_staffUserId" name="sm18054_st_staffUserId" value="sm18054">
                                    <input type="hidden" id="sm18054_st_staffCostId" name="sm18054_st_staffCostId" value="912">
                                </td>
                            </tr>
                                                                                                    
                            <tr>
                                <td id="name" style="vertical-align:middle">Fernando Pabst Silva</td>
                                <td>
                                    <select class="form-control autosave" name="SM23122_st_unit" id="SM23122_st_unit" readonly>
                                        <option value="1" name="Hours" >Hours</option>
                                        <option value="2" name="Days" selected>Days</option>
                                        <option value="3" name="FTE" >FTE</option>
                                    </select>
                                </td>
                                <td><input type="number" step="any" id="SM23122_st_quantity" name="SM23122_st_quantity" value="4" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" step="any" id="SM23122_st_rate" name="SM23122_st_rate" value="246.46" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" id="SM23122_st_ocrate" name="SM23122_st_ocrate" value="35" class="form-control calc autosave"  oninput="calculate(this, 'st');" ></td>

                                <td><input id="SM23122_st_totalCost" name="SM23122_st_totalCost" value="1330.88" class="form-control-plaintext mr-3 num st_totalCost" style="text-align:right" readonly readonly></td>
                                <td style="vertical-align:middle">
                                    
                                                                            <span class="" title="Remove"><i style="" class="far fa-trash-alt float-right"></i></span> 
                                    
                                    <input type="hidden" id="SM23122_st_staffUserId" name="SM23122_st_staffUserId" value="SM23122">
                                    <input type="hidden" id="SM23122_st_staffCostId" name="SM23122_st_staffCostId" value="913">
                                </td>
                            </tr>
                                                                                                    
                            <tr>
                                <td id="name" style="vertical-align:middle">Laura Watkeys</td>
                                <td>
                                    <select class="form-control autosave" name="sm16962_st_unit" id="sm16962_st_unit" readonly>
                                        <option value="1" name="Hours" >Hours</option>
                                        <option value="2" name="Days" selected>Days</option>
                                        <option value="3" name="FTE" >FTE</option>
                                    </select>
                                </td>
                                <td><input type="number" step="any" id="sm16962_st_quantity" name="sm16962_st_quantity" value="8" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" step="any" id="sm16962_st_rate" name="sm16962_st_rate" value="206.83" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" id="sm16962_st_ocrate" name="sm16962_st_ocrate" value="35" class="form-control calc autosave"  oninput="calculate(this, 'st');" ></td>

                                <td><input id="sm16962_st_totalCost" name="sm16962_st_totalCost" value="2233.76" class="form-control-plaintext mr-3 num st_totalCost" style="text-align:right" readonly readonly></td>
                                <td style="vertical-align:middle">
                                    
                                                                            <span class="" title="Remove"><i style="" class="far fa-trash-alt float-right"></i></span> 
                                    
                                    <input type="hidden" id="sm16962_st_staffUserId" name="sm16962_st_staffUserId" value="sm16962">
                                    <input type="hidden" id="sm16962_st_staffCostId" name="sm16962_st_staffCostId" value="914">
                                </td>
                            </tr>
                                                                                                    
                            <tr>
                                <td id="name" style="vertical-align:middle">Delyth James</td>
                                <td>
                                    <select class="form-control autosave" name="sm21404_st_unit" id="sm21404_st_unit" readonly>
                                        <option value="1" name="Hours" >Hours</option>
                                        <option value="2" name="Days" selected>Days</option>
                                        <option value="3" name="FTE" >FTE</option>
                                    </select>
                                </td>
                                <td><input type="number" step="any" id="sm21404_st_quantity" name="sm21404_st_quantity" value="6" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" step="any" id="sm21404_st_rate" name="sm21404_st_rate" value="303.18" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" id="sm21404_st_ocrate" name="sm21404_st_ocrate" value="35" class="form-control calc autosave"  oninput="calculate(this, 'st');" ></td>

                                <td><input id="sm21404_st_totalCost" name="sm21404_st_totalCost" value="2455.76" class="form-control-plaintext mr-3 num st_totalCost" style="text-align:right" readonly readonly></td>
                                <td style="vertical-align:middle">
                                    
                                                                            <span class="" title="Remove"><i style="" class="far fa-trash-alt float-right"></i></span> 
                                    
                                    <input type="hidden" id="sm21404_st_staffUserId" name="sm21404_st_staffUserId" value="sm21404">
                                    <input type="hidden" id="sm21404_st_staffCostId" name="sm21404_st_staffCostId" value="915">
                                </td>
                            </tr>
                                                                                                    
                            <tr>
                                <td id="name" style="vertical-align:middle">Jacquie Michell</td>
                                <td>
                                    <select class="form-control autosave" name="ad1298_st_unit" id="ad1298_st_unit" readonly>
                                        <option value="1" name="Hours" >Hours</option>
                                        <option value="2" name="Days" selected>Days</option>
                                        <option value="3" name="FTE" >FTE</option>
                                    </select>
                                </td>
                                <td><input type="number" step="any" id="ad1298_st_quantity" name="ad1298_st_quantity" value="4" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" step="any" id="ad1298_st_rate" name="ad1298_st_rate" value="246.46" class="form-control calc autosave"  oninput="calculate(this, 'st');" readonly></td>
                                <td><input type="number" id="ad1298_st_ocrate" name="ad1298_st_ocrate" value="35" class="form-control calc autosave"  oninput="calculate(this, 'st');" ></td>

                                <td><input id="ad1298_st_totalCost" name="ad1298_st_totalCost" value="1330.88" class="form-control-plaintext mr-3 num st_totalCost" style="text-align:right" readonly readonly></td>
                                <td style="vertical-align:middle">
                                    
                                                                            <span class="" title="Remove"><i style="" class="far fa-trash-alt float-right"></i></span> 
                                    
                                    <input type="hidden" id="ad1298_st_staffUserId" name="ad1298_st_staffUserId" value="ad1298">
                                    <input type="hidden" id="ad1298_st_staffCostId" name="ad1298_st_staffCostId" value="916">
                                </td>
                            </tr>
                                                
            <!-- clonable table row -->
            <tr class="hide" style="display:none;">
                <td id="st_name" style="vertical-align:middle"></td>
                <td>
                    <select class="form-control autosave" name="st_unit" id="st_unit">
                        <option value="1" name="Hours">Hours</option>
                        <option value="2" name="Days">Days</option>
                        <option value="3" name="FTE">FTE</option>
                    </select>
                </td>
                <td><input type="number" step="any" id="st_quantity" name="st_quantity" value="0" class="form-control calc autosave"  oninput="calculate(this, 'st');"></td>
                <td><input type="number" step="any" id="st_rate" name="st_rate" value="0" class="form-control cal autosave"  oninput="calculate(this, 'st');"></td>
                <td><input type="number" id="st_ocrate" name="st_ocrate" value="35" class="form-control cal autosave"  oninput="calculate(this, 'st');" ></td>
                <td><input id="st_totalCost" name="st_totalCost" value="0" class="form-control-plaintext mr-3 st_totalCost" style="text-align:right"   readonly></td>
                <td style="vertical-align:middle">
                    <span class="table-remove-staffCost st" title="Remove"><i style="color:red; cursor:pointer;" class="far fa-trash-alt float-right"></i></span>
                    <input type="hidden" id="st_staffUserId" name="st_staffUserId" value="">
                    <input type="hidden" id="st_staffCostId" name="st_staffCostId" value="">
                </td>
            </tr>
            <tr>
                <td><strong>Sub Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="text" id="st_sumTotalCost" name="st_sumTotalCost" value="0" class="form-control-plaintext mr-3" style="text-align:right" readonly></td>
                <td></td>
            </tr>
        </table>

                
    </div>

    <input type="hidden" name="staffUserIds_st_existing" id="staffUserIds_st_existing" value="sm18054,SM23122,sm16962,sm21404,ad1298">
    <input type="hidden" name="staffUserIds_st_new" id="staffUserIds_st_new" >
    <input type="hidden" name="staffCostIds_st_removed" id="staffCostIds_st_removed" >
</div>

<br>
<br>
<div class="form-group row">
        <label class="col-md-2 col-form-label">Additional Payments (exceptional circumstances only)</label>
    <div class="col-md-10">
        <table class="table table-hover table-sm" id="additionalPaymentsTable">
            <tr>
                <th style="width:26%">Staff member</th>
                <th style="width:13%"><span class="ml-2">Unit</span></th>
                <th style="width:13%"><span class="ml-2">Quantity</span></th>
                <th style="width:13%"><span class="ml-2">Rate (£)</span></th>
                <th style="width:13%;">On Costs Rate</th>
                <th style="width:16%;text-align:right"><span class="">Total Cost (£)</span></th>
                <th style="width:6%"></th>
            </tr>
            
                                                                                                                                                                                                                                                    
            <!-- clonable table row -->
            <tr class="hide" style="display:none;">
                <td id="ap_name" style="vertical-align:middle"></td>
                <td>
                    <select class="form-control autosave" name="ap_unit" id="ap_unit">
                        <option value="1" name="Hours">Hours</option>
                        <option value="2" name="Days">Days</option>
                        <option value="3" name="FTE">FTE</option>
                    </select>
                </td>
                <td><input type="number" step="any" id="ap_quantity" name="ap_quantity" value="0" class="form-control calc autosave"  oninput="calculate(this, 'ap');"></td>
                <td><input type="number" step="any" id="ap_rate" name="ap_rate" value="0" class="form-control calc autosave"  oninput="calculate(this, 'ap');"></td>
                <td><input type="number" id="ap_ocrate" name="ap_ocrate" value="35" class="form-control cal autosave"  oninput="calculate(this, 'ap');" ></td>
                <td><input id="ap_totalCost" name="ap_totalCost" value="0" class="form-control-plaintext mr-3 ap_totalCost" style="text-align:right"  readonly></td>
                <td>
                    <span class="table-remove-staffCost ap" title="Remove"><i style="color:red; cursor:pointer;" class="far fa-trash-alt float-right"></i></span>
                    <input type="hidden" id="ap_staffUserId" name="ap_staffUserId" value="">
                    <input type="hidden" id="ap_staffCostId" name="ap_staffCostId" value="">
                </td>
            </tr>
            <tr>
                <td><strong>Sub Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input id="ap_sumTotalCost" name="ap_sumTotalCost" value="0" class="form-control-plaintext mr-3" style="text-align:right"  readonly></td>
                <td></td>
            </tr>
        </table>

         

    </div>
    <input type="hidden" name="staffUserIds_ap_existing" id="staffUserIds_ap_existing" value="">
    <input type="hidden" name="staffUserIds_ap_new" id="staffUserIds_ap_new" >
    <input type="hidden" name="staffCostIds_ap_removed" id="staffCostIds_ap_removed" >
</div>

<br>
<br>
<div class="form-group row">
        <label class="col-md-2 col-form-label">
        HPL Cover        <span
            class="ml-2" 
            data-toggle="popover" 
            data-placement="right"
            data-html="true"
            onclick="event.preventDefault();"
            data-content="<a href='https://tsr.uwic.ac.uk/Units/HR/HR/Pages/Recruitment.aspx' target='_blank'>HR Compliance Required</a>">
            <i class="fas fa-info-circle"></i>
        </span>
    </label>
    <div class="col-md-10">
        <table class="table table-hover table-sm" id="hplCoverTable">
            <tr>
                <th style="width:26%">Staff member</th>
                <th style="width:13%"><span class="ml-2">Unit</span></th>
                <th style="width:13%"><span class="ml-2">Quantity</span></th>
                <th style="width:13%"><span class="ml-2">Rate (£)</span></th>
                <th style="width:13%;">On Costs Rate</th>
                <th style="width:16%;text-align:right"><span class="">Total Cost (£)</span></th>
                <th style="width:6%"></th>
            </tr>
            
                                                                                                                                                                                                                                                    
            <!-- clonable table row -->
            <tr class="hide" style="display:none;">
                <td id="hpl_name" style="vertical-align:middle" ></td>
                <td>
                    <select class="form-control autosave" name="hpl_unit" id="hpl_unit">
                        <option value="1" name="Hours">Hours</option>
                        <option value="2" name="Days">Days</option>
                        <option value="3" name="FTE">FTE</option>
                    </select>
                </td>
                <td><input type="number" step="any" id="hpl_quantity" name="hpl_quantity" value="0" class="form-control calc autosave"  oninput="calculate(this, 'hpl');"></td>
                <td><input type="number" step="any" id="hpl_rate" name="hpl_rate" value="0" class="form-control calc autosave"  oninput="calculate(this, 'hpl');"></td>
                <td><input type="number" id="hpl_ocrate" name="hpl_ocrate" value="35" class="form-control cal autosave"  oninput="calculate(this, 'hpl');" ></td>
                <td><input id="hpl_totalCost" name="hpl_totalCost" value="0" class="form-control-plaintext mr-3 hpl_totalCost" style="text-align:right" readonly></td>
                <td style="vertical-align:middle">
                    <span class="table-remove-staffCost hpl" title="Remove"><i style="color:red; cursor:pointer;" class="far fa-trash-alt float-right"></i></span>
                    <input type="hidden" id="hpl_staffUserId" name="hpl_staffUserId" value="">
                    <input type="hidden" id="hpl_staffCostId" name="hpl_staffCostId" value="">
                </td>
            </tr>
            <tr>
                <td><strong>Sub Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input  id="hpl_sumTotalCost" name="hpl_sumTotalCost" value="0" class="form-control-plaintext mr-3" style="text-align:right"  readonly></td>
                <td></td>
            </tr>
        </table>

         

    </div>
    <input type="hidden" name="staffUserIds_hpl_existing" id="staffUserIds_hpl_existing" value="">
    <input type="hidden" name="staffUserIds_hpl_new" id="staffUserIds_hpl_new" >
    <input type="hidden" name="staffCostIds_hpl_removed" id="staffCostIds_hpl_removed" >
    
</div>

<br>
<br>
<!-- NEW STAFF POST REQUIRED - 4 - np -->

<div class="form-group row">
        <label class="col-md-2 col-form-label">New staff post required</label>
    <div class="col-md-10">
        <table class="table table-hover table-sm" id="newPostTable">
            <tr>
                <th style="width:26%">Details</th>
                <th style="width:13%"><span class="ml-2">Unit</span></th>
                <th style="width:13%"><span class="ml-2">Quantity</span></th>
                <th style="width:13%"><span class="ml-2">Rate (£)</span></th>
                <th style="width:13%;">On Costs Rate</th>
                <th style="width:16%;text-align:right"><span class="">Total Cost (£)</span></th>
                <th style="width:6%"></th>
            </tr>
            
                        
                                            
                                            
                                            
                                            
                                                        
           <!-- clonable row -->
            <tr class="hide" style="display:none;">
                <td><input id="details" name="details" class="form-control-plaintext"></td>
                <td>
                    <select class="form-control autosave" name="unit" id="unit">
                        <option value="1" name="Hours">Hours</option>
                        <option value="2" name="Days">Days</option>
                        <option value="3" name="FTE">FTE</option>
                    </select>
                </td>
                <td><input type="number" step="any" id="quantity" name="quantity" value="0" class="form-control calc autosave"  oninput="calculate(this, 'np');"></td>
                <td><input type="number" step="any" id="rate" name="rate" value="0" class="form-control calc autosave"  oninput="calculate(this, 'np');"></td>
                <td><input type="number" id="ocrate" name="ocrate" value="35" class="form-control calc autosave"  oninput="calculate(this, 'np');" ></td>
                <td><input step="any" id="totalCost" name="totalCost" value="0" class="form-control-plaintext mr-3 np_totalCost" style="text-align:right"  readonly></td>
                <td style="vertical-align:middle">
                    <span class="table-remove-newPost np" title="Remove">
                    <i style="color:red; cursor:pointer;" class="far fa-trash-alt float-right"></i></span>
                    
                    <input type="hidden" id="staffCostId" name="staffCostId" value="NEW">
                </td>
            </tr>
            <tr>
                <td><strong>Sub Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input  id="np_sumTotalCost" name="np_sumTotalCost" value="0" class="form-control-plaintext mr-3" style="text-align:right"   readonly></td>
                <td></td>
            </tr>
        </table>

         
    </div>
    <input type="hidden" name="newPostCount" id="newPostCount" value="0">
    <input type="hidden" name="newPostRemoved" id="newPostRemoved" value="">
</div>

<!-- ADDITIONAL INFO -->
<div class="form-group row">
    <label class="col-md-2 col-form-label">Additional Info</label>
    <textarea class="col-md-9 form-control" style="margin-left:16px;" id="personnelAddInfo" name="personnelAddInfo" disabled>Fernando, Huw and Jacquie are listed in lieu of undecided Senior Lecturer posts. Laura is noted as the tech dem, but it might be someone else.</textarea>
</div>

<div class="row mt-4 mb-4">
    <div class="col-md-12 ">
        <div class="form-inline float-right">
            
                                    <a class="btn btnSub btn-cmet mr-2" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/details"><i class="fas fa-arrow-left"></i> Previous</a>
                    <a class="btn btnSub btn-success" href="https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/322/edit/otherDirectCosts">Next <i class="fas fa-arrow-right"></i></a>
                                    </div>
    </div>
</div>



        </form>

                
    </div>

        </main>
    </div>
    <footer class="footer container-fluid footer-outer">
        <div class="container footer-inner">
                        <img class="img-fluid float-right" src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/vendor/cmet/img/LIS-logo.png" style="max-height:100%;" alt="L&IS Logo">
        </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cis2.cardiffmet.ac.uk/CostingAndPricing/js/app.js"></script>
    <script>
$( document ).ready(function() {
    $('[data-toggle="popover"]').popover();
});
</script>
<script>
$(document).ready(function(){
    
    var timer;
    var timeout = 1000 * 60 * 5; // Timout duration, 1000 = 1 second
    
    $('#form .autosave').keyup(function()
    {
        
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
 
    });

    // Select boxes and dates
    $('#form .autosave').change(function()
    {
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
 
    });

});
function saveData(){
    
    // Submit form (after 5 minutes of inactivity).
    $('#form').submit();    
    return;

};

function removeValueFromHiddenInput(inputId, val)
    {
        array = $('#'+inputId)[0].value.split(',');
        var index = array.indexOf(val);
        if (index !== -1) array.splice(index, 1);
        $('#'+inputId).val(array.toString());
    }

    function addValueToHiddenInput(inputId, val)
    {
        var inputValueString = $('#'+inputId)[0].value;
        array = [];
        if (inputValueString != "") {
            array = inputValueString.split(",");
        }
        array.push(val);
        $('#'+inputId).val(array.toString());

    }
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
<script>
    $(".select2").select2({
        theme: 'bootstrap4',
        minimumInputLength: 3,
        dropdownAutoWidth : true,
        ajax: {
            url: "https://cis2.cardiffmet.ac.uk/CostingAndPricing/staffSearch",
            dataType: 'json',
            type: "GET",
            delay: 500,
            data: function (params) {
                var queryParameters = {
                    searchString: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.forename + ' ' + item.surname + ' (' + item.user_id + ', ' + item.email + ')',
                            id: item.user_id
                        }
                    })
                };
            }
        }
    }).on('change', function() {
        
        var selection = $(this).find(':selected');
        $('#staffTimeMsg').text("");
        $('#additionalPaymentsMsg').text("");
        $('#hplCoverMsg').text("");

        if(selection.length > 0)
        {

            var costTypeIdentifier = "";
            var TABLE = "";
            var staffUserIdsIdentifierExisting = "";
            var staffUserIdsIdentifierNew = "";
            var msgId = "";

            if (this.id == "staffTime")
            {
                costTypeIdentifier = "st";
                $TABLE = $('#staffTimeTable');
                $msgId = "staffTimeMsg";
            }

            if (this.id == "additionalPayments")
            {
                costTypeIdentifier = "ap";
                $TABLE = $('#additionalPaymentsTable');
                $msgId = "additionalPaymentsMsg";
            }

            if (this.id == "hplCover")
            {
                costTypeIdentifier = "hpl";
                $TABLE = $('#hplCoverTable');
                $msgId = "hplCoverMsg";
            }

            staffUserIdsIdentifierExisting = 'staffUserIds_'+costTypeIdentifier+'_existing';
            staffUserIdsIdentifierNew = 'staffUserIds_'+costTypeIdentifier+'_new';

            
            // Get the selected name and staffUserId
            var staffUserId = selection[0].value;
            var staffName = selection[0].text.substr(0, selection[0].text.indexOf(' (')); // We just want to display the name, not the staff id and email address as well.
            var prefix = staffUserId + "_" + costTypeIdentifier + "_";

            // Check if staff member is already in new or existing list. If so, exit.
            // To do - show message to user.

            var array = $('#'+staffUserIdsIdentifierExisting)[0].value.split(',');
            if (array.indexOf(staffUserId)> -1) {
                $(".select2").val([]).trigger('change');
                $('#'+ $msgId).text("Staff member already selected.");
                return;
            }
            var array = $('#'+staffUserIdsIdentifierNew)[0].value.split(',');
            if (array.indexOf(staffUserId)> -1) {
                 $(".select2").val([]).trigger('change');
                 $('#'+ $msgId).text("Staff member already selected.");
                 return;
             }

            // Get the clonable table row
            var $clonedRow = $TABLE.find('tr.hide').clone(true).removeClass('hide').removeAttr('style');

            // Set the id and the name.
            $clonedRow.find("#" + costTypeIdentifier + "_name").html(staffName);
            $clonedRow.find("#" + costTypeIdentifier +"_staffUserId").val(staffUserId);

            // Update the 'name' and 'id' fields of the inputs so we can post them.
            $clonedRow.find("#" + costTypeIdentifier + "_unit").removeAttr("name").removeAttr("id").attr("name", prefix + "unit").attr("id", prefix + "unit");
            $clonedRow.find("#" + costTypeIdentifier + "_quantity").removeAttr("name").removeAttr("id").attr("name", prefix + "quantity").attr("id", prefix + "quantity");
            $clonedRow.find("#" + costTypeIdentifier + "_rate").removeAttr("name").removeAttr("id").attr("name", prefix + "rate").attr("id", prefix + "rate");
            $clonedRow.find("#" + costTypeIdentifier + "_totalOnCosts").removeAttr("name").removeAttr("id").attr("name", prefix + "totalOnCosts").attr("id", prefix + "totalOnCosts");
            $clonedRow.find("#" + costTypeIdentifier + "_totalCost").removeAttr("name").removeAttr("id").attr("name", prefix + "totalCost").attr("id", prefix + "totalCost");
            $clonedRow.find("#" + costTypeIdentifier + "_staffUserId").removeAttr("name").removeAttr("id").attr("name", prefix + "staffUserId").attr("id", prefix + "staffUserId");
            $clonedRow.find("#" + costTypeIdentifier + "_staffCostId").removeAttr("name").removeAttr("id").attr("name", prefix + "staffCostId").attr("id", prefix + "staffCostId");
            $clonedRow.find("#" + costTypeIdentifier + "_ocrate").removeAttr("name").removeAttr("id").attr("name", prefix + "ocrate").attr("id", prefix + "ocrate");

            
            $TABLE.find('tr:last').before($clonedRow);


            // Add to list of new ones.
            addValueToHiddenInput(staffUserIdsIdentifierNew, staffUserId);


            // This may have been removed then re-added. So (attempt to) remove from Removed list, just in case.
            // NO need - only costIds in the removed list
            // var hiddenInputRemovedId = 'staffCostIds_'+costTypeIdentifier+'_removed';
            // removeValueFromHiddenInput(hiddenInputRemovedId, staffUserId);

            // Clear out select 2.
            $(".select2").val([]).trigger('change');


            // Autosave.
            autoSave();

            // Focus on the new row. It would be better to focus on the 'unit' select input but it doesn't work.
            var id = prefix + 'quantity';
            setTimeout(function() { $('input[name="' + id +'"]').focus().select(); }, 150);

        }



        $(this).empty();
    });
</script>

<script>
    
    $('.table-remove-staffCost').click(function () {

        var staffUserId = $(this).next()[0].value;
        var costTypeIdentifier = "";

        // The remove button will have the costTypeIdentifier specified as a class. Get it, so we know which table we're working with.
        
        if (this.classList.contains('st'))
        {
            costTypeIdentifier = "st";
        }
        if (this.classList.contains('ap'))
        {
            costTypeIdentifier = "ap";
        }
        if (this.classList.contains('hpl'))
        {
            costTypeIdentifier = "hpl";
        }

        // This could be new or existing, so (attempt to) remove from both.
        var hiddenInputNewId = 'staffUserIds_'+costTypeIdentifier+'_new';
        var hiddenInputExistingId = 'staffUserIds_'+costTypeIdentifier+'_existing';
        removeValueFromHiddenInput(hiddenInputNewId, staffUserId);
        removeValueFromHiddenInput(hiddenInputExistingId, staffUserId);

        // Add the costid (not the staff id) to the 'removed' array.
        var staffCostId = $('#'+staffUserId+'_'+costTypeIdentifier+'_staffCostId')[0].value;
        var hiddenInputRemovedId = 'staffCostIds_'+costTypeIdentifier+'_removed';
        addValueToHiddenInput(hiddenInputRemovedId, staffCostId);

        // Now remove the row from the table.
        $(this).parents('tr').detach();

        calculateTotals();


    });

    $('.table-remove-newPost').click(function () {

        // To do - make this more generic.

        var costTypeIdentifier = "";
        var staffCostId = $(this).next()[0].value;

        // The remove button will have the costTypeIdentifier specified as a class. Get it, so we know which table we're working with.
        if (this.classList.contains('np'))
        {
            // decrement count
            var countIdentifier = 'newPostCount';
            var count = $('#'+countIdentifier)[0].value;
            count = count - 1;
            $('#'+countIdentifier).val(count);

            // add to removed list
            if  ($('#newPostRemoved')[0].value == "")
            {
                array = new Array(staffCostId);
            }
            else
            {
                array = $('#newPostRemoved')[0].value.split(',');
                array.push(staffCostId);
            }
            $('#newPostRemoved').val(array.toString());


            // Remove the row
            $(this).parents('tr').detach();

            calculateTotals();

            // Autosave.
            //autoSave();

        }

    });

    function autoSave()
    {
        
        var timer;
        var timeout = 1000 * 60 * 5; // Timout duration, 1000 = 1 second
        if(timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(saveData, timeout); 
    }

</script>

<script>

    function calculate(elm, costTypeIdentifier) {

        // Get staff no & data
        var staffUserId = elm.name.split("_")[0];
        var prefix = staffUserId + '_' + costTypeIdentifier + '_';
        var rate = parseFloat($('#' + prefix + 'rate')[0].value);
        var quantity = parseFloat($('#' + prefix + 'quantity')[0].value);
        var oc_rate = $('#' + prefix + 'ocrate')[0].value / 100;
        
        // Calculate row values
        var totalOnCosts = parseFloat(rate * quantity * oc_rate).toFixed(2);
        var totalCost = parseFloat((rate * quantity) + parseFloat(totalOnCosts)).toFixed(2);

        // Set row values
        //$('#' + prefix + 'totalOnCosts').val(addCommas(Number(totalOnCosts).toFixed(2)));
        $('#' + prefix + 'totalCost').val(addCommas(Number(totalCost).toFixed(2)));


        var sumTotalCost = 0;
        $('.' + costTypeIdentifier + '_totalCost').each(function() {
            sumTotalCost += Number($(this).val().replace(",",""));
        });
        $('#' + costTypeIdentifier + '_sumTotalCost').val(addCommas(sumTotalCost.toFixed(2)));
    
    };

    function insertNewPost() {
        var details = $("#newPost").val();
       
        costTypeIdentifier = "np";
        $TABLE = $('#newPostTable');

        var countIdentifier = 'newPostCount';
        var count = parseInt($('#'+countIdentifier)[0].value) + 1;
        $('#'+countIdentifier).val(count);
        var prefix = count + "_" + costTypeIdentifier + "_";

        // Get the clonable table row
        var $clonedRow = $TABLE.find('tr.hide').clone(true).removeClass('hide').removeAttr('style');

        $clonedRow.find("#details").val(details);

        // Update the 'name' and 'id' fields of the inputs so we can post them.
        $clonedRow.find("#details").removeAttr("name").removeAttr("id").attr("name", prefix + "details").attr("id", prefix + "details");
        $clonedRow.find("#unit").removeAttr("name").removeAttr("id").attr("name", prefix + "unit").attr("id", prefix + "unit");
        $clonedRow.find("#quantity").removeAttr("name").removeAttr("id").attr("name", prefix + "quantity").attr("id", prefix + "quantity");
        $clonedRow.find("#rate").removeAttr("name").removeAttr("id").attr("name", prefix + "rate").attr("id", prefix + "rate");
        $clonedRow.find("#ocrate").removeAttr("name").removeAttr("id").attr("name", prefix + "ocrate").attr("id", prefix + "ocrate");
        $clonedRow.find("#totalCost").removeAttr("name").removeAttr("id").attr("name", prefix + "totalCost").attr("id", prefix + "totalCost");
        $clonedRow.find("#staffCostId").removeAttr("name").removeAttr("id").attr("name", prefix + "staffCostId").attr("id", prefix + "staffCostId");

        $TABLE.find('tr:last').before($clonedRow);

        $('#' + prefix + 'unit').focus().select();
    };

    // Calculate the sub totals on page load.
    $(function() {
        calculateTotals();
        format();

    });

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function calculateTotals()
    {
        var costTypeIdentifiers = ["st", "ap", "hpl", "np"];
        for (i=0; i<costTypeIdentifiers.length; i++){
            var sumTotalCost = 0;
            var costTypeIdentifier = costTypeIdentifiers[i];
            $('.' + costTypeIdentifier + '_totalCost').each(function() {
                sumTotalCost += Number($(this).val());
            });
            $('#' + costTypeIdentifier + '_sumTotalCost').val(addCommas(sumTotalCost.toFixed(2)));
        }
    }

    // All controls with the 'num' class 
    function format()
    {
        $('.num').each(function(){
            var value = Number($(this).val());
            $(this).val(addCommas(value.toFixed(2)));
        });
    }

</script>



</body>
</html>`;

// start of actual code

const browserP = puppeteer.launch({ headless: false });

let page;
const TestWithHtml = async () => {
  page = await (await browserP).newPage();
  await page.setContent(htmlString);
  const attr = await page.$$eval("select.form-control", (el) =>
    el.map((x) => x.getAttribute("id"))
  );

  let idArray = [];

  for (let i = 0; i < attr.length; i++) {
    if (attr[i].includes("_st_unit")) {
      idArray.push(attr[i].replace("_st_unit", ""));
    }
  }

  console.log(attr);
  console.log(idArray);
};

/* TestWithHtml()
.catch((err) => {
    console.log(err);
  })
  .finally(async () => await page.close()); */

const TestWithRegex = async () => {
  page = await (await browserP).newPage();
  await page.setContent(htmlString); // for testing purposes only

  const pageContent = await page.content();
  const tdNode = pageContent.match(/<td>(.*)<\/td>/gi);
  let mapped = tdNode.map((el) =>
    el.includes("_st_quantity") ? el.substr(el.indexOf(`id="`) + 4, 7) : null
  );
  console.log(mapped);
};

/* TestWithRegex()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => await page.close()); */

const Test = async () => {
  page = await (await browserP).newPage();
  await page.setContent(htmlStringPersonnel); // for testing purposes only

  let responseObject = {
    varClient: null,
    varContribution: null,
    varDuration: null,
    varIncome: null,
    varRIDS: null,
    varStart: null,
    varTitle: null,
    varStatus: null,
    varType: null,
    varContent: null,
    varContentHPL: null,
    varID: null,
    summary: null,
  };

  const pageContent = await page.content();

  const positionStart = pageContent.indexOf(`id="staffTimeTable"`);
  const positionEnd = pageContent.indexOf(`table-remove-staffCost`);
  const extracted = pageContent.substring(positionStart, positionEnd);
  const blitzed = extracted.replace(/["]/gi, "blitz");

  responseObject.varContent = blitzed;

  const positionStartHPL = pageContent.indexOf(`id="hplCoverTable"`);
  const positionEndHPL = pageContent.indexOf(`"table-remove-staffCost hpl"`);
  const extractedHPL = pageContent.substring(positionStartHPL, positionEndHPL);
  const blitzedHPL = extractedHPL.replace(/["]/gi, "blitz");

  responseObject.varContentHPL = blitzedHPL;

  await page.setContent(htmlStringEditDetails); // for testing purposes only

  responseObject.varStatus = await page.evaluate(
    () =>
      document.querySelector("#form > div:nth-child(6) > div > div > input")
        .value
  );

  responseObject.summary = await page.evaluate(
    () => document.querySelector("#summary").innerHTML
  );
  responseObject.varTitle = await page.evaluate(
    () => document.querySelector("#name").value
  );
  responseObject.varClient = await page.evaluate(
    () => document.querySelector("#client").value
  );
  responseObject.varStart = await page.evaluate(
    () => document.querySelector("#startDate").value
  );
  responseObject.varDuration = await page.evaluate(
    () => document.querySelector("#estimatedDurationInMonths").value
  );
  responseObject.varType = await page.evaluate(
    () => document.querySelector("#projectType").selectedOptions[0].label
  );

  await page.setContent(htmlStringSummary); // for testing purposes only

  responseObject.varIncome = await page.evaluate(
    () =>
      document.querySelector(
        "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(8) > input"
      ).value
  );
  responseObject.varContribution = await page.evaluate(
    () =>
      document.querySelector(
        "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(16) > input"
      ).value
  );
  responseObject.varRIDS = await page.evaluate(
    () =>
      document.querySelector(
        "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(18) > input"
      ).value
  );
  console.log(responseObject);
};

/* Test()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => await page.close()); */

const Test2 = async (param) => {
  page = await (await browserP).newPage();
  await page.goto(
    "https://research.cardiffmet.ac.uk/do/cardiffmet-auth/login?rdr=%2Fdo%2Factivity%2Fgraduate-school",
    {
      waitUntil: "networkidle0",
    }
  );

  await page.type("#username", "sm23122");
  await page.type("#password", "!Adentro7901541841");
  await Promise.all([
    page.click(
      "#o > div > div > div > div > div > form > p:nth-child(5) > input[type=submit]"
    ),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  await page.goto(
    "https://research.cardiffmet.ac.uk/do/phd-doctoral-supervision/doctoral-researchers-dashboard/all",
    {
      waitUntil: "networkidle0",
    }
  );

  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadPath,
  });

  await Promise.all([
    page.click("#o > form > div.abe > input[type=submit]:nth-child(2)"),
    //page.waitForNavigation({ waitUntil: "networkidle0", timeout: 0 }),
  ]);

  async function waitFile(filename) {
    return new Promise(async (resolve, reject) => {
      if (!fs.existsSync(filename)) {
        await delay(3000);
        await waitFile(filename);
        resolve();
      } else {
        resolve();
      }
    });
  }

  let result;

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  await waitFile("./temp/Past_and_current_Doctoral_researchers_dashboard.xlsx");
  readXlsxFile(
    "./temp/Past_and_current_Doctoral_researchers_dashboard.xlsx"
  ).then((rows) => {
    result = rows.filter((item) => item.includes(param))[0];
    console.log(result);
  });
  fs.rmdirSync("./temp", { recursive: true });
  res.send(result);
};

Test2("20071058")
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => await page.close());
