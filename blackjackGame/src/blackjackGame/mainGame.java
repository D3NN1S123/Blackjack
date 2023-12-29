package blackjackGame;

import java.util.Scanner;

public class mainGame {

	public static void main(String[] args) {

		Scanner input = new Scanner(System.in);
		
		
		String[] cards = {"Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"};
		
		int value = (int) Math.floor(Math.random()*13 +1);
		int sum = 0;
		int balance = 500;
		
		System.out.println("Hit or stand? ");
		
		String answer = input.nextLine();
		
		
		
		input.close();
		
	}

}
