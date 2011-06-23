package com.ost.oic.main;

/**
 * Created by IntelliJ IDEA.
 * User: ost
 * Date: Nov 28, 2010
 * Time: 9:18:29 PM
 */

public class main {

	private static MountainBike mb;

	public static void main(String[] args) throws Exception {
		mb = new MountainBike();
		mb.releaseBrakes();
		mb.increaseSpeed();
		mb.increaseSpeed();
		mb.increaseSpeed();
		print();
		mb.decreaseSpeed();
		print();
		mb.increaseGear();
		print();
		mb.decreaseGear();
		print();
		mb.applyBrakes();
		print();
	}

	public static void print() {
		System.out.println(mb.toString());		
	}

}
