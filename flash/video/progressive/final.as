/*
This work is licensed under the Creative Commons Attribution 3.0 United States License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/us/ or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
authored by R Blank (rblank.com)
*/

//**************************
//**IMPORTS
//**************************

//OSMF imports
import org.osmf.events.MediaPlayerCapabilityChangeEvent;
//import org.osmf.events.DimensionChangeEvent;
//import org.osmf.events.DurationChangeEvent;
//import org.osmf.events.PlayheadChangeEvent;
//import org.osmf.events.TraitEvent;

import org.osmf.events.DisplayObjectEvent ;
import org.osmf.events.TimeEvent ;

import org.osmf.media.MediaPlayer;
import org.osmf.media.URLResource;
import org.osmf.net.NetLoader;
import org.osmf.net.NetStreamCodes;
import org.osmf.video.VideoElement;
import org.osmf.utils.URL;

//Flash component imports
import fl.controls.Button;
import fl.controls.Slider;

//**************************************
//**VARIABLE DECLARATIONS
//**************************************

//the instance of the MediaPlayer class that will load and play, 
//and through which we will control, our video
var player:MediaPlayer;

//duration is a variable to store the duration from the loaded video
var duration:Number;

//mc_video is a sprite that we will use to hold our loaded video
var mc_video : Sprite ;

//**************************************
//**TIMELINE CODE
//**************************************

//call the init function to start our player
init( );


//**************************************
//**FUNCTION DECLARATIONS
//**************************************

/*
	init is called to start our video player
*/
function init( ) {
	//disable all controls on the stage, because no video has yet loaded
	disableControls( );
	//listen for the change event on the volume slider and call onVolumeSliderChange
	sl_volume.addEventListener( Event.CHANGE , onVolumeSliderChange );
	//listen for the mouse down event on the progress bar and call onProgressBarMouseDown
	mc_progressBar.addEventListener( MouseEvent.MOUSE_DOWN , onProgressBarMouseDown );
	//listen for the mouse click event on the pause button and call onBtnPauseClick
	btn_pause.addEventListener( MouseEvent.CLICK , onBtnPauseClick );
	//set the progress bar to have a hand-cursor so it looks like it can be clicked on
	mc_progressBar.buttonMode = true ;
	//listen for the mouse click on both 'kennedy' and 'The 1920s' buttons
	//and call onPlaylistBtnClick for both buttons
	btn_kennedy.addEventListener( MouseEvent.CLICK , onPlaylistBtnClick );
	btn_1920s.addEventListener( MouseEvent.CLICK , onPlaylistBtnClick );
	//create a new Sprite instance in mc_video to hold our loaded video
	mc_video = new Sprite ( ) ;
	//add mc_video to the stage
	addChild ( mc_video ) ;
	//create a new instance of the MediaPlayer and store it in player
	player = new MediaPlayer ( ) ;
	//set the player to play videos only once by default
	player.autoRewind=false;
}

/*
	seekVideo is called to jump to another part of our video
	with a percentage into the video to seek (e.g., 50% for half way)
*/
function seekVideo( seekTo : Number ):void {
	//if the player can see to the specified point
	if (player.canSeekTo(seekTo*duration))
		//tell the MediaPlayer instance to seek to the specified seconds into the video
		//by multiplying the seek percentage times the duration of the currently-loaded video
		player.seek( seekTo * duration );
}

/*
	updateProgressBar is called to update the visual status of the progress bar
	so the nub and current position indicators remain accurate as the video plays
*/
function updateProgressBar( percentIn : Number ):void {
	//set the x position of the progress nub
	//and the width of the current position indicator
	//to the product of the progress bar background 
	//and the percentIn (passed in when this function is called)
	mc_progressBar.mc_nub.x = mc_progressBar.mc_currentPosition.width = Math.floor(percentIn*mc_progressBar.mc_bg.width);
}

/*
	cleanUpVideo is called to 'clean up' after a video
	when the currently-loaded video has completed
*/
function cleanUpVideo( ):void {
	//disable the GUI controls
	disableControls( );
	//clear out the currently-loaded video
	clearVideo( );
}

