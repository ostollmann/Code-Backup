package com.ost.oic.main;

/**
 * Created by IntelliJ IDEA.
 * User: ost
 * Date: Nov 29, 2010
 * Time: 12:24:49 AM
 * To change this template use File | Settings | File Templates.
 */
interface Bicycle {

	void setGear(int gear);
	void increaseGear();
	void decreaseGear();

	void setSpeed(int speed);
	void increaseSpeed();
	void decreaseSpeed();

	void applyBrakes();
	void releaseBrakes();
}
