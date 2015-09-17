//
//  SettingsViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 4/30/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController {
    
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
    
    @IBAction func logoutButton(sender: UIButton) {
        GifterHelper.logout(GifterHelper.getStoredToken()!.value, completion: {(res)->Void in
            if res.statusCode == 204 {
                GifterHelper.removeStoredTokenAndCredentials()
                var storyboard = UIStoryboard(name: "Main", bundle: nil)
                var LoginVC: LoginViewController = storyboard.instantiateViewControllerWithIdentifier("LoginViewController") as! LoginViewController
                
                let appDelegate = (UIApplication.sharedApplication().delegate as! AppDelegate)
                appDelegate.window?.rootViewController = LoginVC
            } else {
                self.displayMessage("Warning!", message: "Unable to log you out!")
            }
        })
    }
    
}