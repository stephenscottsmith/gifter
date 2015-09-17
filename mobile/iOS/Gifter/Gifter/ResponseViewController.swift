//
//  ResponseViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/6/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class ResponseViewController: UIViewController {
    @IBOutlet weak var usernameLabel: UILabel!
    var username = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.usernameLabel.text = self.username
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func acceptFriendRequestButton(sender: UIButton) {
        GifterHelper.acceptFriendRequest(self.username, completion: {(res) in
            if res["statusCode"] as! Int == 200 {
                self.dismissViewControllerAnimated(true, completion: nil)
            } else {
                self.displayMessage("Failed Friend Request", message: "Try again!")
            }
        })
    }

    @IBAction func denyFriendRequestButton(sender: UIButton) {
        GifterHelper.deleteFriendRequest(self.username, completion: {(res) in
            if res["statusCode"] as! Int == 200 {
                self.dismissViewControllerAnimated(true, completion: nil)
            } else {
                self.displayMessage("Failed to Cancel Friend Request", message: "Try again!")
            }
        })
    }
    
    @IBAction func goBackToRequestsButton(sender: UIButton) {
        self.dismissViewControllerAnimated(true, completion: nil)
    }
    
    func displayMessage (header: String, message: String) -> Void {
        var alert = UIAlertController(title: header, message: message, preferredStyle: UIAlertControllerStyle.Alert)
        alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default, handler: nil))
        self.presentViewController(alert, animated: true, completion: nil)
    }
    
}