/*
	clearVideo is called to clear out the source and listeners from the MediaPlayer instance
	We do this to 'reset' the player so it can be cleanly reused, and so that
	we do not hear events when we have not planned to (when we think there is no video loaded)
*/
function clearVideo( ):void {
	//if our video holder sprite exists
	if ( mc_video ) 
	{
		//remove that sprite from the stage
		removeChild ( mc_video ) ;
		//set the mc_video reference to null so it can be easily reused
		mc_video = null ;
	}
	//stop listening for changes in viewability
	player.removeEventListener( MediaPlayerCapabilityChangeEvent.CAN_PLAY_CHANGE, onViewable );
	//stop listening for when our video ends
	player.removeEventListener( TimeEvent.COMPLETE, onDurationReached);
	//stop listening for when the dimensions of the video change, or become known
	player.removeEventListener( DisplayObjectEvent.MEDIA_SIZE_CHANGE, onDimensionChange );

	//stop listening for when the duration of the video changes, or becomes known
	player.removeEventListener( TimeEvent.DURATION_CHANGE, onDurationChange );
	
	
	
	//stop listening for playhead updates
	player.removeEventListener( TimeEvent.CURRENT_TIME_CHANGE , onPlayheadChange );
	//remove the element reference to the source video from the MediaPlayer instance
	player.media=undefined;
}

/*
	disableControls is called to disable all GUI video controls
*/
function disableControls( ):void {
	//disable the pause button
	btn_pause.enabled=false;
	//disable the volume slider
	sl_volume.enabled=false;
	//disable the progress bar from hearing mouse events
	mc_progressBar.mouseEnabled=false;
	//make the progress bar look disabled, by appearing at 50% alpha
	mc_progressBar.alpha=.5;
}

/*
	playVideo is called with a specific video to play
	This function
*/
function playVideo( videoToPlay : String ):void {
	//call cleanUpVideo to clear out the video, in case one 
	//is currently loaded, and to reset the navigation to a disabled state
	cleanUpVideo( );
	//create a new sprite into which to hold the player view
	mc_video = new Sprite ( ) ;
	//add mc_video to the display list
	addChild ( mc_video ) ;
	//listen for changes in viewability on the MediaPlayer instance and call onViewable
	player.addEventListener( MediaPlayerCapabilityChangeEvent.CAN_PLAY_CHANGE, onViewable );
	//listen for when the video loaded into the MediaPlayer instance ends and call onDurationReached
	player.addEventListener( TimeEvent.COMPLETE, onDurationReached);
	//listen for when the loaded video dimensions change, or become known, 
	//and call onDimensionChange
	player.addEventListener( DisplayObjectEvent.MEDIA_SIZE_CHANGE, onDimensionChange );

	//listen for when the loaded video duration changes, or becomes known, 
	//and call onDimensionChange
	player.addEventListener( TimeEvent.DURATION_CHANGE, onDurationChange );

	

	//set the element of the MediaPlayer instance
	//as a new VideoElement with the url of 'videoToPlay' passed into this function
	player.media = new VideoElement( new NetLoader(), new URLResource( new URL ( videoToPlay ) ) );
}

/*
	activateProgressBar is called when it's time for our progress bar 
	to start working (i.e., when the video is loaded, playing and visible)
*/
function activateProgressBar( ):void {
	//reset the x position of the nub, and the width of the current position indicator, to 0
	mc_progressBar.mc_nub.x = mc_progressBar.mc_currentPosition.width = 0;
	//start listening for playhead changes on the video and call onPlayheadChange
	player.addEventListener( TimeEvent.CURRENT_TIME_CHANGE , onPlayheadChange );
	//set the progress bar to hear mouse events
	mc_progressBar.mouseEnabled = true ;
	//set the progress bar to full alpha, so it looks visible
	mc_progressBar.alpha=1;
}


//**************************************
//**OSMF EVENT CALLBACK FUNCTIONS
//**************************************

