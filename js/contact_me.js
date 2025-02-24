$(function () {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true, // Keeps form validation enabled
        submitError: function ($form, event, errors) {
            // Handle validation errors
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Prevent default submit behavior
            
            // Get values from the form
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name.split(' ')[0]; // Extract first name

            // Replace with your actual Google Form's formResponse URL
            var googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeRV889XHyasJ-DCk-SMXniRcOO7C2e4OIYnvkPce5I00kK2Q/formResponse";
            
            // Replace `entry.XXXXXXX` with the actual Google Form field names
            var formData = {
                "entry.2083922334": name,      // Replace with Google Form's entry ID for 'Name'
                "entry.1241893417": email,     // Replace with Google Form's entry ID for 'Email'
                "entry.1056316793": message    // Replace with Google Form's entry ID for 'Message'
            };

            $.ajax({
                url: googleFormURL,
                type: "POST",
                data: formData,
                dataType: "xml", // Google Forms does not return a JSON response
                crossDomain: true,
                success: function () {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success')
                        .html("<button type='button' class='close' data-dismiss='alert'>&times;</button>")
                        .append("<strong>Your message has been sent successfully. </strong>")
                        .append("</div>");

                    // Clear form fields
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // Google Forms doesn't return a response, so we assume success
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success')
                        .html("<button type='button' class='close' data-dismiss='alert'>&times;</button>")
                        .append("<strong>Your message has been sent successfully. </strong>")
                        .append("</div>");

                    // Clear form fields
                    $('#contactForm').trigger("reset");
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/* Clear success/fail messages when focusing on name input */
$('#name').focus(function () {
    $('#success').html('');
});
