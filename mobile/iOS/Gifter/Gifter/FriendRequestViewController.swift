//
//  FriendRequestViewController.swift
//  Gifter
//
//  Created by Stephen Smith on 5/6/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit

class FriendRequestViewController: UIViewController {
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    
    var username = ""
    var name = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.usernameLabel.text = self.username
        self.nameLabel.text = self.name
        // Do any additional setup after loading the view.
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
    
    @IBAction func cancelButton(sender: UIButton) {
        self.dismissViewControllerAnimated(true, completion: nil)
    }
    
    @IBAction func friendRequestButton(sender: UIButton) {
        GifterHelper.friendRequestUser(self.username, completion: {(res) in
            if res["statusCode"] as! Int == 200 {
                self.displayMessage("Friend Request", message: res["message"] as! String)
            } else {
                self.displayMessage("Friend Request", message: "Friend request unsuccessful! Try again.")
            }
        })
    }
}
