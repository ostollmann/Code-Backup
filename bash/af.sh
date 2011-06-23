af()
{
	if [ "$#" -eq 2 ]; then
		echo "hi"
		find / -iname "*$1*" 2> /dev/null | grep -v "$2"
	elif [ "$#" -eq 1 ]; then
		echo "hi2"
		find / -name "*$1*" 2> /dev/null | grep -v "denied"
	else
		echo "usage: f <TERM> <OPTIONS>"
	fi
}

