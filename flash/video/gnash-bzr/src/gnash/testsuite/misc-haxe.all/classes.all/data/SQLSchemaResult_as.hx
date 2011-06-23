// SQLSchemaResult_as.hx:  ActionScript 3 "SQLSchemaResult" class, for Gnash.
//
// Generated by gen-as3.sh on: 20090514 by "rob". Remove this
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
import flash.data.SQLSchemaResult;
import flash.display.MovieClip;
#else
import flash.SQLSchemaResult;
import flash.MovieClip;
#end
import flash.Lib;
import Type;

// import our testing API
import DejaGnu;

// Class must be named with the _as suffix, as that's the same name as the file.
class SQLSchemaResult_as {
    static function main() {
        var x1:SQLSchemaResult = new SQLSchemaResult();

        // Make sure we actually get a valid class        
        if (x1 != null) {
            DejaGnu.pass("SQLSchemaResult class exists");
        } else {
            DejaGnu.fail("SQLSchemaResult lass doesn't exist");
        }
// Tests to see if all the properties exist. All these do is test for
// existance of a property, and don't test the functionality at all. This
// is primarily useful only to test completeness of the API implementation.
	if (x1.indices == 0) {
	    DejaGnu.pass("SQLSchemaResult::indices property exists");
	} else {
	    DejaGnu.fail("SQLSchemaResult::indices property doesn't exist");
	}
	if (x1.tables == 0) {
	    DejaGnu.pass("SQLSchemaResult::tables property exists");
	} else {
	    DejaGnu.fail("SQLSchemaResult::tables property doesn't exist");
	}
	if (x1.triggers == 0) {
	    DejaGnu.pass("SQLSchemaResult::triggers property exists");
	} else {
	    DejaGnu.fail("SQLSchemaResult::triggers property doesn't exist");
	}
	if (x1.views == 0) {
	    DejaGnu.pass("SQLSchemaResult::views property exists");
	} else {
	    DejaGnu.fail("SQLSchemaResult::views property doesn't exist");
	}

// Tests to see if all the methods exist. All these do is test for
// existance of a method, and don't test the functionality at all. This
// is primarily useful only to test completeness of the API implementation.
	if (x1.SQLSchemaResult == 0) {
	    DejaGnu.pass("SQLSchemaResult::SQLSchemaResult() method exists");
	} else {
	    DejaGnu.fail("SQLSchemaResult::SQLSchemaResult() method doesn't exist");
	}

        // Call this after finishing all tests. It prints out the totals.
        DejaGnu.done();
    }
}

// local Variables:
// mode: C++
// indent-tabs-mode: t
// End:
