// 1) ready + global variables
// 2) JSON of all countries
// 3) functions:
// 3.1 > else if submit was clicked:
// 3.1.0 >> empty variables
// 3.1.1 >> make divs of all countries start with input
// 3.1.2 >> show div(s)
//
// 3.2 > if everywhere was clicked:
// 3.2.0 >> empty variables
// 3.2.1 >> make divs of all countries
// 3.2.2 >> show div(s)
//
// 4) comenting to console.
// 
// 
// Written by Noam Tzionit
// ------------------------------------------------------------------------
$(document).ready(function () {
    var reqURL = "https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag";
    var countries = [];
    var counter;
    var formattedHTML = "";
    var tempUpperCase = "";
    var tempLowerCase = "";

    $("#everywhere").click(function (event) {
        counter = 0;
        if (($("input:first").val() == null) && (/^[a-zA-Z ']+$/.test($("input:first").val()))) {
            $("#data").append(`<div></div>`).text("Please insert a valid country name or a part of it.").show().fadeOut(1500);
            console.log("Error: Input must include only A-z; \'; \ , and musn't be null.");
            event.preventDefault();
        } else {
            console.log("Searching for all countries...");
            countries.length = 0;
            $("#data").html("");
            $.getJSON(reqURL, function (arr) {
                $.each(arr, function (arrIndex, countryObj) {
                    formattedHTML = "<div class='countryInfo'><a href='https://en.wikipedia.org/wiki/" + countryObj.name + "'><img class='flag' src='" + countryObj.flag + "' alt='flag'></a>" +
                        "Name: " + countryObj.name + "<br>" +
                        "Capital: " + countryObj.capital + "<br>" +
                        "Currencies: " + countryObj.currencies[0].name + ", " + countryObj.currencies[0].code + ", " + countryObj.currencies[0].symbol + "<br>" +
                        "Top Level Domain: " + countryObj.topLevelDomain[0] +
                        "</div>";
                    countries.push(formattedHTML);
                    counter++;
                });
                $("#data").append(countries);
                $("#bonus").html('<h5 class="surprise">Bonus: Click on the flags to learn about your destination!</h5>');
                console.log("Found " + counter + " countries.");
                if (counter == 250) {
                    console.log("Search over.");
                }
            });
        }
        event.preventDefault();
    });

    $("form").submit(function (event) {
        counter = 0;
        if (($("input:first").val() == null) && (/^[a-zA-Z ']+$/.test($("input:first").val()))) {
            $("#data").append(`<div></div>`).text("Please insert a valid country name or a part of it.").show().fadeOut(1500);
            console.log("Error: Input must include only A-z; \'; \ , and musn't be null.");
            event.preventDefault();
        } else {
            console.log("Searching for country names with \'" + $("input:first").val() + "\'...");
            tempUpperCase = "";
            tempLowerCase = "";
            formattedHTML = "";
            countries.length = 0;
            $("#data").html("");
            // event.preventDefault();
            $.getJSON(reqURL, function (arr) {
                $.each(arr, function (arrIndex, countryObj) {
                    tempUpperCase = $("input:first").val()[0].toUpperCase();
                    tempUpperCase += $("input:first").val().toLowerCase().substring(1);
                    tempLowerCase = $("input:first").val().toLowerCase();
                    if ((countryObj.name.indexOf($("input:first").val()) != -1) || (countryObj.name.indexOf(tempUpperCase) != -1) || (countryObj.name.indexOf(tempLowerCase) != -1)) {
                        console.log("\'" + countryObj.name + "\' fits to the query.");
                        formattedHTML = "<div class='countryInfo'><a href='https://en.wikipedia.org/wiki/" + countryObj.name + "'><img class='flag' src='" + countryObj.flag + "' alt='flag'></a>" +
                            "Name: " + countryObj.name + "<br>" +
                            "Capital: " + countryObj.capital + "<br>" +
                            "Currencies: " + countryObj.currencies[0].name + ", " + countryObj.currencies[0].code + ", " + countryObj.currencies[0].symbol + "<br>" +
                            "Top Level Domain: " + countryObj.topLevelDomain[0] +
                            "</div>";
                        countries.push(formattedHTML);
                        counter++;
                    }
                });

                console.log("Found " + counter + " countries.");

                if (countries[0] != null) {
                    $("#data").append(countries);
                    $("#bonus").html('<h5 class="surprise">Bonus: Click on the flags to learn about your destination!</h5>');
                    console.log("Search over.");
                } else {
                    console.log("Error: no countries include the asked string: \'" + $("input:first").val() + "\'.");
                }
            });
        }
        event.preventDefault();
    });


    var dateObj = new Date();

    var h = dateObj.getHours();
    var d = addZero(dateObj.getDate());
    var m = addZero(dateObj.getMonth() + 1);
    var y = addZero(dateObj.getFullYear());
    var strDate = "";

    strDate += `<b>${d}-${m}-${y} `;

    if ((6 <= h) && (h < 12)) {
        strDate += `, Good Morning</h6>`;
    } else if (h == 12) {
        strDate += `, Good Afternoon</h6>`;
    } else if ((12 < h) && (h < 22)) {
        strDate += `, Good Evening</h6>`;
    } else if (((22 <= h) && (h <= 23)) || (h < 6)) {
        strDate += `, Good Night</b>`;
    }

    document.getElementById('date').innerHTML = `${strDate}`;
    function addZero(i) {
        if (i <= 9) {
            i = `0${i}`;
        }
        return i;
    }

});