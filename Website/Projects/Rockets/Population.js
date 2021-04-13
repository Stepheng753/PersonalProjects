function Population() {
	this.rockets = [];
	this.matingPool = [];

    // Creates random array of Rockets with random direction Vectors
	for (let i = 0; i < popsize; i++) {
		this.rockets[i] = new Rocket();
	}


	this.evaluate = function () {
        // Determines the fitness of each Rocket based on how close it is to the target
        // Also finds the max fitness
        var maxFit = 0;
		for (let i = 0; i < popsize; i++) {
			this.rockets[i].calcFitness();
			if (this.rockets[i].fitness > maxFit) {
				maxFit = this.rockets[i].fitness;
			}
        }
        
        // Normalizes the fitnesses based on the max fitness
		for (let i = 0; i < popsize; i++) {
			this.rockets[i].fitness /= maxFit;
        }
        
        // Makes a mating pool, where the higher the fitness, the bigger chance of being chosen
		this.matingPool = [];
		for (let i = 0; i < popsize; i++) {
			var n = this.rockets[i].fitness * 100;
			for (let j = 0; j < n; j++) {
				this.matingPool.push(this.rockets[i]);
			}
		}
	};

    // Chooses 2 random DNA from 2 parents in the mating pool
    // Crossovers the DNA, and applies the child DNA to a new Rocket
    // Then finally makes the new Rockets with the child DNA the current Rocket Array
	this.selection = function () {
		var newRockets = [];
		for (let i = 0; i < this.rockets.length; i++) {
			var parentA = random(this.matingPool).dna;
			var parentB = random(this.matingPool).dna;
			var child = parentA.crossover(parentB);
			child.mutation();
			newRockets[i] = new Rocket(child);
		}
		this.rockets = newRockets;
	};

    // Updates the pos, vec, and acc, then shows the Rocket
	this.run = function () {
		for (let i = 0; i < popsize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	};
}
