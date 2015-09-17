var Hapi = require('hapi'),
	Neo = require('node-neo4j'),
	Service = require('./service/service.js'),
	Respond = require('./utilities/response/respond'),
	Objects = require('./models/objects/objects'),
	Util = require('./utilities/utilities'),
	aws = require("aws-lib");

var Api = {
	Signup: function (payload, reply) {
		Service.FindUser(payload.username, function (err, userExists) {
			if (err) {
				Respond.NeoFailedToExecuteFindUser(reply);
			} else if (userExists) {
				Respond.UsernameExists(reply, payload.username);
			} else if (payload.password !== payload.confirm_password) {
				Respond.PasswordsDoNotMatch(reply, payload.username);
			} else if (!Util.UserOldEnough(payload.birth_date)) {
				Respond.UserNotOldEnough(reply, payload.username);
			} else {
				Service.CreateNewUser(Objects.User(payload), function (err, result) {
					if (err) {
						Respond.NeoFailedToCreateUser(reply, payload.username);
					} else {
						Service.CreateDefaultNodesForNewUser(payload.username, function (err, result) {
							if (err) {
								Respond.NeoFailedToCreateDefaultWishList(reply, payload.username);
							} else {
								Respond.UserCreated(reply, payload.username);
							}
						});
					}
				});
			}
		});
	},
	Login: function (payload, reply) {
		Service.FindUser(payload.username, function (err, userExists, user) {
			if (!userExists) {
				Respond.UserDoesNotExist(reply, payload.username);
			} else if (payload.password !== user.password) {
				Respond.IncorrectPassword(reply, user.username);
			} else {
				Service.WipeOutLostTokensByUserAndDevice(user.username, payload.deviceID, function (err) {
					if (err) {
						Respond.NeoFailedToLogin(reply);
					} else {
						Service.Login(user.username, payload.deviceID, function (err, token) {
							if (err) {
								Respond.NeoFailedToLogin(reply);
							} else {
								Respond.LoggedIn(reply, user.username, token);
							}
						});
					}
				});
			}				
		});
	},
	ValidateSession: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Respond.ValidToken(reply);
			}
		});
	},
	Logout: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.DeleteSession(payload.token, function (err) {
					if (err) {
						Respond.NeoFailedToLogout(reply); 
					} else {
						Respond.LoggedOutUser(reply);
					}
				});
			}
		});
	},
	SearchForUsers: function (headers, reply) {
		Service.Authenticate(headers.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.SearchForUsers(headers.username_search_term, function (err, users) {
					if (err) {
						Respond.NeoFailedToSearchForUsers(reply);
					} else {
						Respond.ListOfUsers(reply, Util.CreateUsersArray(users));	
					}
				});
			}
		});
	}, 
	FriendRequest: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.FriendRequest(payload.token, payload.username, function (err) {
					if (err) {
						Respond.NeoFailedToFriendRequest(reply, payload.username);
					} else {
						Respond.SuccessfulFriendRequest(reply, payload.username);
					}
				});
			}
		});
	},
	CancelFriendRequest: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.CancelFriendRequest(payload.token, payload.username, function (err) {
					if (err) {
						Respond.NeoFailedToCancelFriendRequest(reply, payload.username);
					} else {
						Respond.CancelledFriendRequest(reply, payload.username);
					}
				});
			}
		});
	},
	AcceptFriendRequest: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.CanUserAcceptFriendRequest(payload.token, payload.username, function (err, canAcceptFriendRequest) {
					if (err) {
						Respond.NeoFailedToAcceptFriendRequest(reply, payload.username);
					} else if (!canAcceptFriendRequest) {
						Respond.IllegalAcceptFriendRequest(reply);
					} else {
						Service.AcceptFriendRequest(payload.token, payload.username, function (err) {
							if (err) {
								Respond.NeoFailedToAcceptFriendRequest(reply, payload.username);
							} else {
								Respond.AcceptFriendRequest(reply, payload.username);
							}
						});
					} 
				});		
			}
		});
	},
	GetFriendsList: function (token, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.GetFriendsList(token, function (err, listOfFriends) {
					if (err) {
						Respond.NeoFailedToFindFriends(reply);
					} else {
						Respond.ListOfFriends(reply, Util.CreateFriendsArray(listOfFriends));
					}
				});
			}
		});
	},
	GetWishListsOfFriend: function (token, friendUsername, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.GetWishListsOfFriend(token, friendUsername, function (err, wishListsOfFriend) {
					if (err) {
						Respond.NeoFailedToFindWishListsOfFriend(reply);
					} else {
						Respond.WishListOfFriend(reply, Util.CreateListOfWishLists(wishListsOfFriend));
					}
				});
			}
		});
	},
	CreateWishList: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.DoesWishListExist(payload.token, payload.wishlist_name, function (err, wishListExists) {
					if (err) {
						Respond.NeoFailedToDetermineNameUnique(reply);
					} else if (wishListExists) {
						Respond.WishListNameNotUnique(reply, payload.wishlist_name);
					} else {
						Service.CreateWishList(payload.token, payload.wishlist_name, function (err) {
							if (err) {
								Respond.NeoFailedToCreateWishList(reply);
							} else {
								Respond.SuccessfullyCreatedWishList(reply, payload.wishlist_name);
							}
						});
					}						
				});
			}
		});
	},
	DeFriend: function (payload, reply) {
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.DoesUserHaveFriend(payload.token, payload.friend_username, function (err, userHasFriend) {
					if (err) {
						Respond.NeoFailedToFindFriend(reply);
					} else if (!userHasFriend) {
						Respond.UserDoesNotHaveFriend(reply);
					} else {
						Service.DeFriend(payload.token, payload.friend_username, function (err, friend) {
							if (err) {
								Respond.NeoFailedToDeFriend(reply);
							} else {
								Respond.SuccessfullyDeFriended(payload.friend_username, reply);
							}
						});
					}
				});
			}
		});
	},
	GetUserWishLists: function (token, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.GetUserWishLists(token, function (err, userWishLists) {
					if (err) {
						Respond.NeoFailedToGetUserWishLists(reply);
					} else {
						Respond.UserWishLists(reply, Util.CreateListOfWishLists(userWishLists));
					}
				});
			}
		});
	},
	GetUserFriendRequests: function (token, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.GetUserFriendRequests(token, function (err, userFriendRequests) {
					if (err) {
						Respond.NeoFailedToGetUserFriendRequests(reply);
					} else {
						Respond.UserFriendRequests(reply, Util.CreateListOfFriendRequets(userFriendRequests));
					}
				});
			}
		});
	},
	GetAmazonSearchResults: function (token, searchIndex, keywords, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				prodAdv = aws.createProdAdvClient("AKIAIOGSOFXN6IHGQPUA", "CLmDa6iTLc/QqDVvbREcaKZKbB+c6Hnar9uEuHZt", "giftercom-20");
				prodAdv.call("ItemSearch", {SearchIndex: searchIndex, Keywords: keywords}, function (err, result) {
					Respond.AmazonSearchResults(reply, Util.CreateSearchResultsItemsArray(result["Items"]["Item"]));
				});
			}
		});
	},
	GetUserItems: function (token, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.GetUserItems(token, function (err, items) {
					if (err) {
						Respond.NeoFailedToGetUserItems(reply);
					} else {
						Respond.UserItems(reply, items);
					}
				});
			}
		});
	},
	CreateUserItem: function (payload, reply) { // Need to check if the item already exists
		Service.Authenticate(payload.token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.CreateUserItem(payload.token, payload.title, payload.url, function (err) {
					if (err) {
						Respond.NeoFailedToAddItem(reply);
					} else {
						Respond.CreatedItem(reply, payload.title);
					}
				});
			}
		});
	},
	GetFriendsItems: function(token, username, reply) {
		Service.Authenticate(token, function (err, tokenIsValid) {
			if (!tokenIsValid || err) {
				Respond.InvalidToken(reply);
			} else {
				Service.GetFriendsItems(token, username, function (err, items) {
					if (err) {
						Respond.NeoFailedToFindFriendsItems(reply);
					} else {
						Respond.FriendsItems(reply, items);
					}
				});
			}
		});
	}
};

module.exports = Api;


