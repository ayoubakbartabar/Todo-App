let peugeot206;
peugeot206 = {
    company: "Iran Khodro",
    color: "white",
    year: 95,
    model: "206",
    passengers: 4,
    drive(speed) {
        console.log(`${this.model} Drive ${speed}Km/h`);
    },
    stop() {
        console.log(`${this.model} Stopped :))`);
    },
};
console.log(peugeot206.company); // read
class PeugeotPars {
    constructor(company, color, year, model) {
        this.company = company;
        this.color = color;
        this.year = year;
        this.model = model;
        this.company = company;
        this.color = color;
        this.year = year;
        this.model = model;
    }
    drive(speed) {
        console.log(`${this.model} Drive ${speed}Km/h`);
    }
    stop() {
        console.log(`${this.model} Stopped :))`);
    }
}
const PeugeotParsTU5 = new PeugeotPars("Iran Khodro", "White", 1402, "Pars Tu5");
// console.log(PeugeotParsTU5.drive(200));
//# sourceMappingURL=interface.js.map