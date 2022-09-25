
interface CoursePartBase {
    name: string;
    exerciseCount:number;
}
interface CoursePartBase2  extends CoursePartBase{
    description:string

}
interface CoursePartFour extends CoursePartBase2 {
    name:"NewType";
}
interface CoursePartOne extends CoursePartBase2 {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartBase2 {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export interface Total {
    courseParts:CoursePart[]
}

export const courseParts : CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];