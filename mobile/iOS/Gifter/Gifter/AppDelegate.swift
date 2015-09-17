//
//  AppDelegate.swift
//  Gifter
//
//  Created by Stephen Smith on 2/9/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import UIKit


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        applicationDidFinishLaunching(application)

        return true
    }

    func displayLoginView() -> Void {
        var storyboard = UIStoryboard(name: "Main", bundle: nil)
        var LoginVC: LoginViewController = storyboard.instantiateViewControllerWithIdentifier("LoginViewController") as! LoginViewController
        
        let appDelegate = (UIApplication.sharedApplication().delegate as! AppDelegate)
        appDelegate.window?.rootViewController = LoginVC
    }
    
    func applicationDidFinishLaunching(application: UIApplication) {
        let defaults = NSUserDefaults.standardUserDefaults()
        
        if let token = GifterHelper.getStoredToken() {
            if token.exists {
                println("TOKEN EXISTS: \(token)")
                GifterHelper.validateStoredToken(token.value, completion: { (res) in
                    if res["statusCode"] as! Int != 200 {
                        defaults.removeObjectForKey("token")
                        self.displayLoginView()
                    }
                })
            } else {
                println("NO TOKEN")
                if let creds = GifterHelper.userHasStoredCredentials() {
                    if creds.exists {
                        GifterHelper.login(creds.username, password: creds.password, completion: {(res) in
                            if res["statusCode"] as! Int != 200 {
                                defaults.removeObjectForKey("username")
                                defaults.removeObjectForKey("password")
                                self.displayLoginView()
                            } else {
                                defaults.setValue(creds.username, forKey: "username")
                                defaults.setValue(creds.password, forKey: "password")
                            }
                        })
                    }  else {
                        println("NO CREDS")
                        self.displayLoginView()
                    }
                }
            }
        }
    }

    func applicationWillResignActive(application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}

