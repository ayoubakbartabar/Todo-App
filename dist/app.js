class Person {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}
class Student extends Person {
    constructor(name, email, age, _lessons) {
        super(name, email, age);
        this._lessons = _lessons;
        this._lessons = _lessons;
        Student.counts++;
    }
    info() {
        return `${this.name} Infos (Student) :))`;
    }
    static getCounts() {
        return Student.counts;
    }
    get getLessons() {
        return this._lessons;
    }
    set setLessons(lesson) {
        this._lessons.push(lesson);
    }
}
// static score: number;
Student.counts = 0;
class Teacher extends Person {
    constructor(name, email, age, subject) {
        super(name, email, age);
        this.subject = subject;
        this.subject = subject;
    }
    info() {
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
//# sourceMappingURL=app.js.map