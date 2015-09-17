var LoginTestSuite = {
    tests: {
    	CompletelyEmpty: {
    		description: '1. Completely empty credentials should return 400',
    		expectedStatusCode: 400,
    		body: {
    			username: '',
    			password: '',
    			deviceID: ''
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
    	ExtraCredential: {
            description: '2. Extra credential in user should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'steveo@gmail.com',
    			password: 'password',
    			deviceID: '0',
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
        UsernameEmpty: {
            description: '3. Empty username credential should return 400',
            expectedStatusCode: 400,
            body: {
                username: '',
                password: 'password',
    			deviceID: '1'
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
            description: '4. No email in username credential should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'stevo1323',
                password: 'password',
                deviceID: '2'
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
            description: '5. @ in username but no domain should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'stevo1323@aol',
                password: 'password',
                deviceID: '3'
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
            description: '6. Domain in username but no at symbol should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'stevo1323aol.com',
                password: 'password',
                deviceID: '4'
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
            description: '7. Empty password credential should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'stevejobs@apple.com',
                password: '',
                deviceID: '5'
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
            description: '8. Length of password credential being too short should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'stevewoz@fusion.io',
                password: 'passw',
                deviceID: '6'
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
            description: '9. Length of password credential being too long should return 400',
            expectedStatusCode: 400,
            body: {
                username: 'omg@wow.io',
                password: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABC',
                deviceID: '7'
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
        DeviceIDEmpty: {
        	description: '10. Empty deviceID credential should return 400',
        	expectedStatusCode: 400,
        	body: {
                username: 'stevejobs@apple.com',
                password: 'password',
                deviceID: ''
            },
            expectedResponse: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"deviceID\" fails because [\"deviceID\" must be a number]",
                "validation": {
                    "source": "payload",
                    "keys": [
                        "deviceID"
                    ]
                }
            }
        },
        UserDoesNotExist: {
        	description: '11. User does not exist in database should return 403',
        	expectedStatusCode: 403,
        	body: {
        		username: 'successful@login.com',
        		password: 'password',
        		deviceID: '8'
        	}, 
        	expectedResponse: {
				"statusCode": 403,
				"message": "Failed to login successful@login.com!",
				"reason": "successful@login.com is not a registered user in the database!"
			}
        },
        IncorrectPassword: {
        	description: '12. Incorrect password should return 403',
        	expectedStatusCode: 403,
        	body: {
        		username: 'rogervega@gmail.com',
        		password: 'passwords',
        		deviceID: '8'
        	},
        	expectedResponse: {
				"statusCode": 403,
				"message": "Failed to login rogervega@gmail.com!",
				"reason": "The entered password is inccorect!"
			}
        },
        SuccessfulLogin: {
        	description: '13. Successful login should return 201',
        	expectedStatusCode: 201,
        	body: {
        		username: 'rogervega@gmail.com',
        		password: 'password',
        		deviceID: '8'
        	},
        	expectedResponse: {
				"statusCode": 201,
				"message": "rogervega@gmail.com has successfully logged in!"
			},
			responseKeys: ['statusCode', 'message', 'token']
        },
        UserAlreadyLoggedIn: {
        	description: '14. User already logged in should return 200',
        	expectedStatusCode: 200,
        	body: {
        		username: 'chrisweller@gmail.com',
        		password: 'password',
        		deviceID: '8'
        	},
        	expectedResponse: {
				"statusCode": 200,
				"message": "User already logged in on specified device!"
			}
        }
    }
};

module.exports = LoginTestSuite;