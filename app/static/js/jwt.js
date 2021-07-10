function jwt_new_get() {
    $.ajax({
        type: "POST",
        url: '/api/v0.1/refresh_tokin',
        headers: {
            "Content-Type": "application/json"
        },
        async: true,

        success: function(data) {
            console.log(data);
            localStorage.setItem('accessToken', data['accessToken'])
        },
        statusCode: {
            405: function(data) {
                console.error(data['responseJSON']['errors'])
            },
            400: function(data) {
                console.error(data['responseJSON']['errors'])
            },
            402: function(data) {
                console.error(data['responseJSON']['errors'])

            }
        }

    });
}