function call(stock) {




    var queryURL = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + stock + "&apikey=2V72ME51BOFXRYCJ";
    var queryURL2 = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stock + "&apikey=2V72ME51BOFXRYCJ";



    $.ajax({
        url: queryURL,
        method: "GET"

    })
        .then(function (response) {

            let name = response.Name;
            let country = response.Country;
            let exchange = response.Exchange;
            let description = response.Description;
            let symbol = response.Symbol;
            let sector = response.Sector;

            $.ajax({
                url: queryURL2,
                method: "GET"

            })
                .then(function (response2) {


                    document.getElementById('res').insertAdjacentHTML("afterbegin", `
                    <div class="card-info primary">
                    <div class="card-info-label">
                        <div class="card-info-label-text" id="stockSymbol">
                          ${symbol}
                        </div>
                    </div>
                    <div class="card-info-content">
                        <h3 class="lead" id="stockName">Company: ${name}</h3>
                       <p id="stockCountry">Country: ${country}</p>
                       <p id="stockSector">Sector: ${sector}</p>
                        <p id="stockExchange">Exchange: ${exchange}</p>
                        <p id="stockDescription">Description: ${description}</p>
                       <p id="stockOpen">Today's Open Price: ${response2["Global Quote"]["02. open"]}</p>
                       <p id="stockHigh"> Today's High: ${response2["Global Quote"]["03. high"]}</p>
                       <p id="stockLow">Today's Low: ${response2["Global Quote"]["04. low"]}</p>
                       <p id="stockPrice">Current Price: ${response2["Global Quote"]["05. price"]}</p>
                    </div>
                </div>`)



                })
        })
};

// Call API with elements with history id
$(document).ready(function () {

    $("[id=history]").click(function () {
        var stock = $(this).text();
        console.log("called!");
        call(stock);



    });
});