#!/bin/sh
#
#   Copyright (C) 2009, 2010 Free Software Foundation, Inc.
#
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with this program; if not, write to the Free Software
#   Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
#

# This script generates header file and C++ source file templates
# for an ActionScript class. It depends on the doc/C/NOTES file for
# data. It takes a single argument, which is the name of the class,
# like "./gen-files.sh Camera".
#
# This script is only of use to developers, so it's "as is". Your
# mileage may vary.

if test x"$1" = "x"; then
    echo "Usage: $0 <classname>" >&2
    exit 1
fi

# Top level path
# Add some newlines to make sed;ing and greping easier.
nspace="`basename $PWD`"
class="`basename $1 | sed -e 's:.html::'`"
sed -e "s/<tr/\n<tr/g" $1 > tmp.html
dos2unix -q tmp.html
# extract the properties from the web page
rm props.tmp
grep -v "hideInheritedProperty" tmp.html | sed -e '/th colspan=.*Property/,/th colspan=.*Method/w props.tmp' > /dev/null
properties="`grep signatureLink props.tmp | sed -e 's:<div class="summaryTableDescription.*::' -e 's:^.*signatureLink\">::' -e 's:<.*\">:_:' -e 's:<.*::'`"

# extract the methods from the web page
rm methods.tmp
grep -v "hideInheritedMethod" tmp.html | sed -e '/th colspan=.*Method/,/th colspan=.*Event/w methods.tmp' > /dev/null
allmethods="`grep signatureLink methods.tmp | sed  -e 's:<div class="summaryTableDescription.*::' -e 's:^.*signatureLink\">::' -e 's:<.*\">:_:' -e 's:<.*::'`"
			 
# extract the methods from the web page
# events="`sed -e '1,/eventDetail/ d' -e '/(propertyDetail|Property Detail)/,$d' tmp.html | grep "detailHeaderName" | sed -e 's:^.*detailHeaderName">::' -e 's:<.*::'  | tr -s '\n' ' '`"

# ignore the package-detail files
if test x"${class}" = x"package-detail" -o x"${class}" = x"package"; then
  exit
fi

#
# split up the list of data in pairs into an array so we can have a crude
# association between the porterty and the data type it returns.
#
i=0
for item in $properties; do
  name="`echo $item | cut -d '_' -f 1`"
  type="`echo $item | cut -d '_' -f 2`"
  pargs[$i]="$type"
  props[$i]="$name"
  i=`eval expr $i + 1`
done
	 
# display what we found
echo "Class: $class"
i=0
props_blanks=`echo $props | tr -d ' '`
echo -n "    Properties: "
if test  x"$props_blanks" != x; then
  for item in $properties; do
    echo -n " \"${props[$i]}\" \"${pargs[$i]}\","
    i=`eval expr $i + 1`
  done
else
  echo "none"	
fi
echo ""

#
# split up the list of data in pairs into an array so we can have a crude
# association between the porterty and the data type it returns.
#
i=0
for item in $allmethods; do
  name="`echo $item | cut -d '_' -f 1`"
  type="`echo $item | cut -d '_' -f 2`"
  margs[$i]="$type"
  methods[$i]="$name"
  i=`eval expr $i + 1`
done

# display what we found
i=0
meth_blanks=`echo $allmethods | tr -d ' '`
echo -n "    Methods: "
if test  x"$meth_blanks" != x; then
  for item in $allmethods; do
    echo -n " \"${methods[$i]}\" \"${margs[$i]}\","
    i=`eval expr $i + 1`
  done
else
  echo "none"	
fi
echo ""

#
# We're done making lists of things, do some real work.
#
asname=${class}
lowname=`echo ${asname} | tr '[A-Z]' '[a-z]'`
upname=`echo ${asname}  | tr '[a-z]' '[A-Z]'`
outname=${asname}_as3.hx

if test -f ${outname}; then
    echo ${outname} exists!
    mv -f ${outname} ${outname}.orig
#    exit 1;
fi

