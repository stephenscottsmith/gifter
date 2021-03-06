//
//  ConfirmRule.swift
//  Validator
//
//  Created by Jeff Potter on 3/6/15.
//  Copyright (c) 2015 jpotts18. All rights reserved.
//

import Foundation
import UIKit

public class ConfirmationRule: Rule {
    
    let confirmField: UITextField
    
    init(confirmField: UITextField) {
        self.confirmField = confirmField
    }
    
    public func validate(value: String) -> Bool {
        if self.confirmField.text == value {
            return true
        } else {
            return false
        }
    }
    
    public func errorMessage() -> String {
        return "This field does not match"
    }
    
}