var settings = {
    "url": "https://fe-assignment.vaimo.net/",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    loadImage(response.product.gallery[0]);
    loadShipping(response.product.shipping.props);
    loadDescription(response);
    loadRatings(response.product.reviews);
    loadPrice(response.product.options);
    loadCountdown(response.product.discount);
    loadOptionList(response.product.options);
    loadShippingAd(response.product.shipping);
  });

  function loadImage(apiData) {
      jQuery("#img1").attr("src", apiData.main);
  }

  function loadShipping(apiData) {
      if (apiData.fast_dispatch == true) {
        $("#sinfo3").css("display", "block");
        console.log("info available");
      }

      if (apiData.in_stock == true) {
        $("#sinfo2").css("display", "block");
        console.log("info available");
      }
      
      if (apiData.ready_to_ship == true) {
        $("#sinfo1").css("display", "block");
        console.log("info available");
      }
  }

  function loadDescription(apiData) {
    $('#Prod-desc').append('<a class="description">'+apiData.product.name+'</a>');
  }

  function loadRatings(apiData) {
    for (var i = 0; i < apiData.rating; i++) {
        $("#stars").append('<img src="assets/icons8-star_filled.png" class="star">');
        
    }
    $("#rated").append(apiData.rating);
    $("#reviews").append(apiData.count+ ' reviews');
    $("#buyers").append(apiData.total_buyers+ ' buyers');
  }

  function loadPrice(apiData) {
      var lowest_price;
      var highest_price;
      var lowest_priceold;
      var highest_priceold;
      var currency = apiData["4k"].price.currency.symbol + ' ';


      var item1 = apiData["4k"].price.value;
      var item2 = apiData["1080p"].price.value;
      var item3 = apiData.battery_accessories.price.value;

      var item1old = apiData["4k"].old_price.value;
      var item2old = apiData["1080p"].old_price.value;
      var item3old = apiData.battery_accessories.old_price.value;

      //New Price Calculate High
      if (item1 > item2 && item1 > item3) {
          highest_price = item1;
      }

      if (item2 > item3 && item2 > item1) {
          highest_price = item2;
      }
      
      if (item3 > item1 && item3 > item2) {
          highest_price = item3;
      }

      //New Price Calculate Low
      if (item1old < item2old && item1old < item3old) {
          lowest_price = item1old;
      }

      if (item2old < item1old && item2old < item3old) {
        lowest_price = item2old;
      }

      if (item3old < item1old && item3old < item2old) {
          lowest_price = item3old;
      }

      //Old Price Calculate High
      if (item1old > item2old && item1old > item3old) {
        highest_priceold = item1old;
      }

      if (item2old > item3old && item2old > item1old) {
        highest_priceold = item2old;
      }

      if (item3old > item1old && item3old > item2old) {
        highest_priceold = item3old;
      }
      //OldPrice Calculate Low
      if (item1old < item2old && item1old < item3old) {
        lowest_priceold = item1old;
      }

      if (item2old < item1old && item2old < item3old) {
      lowest_priceold = item2old;
      }

      if (item3old < item1old && item3old < item2old) {
      lowest_priceold = item3old;
      }

    $("#disc-price").append(currency+lowest_price + ' - ' + currency+highest_price);
    $("#original-price").append(currency+lowest_priceold + ' - ' + currency+highest_priceold);
  }

  function loadCountdown(apiData) {
    var now = new Date();
    var days;
    var hours;
    var minutes;
    var seconds;
    var expires;
    var nowNumber;
    $("#disc-perc").append(apiData.amount+' OFF');
    expires = apiData.end_date;
    days = (Date.parse(expires) - Date.parse(now))/1000/60/60/24;
    hours = (days - Math.floor(days))*60;
    minutes = (hours - Math.floor(hours))*60;
    seconds = (minutes - Math.floor(minutes))*60;

    days = Math.floor(days);
    if (hours > 24) {
      hours = Math.floor(hours - 24);
    }
    else {
      hours = Math.floor(hours);
    }

    if (minutes > 60) {
      minutes = Math.floor(minutes - 60);
    }
    else {
      minutes = Math.floor(minutes);
    }

    if (seconds > 60) {
      seconds = Math.floor(seconds - 60);
    }
    else {
      seconds = Math.floor(seconds);
    }

    
    $('#time').append(days+'d:' + hours+'h:' + minutes+ 'm' + seconds+'s');
    
  }

  function loadOptionList(apiData) {
    $('#label1').append(apiData["4k"].label);
    $('#price1').append('<a>' + apiData["4k"].price.currency.symbol+''+apiData["4k"].price.value +'</a>');


    $('#label2').append(apiData["1080p"].label);
    $('#price2').append(apiData["1080p"].price.currency.symbol+''+apiData["1080p"].price.value);


    $('#label3').append('<a style="width: 33%">'+apiData.battery_accessories.label+'</a>');
    $('#price3').append(apiData.battery_accessories.price.currency.symbol+''+apiData.battery_accessories.price.value);

  }


  function changeQuant(button, itemno) {
    if (itemno == "i1" && button.id == 'minus' && $('#in1').val() != 0)  {
      $('#in1').val($('#in1').val() - 1);
      if ($('#in1').val() == 0) {
        $("#item1 > div#minus").css("border", "1px solid #E6E7EB");
        $("#item1 > div#minus>div").css("background-color", "#E6E7EB");
      }
    }
    else if (itemno == "i2" && button.id == 'minus' && $('#in2').val() != 0) {
      $('#in2').val($('#in2').val() - 1);
      if ($('#in2').val() == 0) {
        $("#item2 > div#minus").css("border", "1px solid #E6E7EB");
        $("#item2 > div#minus>div").css("background-color", "#E6E7EB");
      }
    }
    else if (itemno == "i3" && button.id == 'minus' && $('#in3').val() != 0) {
      $('#in3').val($('#in3').val() - 1);
      if ($('#in3').val() == 0) {
        $("#item3 > div#minus").css("border", "1px solid #E6E7EB");
        $("#item3 > div#minus>div").css("background-color", "#E6E7EB");
      }
    }

    if (itemno == "i1" && button.id == 'plus')  {
      $('#in1').val(parseInt($('#in1').val(), 10) + 1);
      if ($('#in1').val() >= 1) {
        $("#item1 > div#minus").css("border", "1px solid #FF6600");
        $("#item1 > div#minus>div").css("background-color", "#FF6600");
      }

    }
    else if (itemno == "i2" && button.id == 'plus') {
      $('#in2').val(parseInt($('#in2').val(), 10) + 1);
      if ($('#in2').val() >= 1) {
        $("#item2 > div#minus").css("border", "1px solid #FF6600");
        $("#item2 > div#minus>div").css("background-color", "#FF6600");
      }
    }
    else if (itemno == "i3" && button.id == 'plus') {
      $('#in3').val(parseInt($('#in3').val(), 10) + 1);
      if ($('#in3').val() >= 1) {
        $("#item3 > div#minus").css("border", "1px solid #FF6600");
        $("#item3 > div#minus>div").css("background-color", "#FF6600");
      }
    }
  }

  function loadShippingAd(apiData) {
    $('#init').append('Ship to <a style="text-decoration: underline">'+apiData.method.country+'<br> by '+apiData.method.title)+'</a>';
    $('#shipcost').append(apiData.method.cost.currency.symbol + ' ' + apiData.method.cost.value )
    $('#lead').append('Lead Time: '+apiData.lead_time.value+'<img src="assets/icons8-info.png">');
    $('#shiptime').append('Shipping time: ' + apiData.method.shipping_time.value+'<img src="assets/icons8-info.png">');
  }