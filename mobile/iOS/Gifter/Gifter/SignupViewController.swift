//
//  SignupViewController.swift
//  
//
//  Created by Stephen Smith on 4/26/15.
//
//

import UIKit
import SwiftyJSON

class SignupViewController : UIViewController {
    
    @IBOutlet weak var firstNameField: UITextField!
    @IBOutlet weak var lastNameField: UITextField!
    @IBOutlet weak var usernameField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    @IBOutlet weak var confirmPasswordField: UITextField!
    @IBOutlet weak var countryCodeField: UITextField!
    @IBOutlet weak var phoneNumberField: UITextField!
    @IBOutlet weak var birthDateField: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.\
        
        var tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: "DismissKeyboard")
        view.addGestureRecognizer(tap)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func dismissSignupModal(sender: UIButton) {
        self.dismissViewControllerAnimated(true, completion: {});
    }
    
    func displayMessage (header: String, message: String) -> Void {
        var alert = UIAlertController(title: header, message: message, preferredStyle: UIAlertControllerStyle.Alert)
        alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default, handler: nil))
        self.presentViewController(alert, animated: true, completion: nil)
    }
    
    func getUser () -> [String : String] {
        return [
            "first_name": firstNameField.text!,
            "last_name": lastNameField.text!,
            "username": usernameField.text!,
            "password": passwordField.text!,
            "confirm_password": confirmPasswordField.text!,
            "country_code": countryCodeField.text!,
            "phone_number": phoneNumberField.text!,
            "birth_date": birthDateField.text!
        ]
    }
    
    @IBAction func signupButton(sender: UIButton) {
        var user = self.getUser()
        
        GifterHelper.signup(user, completion: { (res) in
            if res["statusCode"] as! Int == 200 {
                GifterHelper.login(user["username"]!, password: user["password"]!, completion: {(res) in
                    var mes = res["message"] as! String
                    self.displayMessage("Welcome to Gifter!", message: mes)

                    if res["statusCode"] as! Int == 201 {
                        var storyboard = UIStoryboard(name: "Main", bundle: nil)
                        var TabBarController: UITabBarController = storyboard.instantiateViewControllerWithIdentifier("UITabBarController") as! UITabBarController
                        
                        let appDelegate = (UIApplication.sharedApplication().delegate as! AppDelegate)
                        appDelegate.window?.rootViewController = TabBarController
                        
                        GifterHelper.storeCredentials(user["username"]!, password: user["password"]!)
                        GifterHelper.storeToken(res["token"] as! String)
                    } else {
                        self.displayMessage("Failed to login!", message:mes)
                    }
                })
            } else {
                self.displayMessage("Failed Signup!", message: res["reason"] as! String)
            }
        })
    }
    
    
    
    func DismissKeyboard(){
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    @IBAction func textFieldDidBeginEditing(textField: UITextField) {
        animateViewMoving(true, moveValue: 100)
    }
    
    @IBAction func textFieldDidEndEditing(textField: UITextField) {
        animateViewMoving(false, moveValue: 100)
    }
    
    func animateViewMoving (up:Bool, moveValue :CGFloat){
        var movementDuration:NSTimeInterval = 0.3
        var movement:CGFloat = ( up ? -moveValue : moveValue)
        UIView.beginAnimations( "animateView", context: nil)
        UIView.setAnimationBeginsFromCurrentState(true)
        UIView.setAnimationDuration(movementDuration )
        self.view.frame = CGRectOffset(self.view.frame, 0,  movement)
        UIView.commitAnimations()
    }
}
