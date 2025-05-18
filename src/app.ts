abstract class Person {
  constructor(
    public name: string,
    readonly email: string,
    protected age: number
  ) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  abstract info(): string;
}

class Student extends Person {
  // static score: number;
  private static counts: number = 0;

  constructor(
    name: string,
    email: string,
    age: number,
    private _lessons: string[]
  ) {
    super(name, email, age);
    this._lessons = _lessons;
    Student.counts++;
  }

  info(): string {
    return `${this.name} Infos (Student) :))`;
  }

  public static getCounts() {
    return Student.counts;
  }

  get getLessons() {
    return this._lessons;
  }

  set setLessons(lesson) {
    this._lessons.push(lesson);
  }
}

class Teacher extends Person {
  constructor(
    name: string,
    email: string,
    age: number,
    public subject: string
  ) {
    super(name, email, age);
    this.subject = subject;
  }

  info(): string {
    return `${this.name} Infos (Teacher) :))`;
  }
}

const aliStudent = new Student("Ali", "ali@gmail.com", 23, ["Math"]);
const amirStudent = new Student("Amir", "amir@gmail.com", 21, ["Math"]);
const aminStudent = new Student("Amin", "amin@gmail.com", 22, ["Math"]);

const qadirTeacher = new Teacher("Qadir", "Qadir@gmail.com", 21, "Security");

// const aliPerson = new Person()

// console.log(aliStudent.score);
// console.log(Student.getCounts());
console.log(aminStudent.info());
console.log(qadirTeacher.info());
