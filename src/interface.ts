interface Car {
  readonly company: string;
  color: string;
  year: number;
  model: string;

  drive(speed: number): void;
  stop(): void;
}

interface Peugeot extends Car {
  passengers: number;
}

let peugeot206: Peugeot;

peugeot206 = {
  company: "Iran Khodro",
  color: "white",
  year: 95,
  model: "206",
  passengers: 4,

  drive(speed: number) {
    console.log(`${this.model} Drive ${speed}Km/h`);
  },

  stop() {
    console.log(`${this.model} Stopped :))`);
  },
};

console.log(peugeot206.company); // read

class PeugeotPars implements Car {
  constructor(
    public company: string,
    public color: string,
    public year: number,
    public model: string
  ) {
    this.company = company;
    this.color = color;
    this.year = year;
    this.model = model;
  }

  drive(speed: number): void {
    console.log(`${this.model} Drive ${speed}Km/h`);
  }

  stop(): void {
    console.log(`${this.model} Stopped :))`);
  }
}

const PeugeotParsTU5 = new PeugeotPars(
  "Iran Khodro",
  "White",
  1402,
  "Pars Tu5"
);

// console.log(PeugeotParsTU5.drive(200));
