//
//  PasswordValidation.swift
//  Pingo
//
//  Created by Jeff Potter on 11/13/14.
//  Copyright (c) 2014 Byron Mackay. All rights reserved.
//

import Foundation

public class PasswordRule : Rule {

    // Alternative Regexes

    // 8 characters. One uppercase. One Lowercase. One number.
    // var PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}$"
    //
    // no length. One uppercase. One lowercae. One number.
    // var PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).*?$"
    
    // 8 characters. one uppercase
    
    private let REGEX: String
    
    public init(){
        self.REGEX = "^(?=.*?[A-Z]).{8,}$"
    }
    
    public init(regex:String){
        self.REGEX = regex
    }

    public func validate(value: String) -> Bool {
        let test = NSPredicate(format: "SELF MATCHES %@", self.REGEX)
        
        if test.evaluateWithObject(value) {
            return true
        }
        
        return false
    }
    
    public func errorMessage() -> String {
        return "Must be 8 characters with 1 uppercase"
    }
}