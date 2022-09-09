$(document).ready(function () {
  if ($().owlCarousel) {
    $(".abc").each(function () {
      var $this = $(this),
        auto = $this.data("auto"),
        item = $this.data("column"),
        item2 = $this.data("column2"),
        item3 = $this.data("column3"),
        gap = Number($this.data("gap"));

      $this.find(".owl-carousel").owlCarousel({
        stagePadding: 10,
        margin: gap,
        navigation: true,
        pagination: true,
        autoplay: auto,
        autoplayTimeout: 5000,
        responsive: {
          0: {
            items: item3,
          },
          600: {
            items: item2,
          },
          1000: {
            items: item,
          },
        },
      });
    });
  }
});
