//
//  GifterApi.swift
//  Gifter
//
//  Created by Stephen Smith on 4/26/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class GifterApi {
    init() {
        
    }

    class func hello() -> Void {
        Alamofire.request(.GET, "http://23.240.186.111:8080/hello")
            .responseJSON { (request, response, json, error) in
                println(response)
                println(json!)
            }
    }

    class func validateStoredToken(token: String, completion: (AnyObject)-> Void) -> Void {
        var body = [
            "token": token
        ]

        var err = Alamofire.request(.POST, "http://23.240.186.111:8080/validsessions", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
            }
    }
    
    class func login(username: String, password: String, completion: (AnyObject)->Void) -> Void {
        var body = [
            "username": username,
            "password": password,
            "deviceID": "23"
        ]
        println(UIDevice.currentDevice().identifierForVendor.UUIDString)
        
        var err = Alamofire.request(.POST, "http://23.240.186.111:8080/sessions", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
            }
    }
    
    class func signup(user: [String : String], completion: (AnyObject)-> Void) -> Void {
        Alamofire.request(.POST, "http://23.240.186.111:8080/signup", parameters: user, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
            }
    }
    
    class func getUserWishLists (token: String, completion: (AnyObject)->Void) -> Void {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token]
        Alamofire.request(.GET, "http://23.240.186.111:8080/user/wishlists", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
        }
    }
    
    class func getUserFriends (token: String, completion: (AnyObject)->Void) -> Void {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token]
        Alamofire.request(.GET, "http://23.240.186.111:8080/user/friends", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
        }
    }
    
    class func getUserRequests (token: String, completion: (AnyObject)->Void) -> Void {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token]
        Alamofire.request(.GET, "http://23.240.186.111:8080/user/friends/requests", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
        }
    }
    
    class func logout (token: String, completion: (AnyObject)->Void) -> Void {
        var body = ["token": token]
        Alamofire.request(.DELETE, "http://23.240.186.111:8080/sessions", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(response!)
        }
    }
    
    class func searchForItems (token: String, searchIndex: String, searchTerm: String, completion: (AnyObject)->Void) {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token,
                                                                                        "searchindex": searchIndex,
                                                                                        "searchterm": searchTerm]
        Alamofire.request(.GET, "http://23.240.186.111:8080/amazon/items", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
        }
    }
    
    class func getUserItems (token: String, completion: (AnyObject)->Void) -> Void {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token]
        Alamofire.request(.GET, "http://23.240.186.111:8080/user/items", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
        }
    }
    
    class func addItemToWishList(token: String, title: String, url: String, completion: (AnyObject)->Void) -> Void {
        var body = [
            "token": token,
            "title": title,
            "url": url
        ]
        Alamofire.request(.POST, "http://23.240.186.111:8080/user/items", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                completion(json!)
        }
    }
    
    class func searchForUsers(token: String, searchTerm: String, completion: (AnyObject)->Void) -> Void {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token,
                                                                                        "username_search_term": searchTerm]
        Alamofire.request(.GET, "http://23.240.186.111:8080/users", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                println(json!)
                completion(json!)
        }
    }
    
    class func friendRequestUser(token: String, username: String, completion: (AnyObject)->Void) -> Void {
        var body = [
            "token": token,
            "username": username
        ]
        Alamofire.request(.POST, "http://23.240.186.111:8080/user/friends/requests", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                println(json!)
                completion(json!)
        }
    }
    
    class func acceptFriendRequest(token: String, username: String, completion: (AnyObject)->Void) -> Void {
        var body = [
            "token": token,
            "username": username
        ]
        Alamofire.request(.PATCH, "http://23.240.186.111:8080/user/friends/requests", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                println(json!)
                completion(json!)
        }
    }
    
    class func deleteFriendRequest(token: String, username: String, completion: (AnyObject)->Void) -> Void {
        var body = [
            "token": token,
            "username": username
        ]
        Alamofire.request(.PATCH, "http://23.240.186.111:8080/user/friends/requests", parameters: body, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                println(json!)
                completion(json!)
        }
    }
    
    class func getFriendsItems(token: String, username: String, completion: (AnyObject)->Void) -> Void {
        Alamofire.Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = ["token": token,
                                                                                     "username": username]
        Alamofire.request(.GET, "http://23.240.186.111:8080/user/friend/items", parameters: nil, encoding: .JSON)
            .responseJSON { (request, response, json, error) in
                println(json!)
                completion(json!)
        }
    }
}