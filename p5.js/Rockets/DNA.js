function DNA(genes) {
	if (genes) {
		this.genes = genes;
	}
	// unless specified, genes is an array of random Vectors that control direction
	else {
		this.genes = [];
		for (let i = 0; i < lifespan; i++) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(maxForce);
		}
	}

	// returns a new DNA object with x amount of genes from partner 1,
	// and (len - x) amount of genes from partner 2
	this.crossover = function (partner) {
		var newGenes = [];
		var mid = floor(random(this.genes.length));
		for (var i = 0; i < this.genes.length; i++) {
			if (i > mid) {
				newGenes[i] = this.genes[i];
			} else {
				newGenes[i] = partner.genes[i];
			}
		}
		return new DNA(newGenes);
	};

    // We choose a mutation percentage. 
	this.mutation = function () {
		for (let i = 0; i < this.genes.length; i++) {
			if (random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxForce);
			}
		}
	};
}
