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
int type;
double x, y, z;

/*************************************************
 * Methods required by the WidgetPlugin protocol
/*************************************************/
// initWithWebView
//
// This method is called when the widget plugin is first loaded as the
// widget's web view is first initialized
-(id)initWithWebView:(WebView*)w
{
        NSLog(@"Entering -initWithWebView:%@", w);
        self = [super init];
		type = detect_sms();
       // srand(time(NULL));
        return self;
}

// windowScriptObjectAvailable
//
// This method gives you the object that you use to bridge between the
// Obj-C world and the JavaScript world.  Use setValue:forKey: to give
// the object the name it's refered to in the JavaScript side.
-(void)windowScriptObjectAvailable:(WebScriptObject*)wso
{
        NSLog(@"windowScriptObjectAvailable");
        [wso setValue:self forKey:@"UnimotionPlugin"];
}

// webScriptNameForSelector
//
// This method lets you offer friendly names for methods that normally
// get mangled when bridged into JavaScript.
+(NSString*)webScriptNameForSelector:(SEL)aSel
{
        NSString *retval = nil;
        NSLog(@"webScriptNameForSelector");
		
		if (aSel == @selector(refreshData)) {
		    retval = @"refreshData";
		} else if (aSel == @selector(readX)) {
		    retval = @"readX";		
		} else if (aSel == @selector(readY)) {
		    retval = @"readY";		
		} else if (aSel == @selector(readZ)) {
		    retval = @"readZ";					
		} else if (aSel == @selector(detectSms)) {
		    retval = @"detectSms";					
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
		if (aSel == @selector(refreshData)) {
		    return NO;
		} else if (aSel == @selector(readX)) {
		    return NO;
		} else if (aSel == @selector(readY)) {
		    return NO;
		} else if (aSel == @selector(readZ)) {
		    return NO;
		} else if (aSel == @selector(detectSms)) {
		    return NO;		
		} else {
		    return YES;
		}
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

-(double) readX {
	return x;
}

-(double) readY {
	return y;
}

-(double) readZ {
	return z;
}

-(void) refreshData {
	read_sms_real(type, &x, &y, &z);
}

-(int) detectSms {
	return detect_sms();
}

@end

