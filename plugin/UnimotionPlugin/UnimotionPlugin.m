//
//  UnimotionPlugin.m
//  UnimotionPlugin
//
//  Created by Matt Haynes on 30/04/2009.
//  Copyright 2009 Matt Haynes. All rights reserved.
//

#import "UnimotionPlugin.h"
#include <unimotion.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

@implementation UnimotionPlugin

/*********************************************/
// Methods required by the WidgetPlugin protocol
/*********************************************/
// initWithWebView
//
// This method is called when the widget plugin is first loaded as the
// widget's web view is first initialized
-(id)initWithWebView:(WebView*)w
{
        //NSLog(@"Entering -initWithWebView:%@", w);
        self = [super init];
        srand(time(NULL));
        return self;
}

-(void)dealloc
{
        [super dealloc];
}

/*********************************************/
// Methods required by the WebScripting protocol
/*********************************************/
// windowScriptObjectAvailable
//
// This method gives you the object that you use to bridge between the
// Obj-C world and the JavaScript world.  Use setValue:forKey: to give
// the object the name it's refered to in the JavaScript side.
-(void)windowScriptObjectAvailable:(WebScriptObject*)wso
{
        //NSLog(@"windowScriptObjectAvailable");
        [wso setValue:self forKey:@"UnimotionPlugin"];
}

// webScriptNameForSelector
//
// This method lets you offer friendly names for methods that normally
// get mangled when bridged into JavaScript.
+(NSString*)webScriptNameForSelector:(SEL)aSel
{
        NSString *retval = nil;
        //NSLog(@"webScriptNameForSelector");
        if (aSel == @selector(getText)) {
                retval = @"getText";
        } else {
                NSLog(@"\tunknown selector");
        }
        return retval;
}

// isSelectorExcludedFromWebScript
//
// This method lets you filter which methods in your plugin are
// accessible to the JavaScript side.
+(BOOL)isSelectorExcludedFromWebScript:(SEL)aSel {
        if (aSel == @selector(getText)) {
                return NO;
        }
        return YES;
}

// isKeyExcludedFromWebScript
//
// Prevents direct key access from JavaScript.
+(BOOL)isKeyExcludedFromWebScript:(const char*)k {
        return YES;
}

/*********************************************/
// The actual methods used in this plugin, to be called by JavaScript and
// identified in isSelectorExcludedFromWebScript:.
/*********************************************/

// getText
//
// Returns the "Hello World!" text to the "MyPlugin" Widget.
- (NSString *) getText
{

	int type = detect_sms();
	char* name;
    switch ( type ) {
        case powerbook:
            name = "powerbook";
            break;
        case ibook:
            name = "ibook";
            break;
        case highrespb:
            name = "highrespb";
            break;
        case macbookpro:
            name = "macbookpro";
            break;
        default:
            name = "???";
            break;
	}
	
	return [NSString stringWithFormat: @"%s", name];
}

@end