/*
	onViewable is called when the viewability of our player (when the video can 
	be seen by humans) changes
*/
function onViewable( evt : MediaPlayerCapabilityChangeEvent ):void {
	//if the source is viewable
	if (evt.enabled) {
		//set the pause button label to 'pause'
		btn_pause.label="Pause";
		//enable the pause button
		btn_pause.enabled=true;
	}
}

/*
	onDimensionChange is called when the dimensions (width and height) 
	of the loaded media change (or become known)
*/
function onDimensionChange( evt : DisplayObjectEvent ):void {
	//set the width of the video display to the newly detected width
	player.displayObject.width=evt.newWidth;
	//set the height of the video display to the newly detected height
	player.displayObject.height=evt.newHeight;
	//enable the volume slider
	sl_volume.enabled=true;
	//center the video holder horizontally and vertically
	//with respect to the mc_videoDisplay movieclip on our stage
	mc_video.y = mc_videoDisplay.y + ( mc_videoDisplay.height - evt.newHeight ) / 2 ;
	mc_video.x = mc_videoDisplay.x + ( mc_videoDisplay.width - evt.newWidth ) / 2 ;
	//add the player view (our video) to our stage, so it can be seen by humans
	mc_video.addChild( player.displayObject );
}

/*
	onDurationChange is called when the duration of the loaded media changes (or becomes known)
*/
function onDurationChange( evt : TimeEvent ):void {
	//trap the newly detected duration in a variable called duration (declared above)
	duration=evt.time;
	//activate the progress bar
	activateProgressBar( );
}

/*
	onPlayheadChange is called when there is a playhead update in our loaded video
	(i.e., when the frame changes)
*/
function onPlayheadChange( evt : TimeEvent ):void {
	//call updateProgressBar with the percentage calculated from the ratio
	//of the current position in the video to the total duration of the video
	updateProgressBar( evt.time / duration );
}

/*
	onDurationReached is called when the loaded video ends
*/
function onDurationReached( evt : TimeEvent ):void {
	//call cleanUpVideo to clean up our now-completed video
	cleanUpVideo( );
}


//**************************************
//**STANDARD EVENT CALLBACK FUNCTIONS
//**************************************

/*
	onPlaylistBtnClick is called when one of our playlist buttons
	(labeled 'Kennedy' and 'The 1920's') is clicked by the user
*/
function onPlaylistBtnClick( evt : MouseEvent ):void {
	//if the instance name of the clicked button is 'btn_kennedy'
	if (evt.target.name=="btn_kennedy") {
		//call playVideo with the path to the kennedy video
		playVideo( "../media/kennedy.flv" );
	//if the instance name of the clicked button is 'btn_1920s'
	} else if ( evt.target.name == "btn_1920s" ) {
		//call playVideo with the path to the Apollo 11 video
		playVideo( "../media/apollo11.flv" );
	}
}

/*
	onBtnPauseClick is called when the user clicks the pause button
*/
function onBtnPauseClick( evt : MouseEvent ):void {
	//if the video is currently paused
	if (player.paused) {
		//play the video
		player.play( );
		//change the label on the play/pause button to 'Pause'
		btn_pause.label="Pause";
	} else {
		//pause the video
		player.pause( );
		//change the label on the play/pause button to 'Play'
		btn_pause.label="Play";
	}
}


/*
	onProgressBarMouseDown is called when the user mouses down on the progress bar
*/
function onProgressBarMouseDown( evt : MouseEvent ):void {
	//calculate the percentage into our video the user wishes to seek
	//based on where in the progressbar they clicked
	var seekTo : Number = ( evt.localX / mc_progressBar.mc_bg.width );
	//call seek video with that percentage
	seekVideo( seekTo );
}

/*
	onVolumeSliderChange is called when the current value of the 
	volume slider changes (when the user clicks, moves the slider, and releases)
*/
function onVolumeSliderChange( evt : Event ):void {
	//update the volume of the video to the selected value of the slider
	player.volume=evt.target.value;
}


