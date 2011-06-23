// BrowserInvokeEvent_as.hx:  ActionScript 3 "BrowserInvokeEvent" class, for Gnash.
//
// Generated by gen-as3.sh on: 20090515 by "rob". Remove this
// after any hand editing loosing changes.
//
//   Copyright (C) 2009, 2010 Free Software Foundation, Inc.
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//

// This test case must be processed by CPP before compiling to include the
//  DejaGnu.hx header file for the testing framework support.

#if flash9
import flash.events.BrowserInvokeEvent;
import flash.display.MovieClip;
#end
import flash.Lib;
import Type;

// import our testing API
import DejaGnu;

// Class must be named with the _as suffix, as that's the same name as the file.
class BrowserInvokeEvent_as {
    static function main() {
        #if !flash9
			DejaGnu.note("this class did not exist in AS2");
		#end
		
		#if !flash
		var x1:BrowserInvokeEvent = new BrowserInvokeEvent();

        // Make sure we actually get a valid class        
        if (x1 != null) {
            DejaGnu.pass("BrowserInvokeEvent class exists");
        } else {
            DejaGnu.fail("BrowserInvokeEvent class doesn't exist");
        }
// Tests to see if all the properties exist. All these do is test for
// existance of a property, and don't test the functionality at all. This
// is primarily useful only to test completeness of the API implementation.
	if (x1.arguments == 0) {
	    DejaGnu.pass("BrowserInvokeEvent.arguments property exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent.arguments property doesn't exist");
	}
	if (x1.isHTTPS == false) {
	    DejaGnu.pass("BrowserInvokeEvent.isHTTPS property exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent.isHTTPS property doesn't exist");
	}
	if (x1.isUserEvent == false) {
	    DejaGnu.pass("BrowserInvokeEvent.isUserEvent property exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent.isUserEvent property doesn't exist");
	}
	if (x1.sandboxType == null) {
	    DejaGnu.pass("BrowserInvokeEvent.sandboxType property exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent.sandboxType property doesn't exist");
	}
	if (x1.securityDomain == null) {
	    DejaGnu.pass("BrowserInvokeEvent.securityDomain property exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent.securityDomain property doesn't exist");
	}

// Tests to see if all the methods exist. All these do is test for
// existance of a method, and don't test the functionality at all. This
// is primarily useful only to test completeness of the API implementation.
	if (x1.BrowserInvokeEvent == false) {
	    DejaGnu.pass("BrowserInvokeEvent::BrowserInvokeEvent() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::BrowserInvokeEvent() method doesn't exist");
	}
	if (x1.clone == Event) {
	    DejaGnu.pass("BrowserInvokeEvent::clone() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::clone() method doesn't exist");
	}
	if (x1.ACTIVATE == null) {
	    DejaGnu.pass("BrowserInvokeEvent::ACTIVATE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::ACTIVATE() method doesn't exist");
	}
	if (x1.ADDED == null) {
	    DejaGnu.pass("BrowserInvokeEvent::ADDED() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::ADDED() method doesn't exist");
	}
	if (x1.ADDED == TO) {
	    DejaGnu.pass("BrowserInvokeEvent::ADDED() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::ADDED() method doesn't exist");
	}
	if (x1.BROWSER == INVOKE) {
	    DejaGnu.pass("BrowserInvokeEvent::BROWSER() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::BROWSER() method doesn't exist");
	}
	if (x1.CANCEL == null) {
	    DejaGnu.pass("BrowserInvokeEvent::CANCEL() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::CANCEL() method doesn't exist");
	}
	if (x1.CHANGE == null) {
	    DejaGnu.pass("BrowserInvokeEvent::CHANGE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::CHANGE() method doesn't exist");
	}
	if (x1.CLOSE == null) {
	    DejaGnu.pass("BrowserInvokeEvent::CLOSE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::CLOSE() method doesn't exist");
	}
	if (x1.CLOSING == null) {
	    DejaGnu.pass("BrowserInvokeEvent::CLOSING() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::CLOSING() method doesn't exist");
	}
	if (x1.COMPLETE == null) {
	    DejaGnu.pass("BrowserInvokeEvent::COMPLETE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::COMPLETE() method doesn't exist");
	}
	if (x1.CONNECT == null) {
	    DejaGnu.pass("BrowserInvokeEvent::CONNECT() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::CONNECT() method doesn't exist");
	}
	if (x1.DEACTIVATE == null) {
	    DejaGnu.pass("BrowserInvokeEvent::DEACTIVATE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::DEACTIVATE() method doesn't exist");
	}
	if (x1.DISPLAYING == null) {
	    DejaGnu.pass("BrowserInvokeEvent::DISPLAYING() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::DISPLAYING() method doesn't exist");
	}
	if (x1.ENTER == FRAME) {
	    DejaGnu.pass("BrowserInvokeEvent::ENTER() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::ENTER() method doesn't exist");
	}
	if (x1.EXITING == null) {
	    DejaGnu.pass("BrowserInvokeEvent::EXITING() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::EXITING() method doesn't exist");
	}
	if (x1.FULLSCREEN == null) {
	    DejaGnu.pass("BrowserInvokeEvent::FULLSCREEN() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::FULLSCREEN() method doesn't exist");
	}
	if (x1.HTML == BOUNDS) {
	    DejaGnu.pass("BrowserInvokeEvent::HTML() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::HTML() method doesn't exist");
	}
	if (x1.HTML == DOM) {
	    DejaGnu.pass("BrowserInvokeEvent::HTML() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::HTML() method doesn't exist");
	}
	if (x1.HTML == RENDER) {
	    DejaGnu.pass("BrowserInvokeEvent::HTML() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::HTML() method doesn't exist");
	}
	if (x1.ID3 == null) {
	    DejaGnu.pass("BrowserInvokeEvent::ID3() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::ID3() method doesn't exist");
	}
	if (x1.INIT == null) {
	    DejaGnu.pass("BrowserInvokeEvent::INIT() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::INIT() method doesn't exist");
	}
	if (x1.LOCATION == CHANGE) {
	    DejaGnu.pass("BrowserInvokeEvent::LOCATION() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::LOCATION() method doesn't exist");
	}
	if (x1.MOUSE == LEAVE) {
	    DejaGnu.pass("BrowserInvokeEvent::MOUSE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::MOUSE() method doesn't exist");
	}
	if (x1.NETWORK == CHANGE) {
	    DejaGnu.pass("BrowserInvokeEvent::NETWORK() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::NETWORK() method doesn't exist");
	}
	if (x1.OPEN == null) {
	    DejaGnu.pass("BrowserInvokeEvent::OPEN() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::OPEN() method doesn't exist");
	}
	if (x1.REMOVED == null) {
	    DejaGnu.pass("BrowserInvokeEvent::REMOVED() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::REMOVED() method doesn't exist");
	}
	if (x1.REMOVED == FROM) {
	    DejaGnu.pass("BrowserInvokeEvent::REMOVED() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::REMOVED() method doesn't exist");
	}
	if (x1.RENDER == null) {
	    DejaGnu.pass("BrowserInvokeEvent::RENDER() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::RENDER() method doesn't exist");
	}
	if (x1.RESIZE == null) {
	    DejaGnu.pass("BrowserInvokeEvent::RESIZE() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::RESIZE() method doesn't exist");
	}
	if (x1.SCROLL == null) {
	    DejaGnu.pass("BrowserInvokeEvent::SCROLL() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::SCROLL() method doesn't exist");
	}
	if (x1.SELECT == null) {
	    DejaGnu.pass("BrowserInvokeEvent::SELECT() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::SELECT() method doesn't exist");
	}
	if (x1.SOUND == COMPLETE) {
	    DejaGnu.pass("BrowserInvokeEvent::SOUND() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::SOUND() method doesn't exist");
	}
	if (x1.TAB == CHILDREN) {
	    DejaGnu.pass("BrowserInvokeEvent::TAB() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::TAB() method doesn't exist");
	}
	if (x1.TAB == ENABLED) {
	    DejaGnu.pass("BrowserInvokeEvent::TAB() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::TAB() method doesn't exist");
	}
	if (x1.TAB == INDEX) {
	    DejaGnu.pass("BrowserInvokeEvent::TAB() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::TAB() method doesn't exist");
	}
	if (x1.UNLOAD == null) {
	    DejaGnu.pass("BrowserInvokeEvent::UNLOAD() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::UNLOAD() method doesn't exist");
	}
	if (x1.USER == IDLE) {
	    DejaGnu.pass("BrowserInvokeEvent::USER() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::USER() method doesn't exist");
	}
	if (x1.USER == PRESENT) {
	    DejaGnu.pass("BrowserInvokeEvent::USER() method exists");
	} else {
	    DejaGnu.fail("BrowserInvokeEvent::USER() method doesn't exist");
	}
	#end
        // Call this after finishing all tests. It prints out the totals.
        DejaGnu.done();
    }
}

// local Variables:
// mode: C++
// indent-tabs-mode: t
// End:
