var SignupTestSuite = {
    requestOptions: {
        method: 'post',
        body: {},
        json: true,
        url: 'http://localhost:8080/signup'
    },
    tests: {
        CompletelyEmpty: {
            description: '1. Completely empty credentials should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                confirm_password: '',
                country_code: '',
                phone_number: '',
                birth_date: ''
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"first_name\" fails because [\"first_name\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "first_name"
                    ]
                }
            }
        },
        ExtraCredential: {
            description: '2. Extra credential in user should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'John',
                last_name: 'Doe',
                username: 'jdoe@gmail.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '05/05/1955',
                extra_credential: 'extra'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "\"extra_credential\" is not allowed",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "extra_credential"
                    ]
                }
            }       
        },
        FirstNameEmpty: {
            description: '3. Empty first_name credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: '',
                last_name: 'Doe',
                username: 'billy@gmail.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '05/05/1955'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"first_name\" fails because [\"first_name\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "first_name"
                    ]
                }
            }  
        },
        FirstNameTooShort: {
            description: '4. Length of first_name credential being too short should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 's',
                last_name: 'Miller',
                username: 'billy@tgi.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"first_name\" fails because [\"first_name\" length must be at least 2 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "first_name"
                    ]
                }
            }
        },
        FirstNameTooLong: {
            description: '5. Length of first_name credential being too long should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'abcdefghijklmnopqrstuvwxyzABCDE',
                last_name: 'Miller',
                username: 'so@jk.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"first_name\" fails because [\"first_name\" length must be less than or equal to 30 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "first_name"
                    ]
                }
            }
        },
        LastNameEmpty: {
            description: '6. Empty last_name credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: '',
                username: 'billyjean@jeans.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"last_name\" fails because [\"last_name\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "last_name"
                    ]
                }
            }
        },
        LastNameTooShort: {
            description: '7. Length of last_name credential being too short should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'T',
                username: 'BillClinton@govern.org',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"last_name\" fails because [\"last_name\" length must be at least 2 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "last_name"
                    ]
                }
            }
        },
        LastNameTooLong: {
            description: '8. Length of last_name credential being too long should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmno',
                username: 'gatorade@sport.org',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"last_name\" fails because [\"last_name\" length must be less than or equal to 40 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "last_name"
                    ]
                }
            }
        },
        UsernameEmpty: {
            description: '9. Empty username credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: '',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"username\" fails because [\"username\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "username"
                    ]
                }
            }
        },
        UsernameNotEmail: {
            description: '10. No email in username credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevo1323',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"username\" fails because [\"username\" must be a valid email]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "username"
                    ]
                }
            }
        },
        UsernameWithoutDomain: {
            description: '11. @ in username but no domain should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevo1323@aol',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"username\" fails because [\"username\" must be a valid email]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "username"
                    ]
                }
            }
        },
        UsernameWithoutAtSymbol: {
            description: '12. Domain in username but no at symbol should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevo1323aol.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"username\" fails because [\"username\" must be a valid email]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "username"
                    ]
                }
            }
        },
        PasswordEmpty: {
            description: '13. Empty password credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevejobs@apple.com',
                password: '',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"password\" fails because [\"password\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "password"
                    ]
                }
            }
        },
        PasswordTooShort: {
            description: '14. Length of password credential being too short should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevewoz@fusion.io',
                password: 'passw',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"password\" fails because [\"password\" length must be at least 6 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "password"
                    ]
                }
            }
        },
        PasswordTooLong: {
            description: '15. Length of password credential being too long should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'omg@wow.io',
                password: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABC',
                confirm_password: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABC',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"password\" fails because [\"password\" length must be less than or equal to 64 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "password"
                    ]
                }
            }
        },
        ConfirmPasswordEmpty: {
            description: '16. Empty confirm_password credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'chriswellerphoto@yahoo.com',
                password: 'password',
                confirm_password: '',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"confirm_password\" fails because [\"confirm_password\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "confirm_password"
                    ]
                }
            }
        },
        ConfirmPasswordTooShort: {
            description: '17. Length of confirm_password credential being too short should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'mick@thestones.com',
                password: 'passwo',
                confirm_password: 'passw',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"confirm_password\" fails because [\"confirm_password\" length must be at least 6 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "confirm_password"
                    ]
                }
            }
        },
        ConfirmPasswordTooLong: {
            description: '18. Length of confirm_password credential being too long should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'grapes@fruit.org',
                password: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789AB',
                confirm_password: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABC',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"confirm_password\" fails because [\"confirm_password\" length must be less than or equal to 64 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "confirm_password"
                    ]
                }
            }
        },
        PasswordsNotEqual: {
            description: '19. Passwords sufficient length but do not match should return 403',
            expectedStatusCode: 403,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'tomcruise@crazy.com',
                password: 'password',
                confirm_password: 'elephant',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 403,
                "message": "Failed to create user: tomcruise@crazy.com!",
                "reason": "The password does not match the confirm password!"
            }
        },
        CountryCodeEmpty: {
            description: '20. Empty country_code credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'rovega@yahoo.com',
                password: 'password',
                confirm_password: 'password',
                country_code: '',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"country_code\" fails because [\"country_code\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "country_code"
                    ]
                }
            }
        },
        CountryCodeTooShort: {
            description: '21. Length of country_code credential being too short should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'derekrudd@rudd.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'Z',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"country_code\" fails because [\"country_code\" length must be at least 2 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "country_code"
                    ]
                }
            }
        },
        CountryCodeTooLong: {
            description: '22. Length of country_code credential being too long should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'batman@thecave.net',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USAS',
                phone_number: '+15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"country_code\" fails because [\"country_code\" length must be less than or equal to 3 characters long]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "country_code"
                    ]
                }
            }
        },
        PhoneNumberEmpty: {
            description: '23. Empty phone_number credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'flash@lightning.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"phone_number\" fails because [\"phone_number\" is not allowed to be empty]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "phone_number"
                    ]
                }
            }
        },
        PhoneNumberMissingPlusSymbol: {
            description: '24. Missing + symbol in phone_number credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'fury@shield.org',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '15555555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"phone_number\" fails because [\"phone_number\" with value \"15555555555\" fails to match the required pattern: /^\\+(?:[0-9] ?){6,14}[0-9]$/]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "phone_number"
                    ]
                }
            }
        },
        PhoneNumberContainsDashes: {
            description: '25. Dashes in phone_number credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'agentcolson@shield.net',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+1-555-555-5555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"phone_number\" fails because [\"phone_number\" with value \"&#x2b;1-555-555-5555\" fails to match the required pattern: /^\\+(?:[0-9] ?){6,14}[0-9]$/]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "phone_number"
                    ]
                }
            }
        },
        PhoneNumberContainsInvalidCharacters: {
            description: '26. Invalid characters in phone_number credential should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'hilary@women.gov',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+1(555)@5555555',
                birth_date: '09/23/1990'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"phone_number\" fails because [\"phone_number\" with value \"&#x2b;1&#x28;555&#x29;&#x40;5555555\" fails to match the required pattern: /^\\+(?:[0-9] ?){6,14}[0-9]$/]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "phone_number"
                    ]
                }
            }
        },
        BirthDateEmpty: {
            description: '27. Empty birth_date should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'george@washington.gov',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: ''
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"birth_date\" fails because [\"birth_date\" must be a number of milliseconds or valid date string]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "birth_date"
                    ]
                }
            }
        },
        BirthDateNotFormattedCorrectly: {
            description: '28. Incorrectly formatted birth_date should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'marty@thefuture.net',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '1991/06/22',
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"birth_date\" fails because [\"birth_date\" must be a number of milliseconds or valid date string]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "birth_date"
                    ]
                }
            }
        },
        BirthDateTooOld: {
            description: '29. Too old of birth_date should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'bose@speakers.io',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '12/31/1889'
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"birth_date\" fails because [\"birth_date\" must be larger than or equal to \"Mon Jan 01 1900 00:00:00 GMT-0800 (PST)\"]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "birth_date"
                    ]
                }
            }
        },
        BirthDateTooYoung: {
            description: '30. Too young of birth_date should return 400',
            expectedStatusCode: 400,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'lego@brick.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '12/31/2014'
            },
            expectedResponse: {
                "statusCode": 400,
                "message": "Failed to create user: lego@brick.com!",
                "reason": "The birth date provided indicated lego@brick.com was less than 18 years old!"
            }
        },
        SuccessfulPost: {
            description: '31. A successful should return 200',
            expectedStatusCode: 200,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevemiller@gmail.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '08/26/1991'
            },
            expectedResponse: {
                "statusCode": 200,
                "message": "Successfully signed up new user: stevemiller@gmail.com",
                "username": "stevemiller@gmail.com"
            }
        },
        RePostingOfPreviousSuccessfulPost: {
            description: '32. Reposting the previous tests successful post should return 409',
            expectedStatusCode: 409,
            body: {
                first_name: 'Steve',
                last_name: 'Smith',
                username: 'stevemiller@gmail.com',
                password: 'password',
                confirm_password: 'password',
                country_code: 'USA',
                phone_number: '+15555555555',
                birth_date: '08/26/1991'
            },
            expectedResponse: {
                "statusCode": 409,
                "message": "Failed to create user: stevemiller@gmail.com!",
                "reason": "This username is taken!"
            }
        }
    }
};

module.exports = SignupTestSuite;

