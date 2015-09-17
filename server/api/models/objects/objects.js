var Objects = {
    User: function (payload) {
        return {
            first_name: payload['first_name'],
            last_name: payload['last_name'],
            username: payload['username'],
            password: payload['password'],
            country_code: payload['country_code'], 
            phone_number: payload['phone_number'],
            birth_date: payload['birth_date'],
            member_since: payload['member_since']
        };
    }
};

module.exports = Objects;
