//
//  LoginViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 4/26/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
   
    @IBOutlet weak var usernameField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func displayMessage (header: String, message: String) -> Void {
        var alert = UIAlertController(title: header, message: message, preferredStyle: UIAlertControllerStyle.Alert)
        alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default, handler: nil))
        self.presentViewController(alert, animated: true, completion: nil)
    }

    @IBAction func loginButton(sender: UIButton) {
        GifterHelper.login(usernameField.text,password: passwordField.text, completion: {(res)->Void in
            let statusCode = res["statusCode"] as! Int
            
            if statusCode == 201 {
                GifterHelper.storeToken(res["token"] as! String)
                var storyboard = UIStoryboard(name: "Main", bundle: nil)
                var TabBarController: UITabBarController = storyboard.instantiateViewControllerWithIdentifier("UITabBarController") as! UITabBarController
                
                let appDelegate = (UIApplication.sharedApplication().delegate as! AppDelegate)
                appDelegate.window?.rootViewController = TabBarController
            } else {
                if let mes = res["reason"] as? String {
                    self.displayMessage("Failed login!", message: mes)
                } else if let mes = res["message"] as? String {
                    self.displayMessage("Failed login!", message: mes)
                }
                
            }
        })
    }
}