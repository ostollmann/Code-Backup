
SPATH=/
GREP=" 2> /dev/null "
while getopts ":ahe:i:" opt; do
	case $opt in

		# only search home directory
		h)
			#echo "-h will search only the home directory" >&2
			SPATCH=$HOME
			;;

		# show all results (ie. don't hide permission denied files)
		a)
			#echo "-a: will show all results" >&2
			A=true		
			;;

		# exclude certain results
		e)
			#echo "-e: will exclude all results that contain: $OPTARG" >&2
			exclude=$OPTARG
			GREP="$GREP| grep -v $exclude "			
			;;
		
		# include only certain results
		i)
			#echo "-i: will include only results that contain: $OPTARG" >&2
			include=$OPTARG
			GREP="$GREP | grep $include "
			;;

		\?)
			echo "Invalid option: -$OPTARG" >&2
			;;
	esac
done


NUMOFVARS=$#;
SEARCHTERM=${!NUMOFVARS}
CMD="find $SPATH -iname '*$SEARCHTERM$' $GREP"
echo $CMD
$CMD
#CMD="find $SPATH -iname '*$1*' 2> /dev/null | grep -v"

