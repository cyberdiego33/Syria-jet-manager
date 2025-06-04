const select = document.querySelectorAll('.selectBtn');
const option = document.querySelectorAll('.option');
let index = 1;

select.forEach(a => {
	a.addEventListener('click', b => {
		const next = b.target.nextElementSibling;
		next.classList.toggle('toggle');
		next.style.zIndex = index++;
	})
})
option.forEach(a => {
	a.addEventListener('click', b => { 
		b.target.parentElement.classList.remove('toggle');
		const parent = b.target.closest('.select').children[0];

		parent.setAttribute('data-type', b.target.innerHTML);

		parent.innerHTML = b.target.innerHTML;
	})
});
$( function() {
    $( "#sourcedatepicker" ).datepicker();
	$( "#destinationdatepicker" ).datepicker();
} );


$(function() {
  var countriesAndStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick",
    "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec",
    "Saskatchewan", "Yukon", "United States", "Canada", "Mexico", "United Kingdom", "France",
    "Germany", "Italy", "Spain", "Australia", "New Zealand", "India", "China", "Japan"
  ];

  $("#from").autocomplete({
    source: countriesAndStates,
    minLength: 2
  });

  const fromInput = document.getElementById('from');
  const destinationInput = document.getElementById('to');

  if (fromInput && destinationInput) {
    fromInput.addEventListener('input', () => {
      destinationInput.value = fromInput.value;
    });
  }

  // Get Quote button click handler
  $("#getQuoteBtn").on("click", function() {
    // Gather all selected/input values
    const from = $("#from").val();
    const to = $("#to").val();
    const departureDate = $("#sourcedatepicker").val();
    const arrivalDate = $("#destinationdatepicker").val();
    const passengers = $(".select").eq(2).find(".selectBtn").text(); // Passengers dropdown text
    const travelClass = $(".select").eq(3).find(".selectBtn").text(); // Class dropdown text
    const tripType = $(".triptype button.active").text() || "One-Way"; // Active trip type button text

    // Create receipt content
    let receiptHtml = `
      <p><strong>Trip Type:</strong> ${tripType}</p>
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Departure Date:</strong> ${departureDate}</p>
      <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
      <p><strong>Passengers:</strong> ${passengers}</p>
      <p><strong>Class:</strong> ${travelClass}</p>
    `;

    $("#receiptContent").html(receiptHtml);
    $("#receiptContainer").show();
  });

  // Print Receipt button click handler
  $("#printReceiptBtn").on("click", function() {
    const printContents = document.getElementById("receiptContainer").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  });
});
