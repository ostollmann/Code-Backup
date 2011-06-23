package com.ost.oic.main;

/**
 * Created by IntelliJ IDEA.
 * User: ost
 * Date: Nov 29, 2010
 * Time: 12:28:16 AM
 */

public class MountainBike implements Bicycle{

	private final int minGear = 1;
	private final int maxGear = 24;

	private final int minSpeed = 0;
	private final int maxSpeed = 50;

	private int gear;
	private int speed;
	private boolean brakes;

	public MountainBike() {
		gear = 1;
		speed = 0;
		brakes = true;
	}

	public MountainBike(int gear, int speed, boolean brakes) {

		this.gear = gear;
		this.speed = speed;
		this.brakes = brakes;
	}

	public void setGear(int gear) {
		if(gear <= maxGear && gear >= minGear) {
			this.gear = gear;
		}
	}

	public void increaseGear() {
		if(gear+1 <= maxGear && gear+1 >= minGear) {
			gear++;
		}
	}

	public void decreaseGear() {
		if(gear-1 <= maxGear && gear-1 >= minGear) {
			gear--;
		}
	}

	public void setSpeed(int speed) {
		if(speed <= maxSpeed && speed >= minSpeed && brakes == false) {
			this.speed = speed;
		}
	}

	public void increaseSpeed() {
		if(speed+1 <= maxSpeed && speed+1 >= minSpeed && brakes == false) {
			speed++;
		}
	}

	public void decreaseSpeed() {
		if(speed-1 <= maxSpeed && speed-1 >= minSpeed && brakes == false) {
			speed--;
		}
	}

	public void applyBrakes() {
		brakes = true;
		speed = 0;
	}

	public void releaseBrakes() {
		brakes = false;
	}

	@Override
	public String toString() {
		return "MountainBike{" +
				"gear=" + gear +
				", speed=" + speed +
				", brakes=" + brakes +
				'}';
	}
}
