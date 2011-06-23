// Enigma.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include <iostream>


double AverageScore(int Step)
{
	int i;
	double Score = 0;

	if (Step == 0)
		return 0;

	for (i = 0; i < Step; i++)
		Score += Step + AverageScore(i);

	return Score / Step;
}

// Simulate the game Trials times and take the average.

double RandomPushes(int Trials)
{
	int i;
	double Total = 0;

	for (i = 0; i < Trials; i++)
	{
		int Step = 9, Score = 0;

		while (Step > 0)
		{
			Score += Step;
			Step = rand() % Step;
		}
		Total += Score;
	}

	return Total / Trials;
}

int _tmain(int argc, _TCHAR* argv[])
{
	printf("Average score using recursive function: %f\n", AverageScore(9));
	printf("Average score using 1,000,000 random kicks: %f\n", RandomPushes(10000000000000));
	char i;
	std::cin >> i;
	return 0;
}