###############################################################
# Start by generating the header file for this class
#
now=`date "+%Y%m%d"`
rm -f ${outname}
cat <<EOF>${outname}
// ${outname}:  ActionScript 3 "${asname}" class, for Gnash.
//
// Generated by gen-as3.sh on: ${now} by "${USER}". Remove this
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
import flash.${nspace}.${asname};
import flash.display.MovieClip;
#else
import flash.${asname};
import flash.MovieClip;
#end
import flash.Lib;
import Type;

// import our testing API
import DejaGnu;

// Class must be named with the _as3 suffix, as that's the same name as the file.
class ${asname}_as3 {
    static function main() {
        var x1:${asname} = new ${asname}();

        // Make sure we actually get a valid class        
        if (x1 != null) {
            DejaGnu.pass("${asname} class exists");
        } else {
            DejaGnu.fail("${asname} class doesn't exist");
        }
EOF


if test  x"$props_blanks" != x; then
    cat <<EOF>>${outname}
// Tests to see if all the properties exist. All these do is test for
// existance of a property, and don't test the functionality at all. This
// is primarily useful only to test completeness of the API implementation.
EOF
fi

# Add tests to see if all the properties exist
i=0
j=0
if test  x"$props_blanks" != x; then
    for item in $properties; do
	name=${props[$i]}
	type=${pargs[$i]}
	case "${type}" in
   	    "Number") result=0 ;;
   	    "int") result=0 ;;
 	    "String") result="null" ;;
 	    "Boolean") result=false ;;
 	    "Array") result=0 ;;
	    *) result=${type} ;;
	esac
#	echo "PROPS[$i]: ${name} : ${type}"
 	lines[$j]="	if (x1.${name} == $result) {"
 	j=`eval expr $j + 1`
  	lines[$j]="	    DejaGnu.pass(\"${asname}.${name} property exists\");"
  	j=`eval expr $j + 1`
  	lines[$j]="	} else {"
  	j=`eval expr $j + 1`
  	lines[$j]="	    DejaGnu.fail(\"${asname}.${name} property doesn't exist\");"
  	j=`eval expr $j + 1`
  	lines[$j]="	}"
  	j=`eval expr $j + 1`
  	lines[$j]=""
  	i=`eval expr $i + 1`
    done
else
    echo "none"	
fi

k=0
while test $k -le $j; do
    echo "${lines[$k]}" >> ${outname}
    k=`eval expr $k + 1`
done

if test  x"$meth_blanks" != x; then
    cat <<EOF>>${outname}
// Tests to see if all the methods exist. All these do is test for
// existance of a method, and don't test the functionality at all. This
// is primarily useful only to test completeness of the API implementation.
EOF
fi

# Add tests to see if all the methods exist
i=0
j=0
if test  x"$props_blanks" != x; then
    for item in $allmethods; do
	name=${methods[$i]}
	type=${margs[$i]}
	case "${type}" in
   	    "Number") result=0 ;;
   	    "uint") result=0 ;;
   	    "int") result=0 ;;
 	    "String") result="null" ;;
 	    "Boolean") result=false ;;
 	    "void") result=null ;;
 	    "Array") result=0 ;;
	    *) result=${type} ;;
	esac
#	echo "PROPS[$i]: ${name} : ${type}"
 	lines[$j]="	if (x1.${name} == $result) {"
 	j=`eval expr $j + 1`
  	lines[$j]="	    DejaGnu.pass(\"${asname}::${name}() method exists\");"
  	j=`eval expr $j + 1`
  	lines[$j]="	} else {"
  	j=`eval expr $j + 1`
  	lines[$j]="	    DejaGnu.fail(\"${asname}::${name}() method doesn't exist\");"
  	j=`eval expr $j + 1`
  	lines[$j]="	}"
  	j=`eval expr $j + 1`
  	lines[$j]=""
  	i=`eval expr $i + 1`
    done
else
    echo "none"	
fi

k=0
while test $k -le $j; do
    echo "${lines[$k]}" >> ${outname}
    k=`eval expr $k + 1`
done





cat <<EOF>>${outname}
        // Call this after finishing all tests. It prints out the totals.
        DejaGnu.done();
    }
}

// local Variables:
// mode: C++
// indent-tabs-mode: t
// End:

EOF

# cleanup after ourselves
rm -f tmp.html
rm -f *.tmp