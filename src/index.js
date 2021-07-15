// إضافة css
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
//import '@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './css/style.css';
//import './scss/style.scss';


// إضافة js
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';

// إضافة font fortawesome
import '@fortawesome/fontawesome-free/js/all.min';

// إضافة jquery-ui
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $('.add-to-cart-btn').click(function () {//  عند ضغط على ايقونة الشراء تظهر الرسالة  
    alert('أضيف المنتج إلى عربة الشراء');
  });
  // إضافة السنة الحالية 2021
  $('#copyright').text(" جميع الحقوق محفوظة للمتجر لسنة " + new Date().getFullYear());


  // تغيير
  $('.product-option input[type="radio"]').on("change", function () {
    $(this).parents('.product-option').siblings().removeClass('active');// remove active
    $(this).parents('.product-option').addClass('active');// add active
  });

  $('[data-remove-from-cart]').on("click", function () {
    $(this).parents('[data-product-info]').remove();

    // أعد حساب السعر الإجمالي بعد حذف أحد المنتجات
    calculateTotalPrice();
  });

  // عندما تتغير كمية المنتج
  $('[data-product-quantity]').on("change", function () {

    // اجلب الكمية الجديدة
    var newQuantity = $(this).val();

    // ابحث عن السطر الذي يحتوي معلومات هذا المُنتج
    var $parent = $(this).parents('[data-product-info]');

    // اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = $parent.attr('data-product-price');

    // السعر الإجمالي للمنتج هو سعر القطعة مضروبا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    // عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذا السطر
    $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

    // حدث السعر الإجمالي لكل المنتجات
    calculateTotalPrice();
  });

  function calculateTotalPrice() {

    // أنشئ متغيرا جديدًا لحفظ السعر الإجمالي
    var totalPriceForAllProducts = 0;

    // لكل سطر يمثل معلومات المنتج في الصفحة
    $('[data-product-info]').each(function () {

      // اجلب سعر القطعة الواحدة من الخاصية الموافقة
      var pricePerUnit = $(this).attr('data-product-price');

      // اجلب كمية المنتج من حقل اختيار الكمية
      var quantity = $(this).find('[data-product-quantity]').val();

      var totalPriceForProduct = pricePerUnit * quantity;

      // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المنتجات، واحفظ القيمة في المتغير نفسه
      totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
    });

    // حدث السعر الإجمالي لكل المُنتجات في الصفحة
    $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
  }
  //اختيار المدينة حسب الدولة
  var citiesByCountry = {
    LB: ['طرابلس', 'بيروت'],
    TR: ['أسطنبول', 'أنقرة'],
    JO: ['عمان', 'الزرقاء'],
    PSE: ['نابلس', 'القدس ', 'غزة']
  };
  // عندما يتغير البلد
  $('#form-checkout select[name="country"]').on("change", function () {
    // اجلب رمز البلد
    var country = $(this).val();

    // اجلب مدن هذا البلد من المصفوفة
    var cities = citiesByCountry[country];

    // فرغ قائمة المدن
    $('#form-checkout select[name="city"]').empty();
    //إضافة خيار أختر مدينة 
    $('#form-checkout select[name="city"]').append(
      '<option disabled selected value="">اختر المدينة</option>'
    );

    // أضف المدن إلى قائمة المدن
    cities.forEach(function (city) {
      var newOption = $('<option></option>');
      newOption.text(city);
      newOption.val(city);
      $('#form-checkout select[name="city"]').append(newOption);
    });

  });
  // عندما تتغير طريقة الدفع
  $('#form-checkout input[name="payment_method"]').on("change", function () {

    // اجلب قيمة مختارة حاليا
    var paymentMethod = $(this).val();

    if (paymentMethod === 'on_delivery') {

      // اذا كانت عند الاستلام عطل حقل بطاقة الائتمان
      $('#credit-card-info input').prop('disabled', true);

    } else {

      // و الا فعلها
      $('#credit-card-info input').prop('disabled', false);
    }

    // بدل معلومات بطاقة الائتمان بين ظهور و اخفاء
    $('#credit-card-info').toggle();

  });

  //مكون البحث حسب السعر   
  $("#price-range").slider({
    range: true,
    min: 50,
    max: 1000,
    step: 50,
    values: [250, 800],
    slide: function (event, ui) {
      $('#price-min').text(ui.values[0]);
      $('#price-max').text(ui.values[1]);
    }

  });


});