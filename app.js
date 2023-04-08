$(function () {
    $.ajax({
        url: "https://api.example.com/reservations",
        type: "GET",
        dataType: "json",
        
        beforeSend: function () {
            // show a loader while waiting for API response
            $("#loader").show();
        },
        success: function (reservations) {
            // hide the loader and display the reservation list
            $("#loader").hide();
            reservations.forEach(function (reservation) {
                var reservationItem = $("<li>").addClass("list-group-item");
                var name = $("<h4>").text(reservation.name);
                var roomType = $("<p>").text(reservation.room_type);
                var checkIn = $("<p>").text("Check In: " + reservation.check_in);
                var checkOut = $("<p>").text("Check Out: " + reservation.check_out);
                reservationItem.append(name, roomType, checkIn, checkOut);
                $("#reservations").append(reservationItem);
            });
        },
        error: function () {
            // hide the loader and display an error message when there is an error with the API request
            $("#loader").hide();
            $("#reservations").append($("<p>").text("Error fetching reservations."));
        }
    });

    // handle form submission
    $("#reservation-form").submit(function (event) {
        event.preventDefault();

        // get the form data
        var formData = {
            name: $("#name").val(),
            room_type: $("#room-type").val(),
            check_in: $("#check-in").val(),
            check_out: $("#check-out").val()
        };

        // send the data via a POST request to the API endpoint
        $.ajax({
            url: "https://api.example.com/reservations",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (reservation) {
                // add the new reservation to the reservation list
                var reservationItem = $("<li>").addClass("list-group-item");
                var name = $("<h4>").text(reservation.name);
                var roomType = $("<p>").text(reservation.room_type);
                var checkIn = $("<p>").text("Check In: " + reservation.check_in);
                var checkOut = $("<p>").text("Check Out: " + reservation.check_out);
                reservationItem.append(name, roomType, checkIn, checkOut);
                $("#reservations").append(reservationItem);

                // clear the form inputs
                $("#reservation-form")[0].reset();
            },
            error: function () {
                // display an error message if there is an error with the API request
                alert("Error submitting reservation.");
            }
        });
    });

    // validate form inputs
    $("#name, #room-type").on("input", function () {
        if ($(this).val().length < 3) {
            $(this).addClass("is-invalid");
            $(this).siblings(".invalid-feedback").text("Input must be at least 3 characters.");
        } else {
            $(this).removeClass("is-invalid");
            $(this).siblings(".invalid-feedback").text("");
        }
    });

    $("#check-in").on("input", function () {
        var checkInDate = new Date($(this).val());
        var today = new Date();
        if (checkInDate < today) {
            $(this).addClass("is-invalid");
            $(this).siblings(".invalid-feedback").text("Check In Date must be a future date.");
        } else {
            $(this).removeClass("is-invalid");
            $(this).siblings(".invalid-feedback").text("");
        }
    });

    $("#check-out").on("input", function () {
        var checkInDate = new Date($("#check-in").val());
        var checkOutDate = new Date($(this).val());
        if (checkOutDate <= checkInDate) {
            $(this).addClass("is-invalid");
            $(this).siblings(".invalid-feedback").text("Check Out Date must be after Check In Date.");
        } else {
            $(this).removeClass("is-invalid");
            $(this).siblings(".invalid-feedback").text("");
        }
    });
});
