const myName = 'Marlon';
const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(12, 13);

class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const marlon = new Persona(46, 'Marlon Antonio');
marlon.getSummary();
