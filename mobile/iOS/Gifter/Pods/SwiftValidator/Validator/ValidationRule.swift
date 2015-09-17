//
//  ValidationRule.swift
//  Pingo
//
//  Created by Jeff Potter on 11/11/14.
//  Copyright (c) 2014 Byron Mackay. All rights reserved.
//

import Foundation
import UIKit

public class ValidationRule {
    public var textField:UITextField
    public var errorLabel:UILabel?
    public var rules:[Rule] = []
    
    public init(textField: UITextField, rules:[Rule], errorLabel:UILabel?){
        self.textField = textField
        self.errorLabel = errorLabel
        self.rules = rules
    }
    
    public func validateField() -> ValidationError? {
        for rule in rules {
            var isValid:Bool = rule.validate(textField.text)
            if !isValid {
                return ValidationError(textField: self.textField, error: rule.errorMessage())
            }
        }
        return nil
    }
    
}