interface Lesson {
  id: number;
  lesson_time: string;
  name: string;
  teacher: string;
  subject: {
    name: string;
    level: string;
  };
  lesson_type: "Group" | "Individual";
  room: string;
  students: number;
}

export const data: Lesson[] = [
  {
    id: 1,
    lesson_time: "09:00 - 10:00",
    name: "Group 52",
    teacher: "Mr. Johnson",
    subject: {
      name: "General English",
      level: "Intermediate level",
    },
    lesson_type: "Group",
    room: "Room 2-3",
    students: 18,
  },
  {
    id: 2,
    lesson_time: "09:00 - 10:00",
    name: "Steve Hoover",
    teacher: "Mr. Johnson",
    subject: {
      name: "General English",
      level: "Intermediate level",
    },
    lesson_type: "Individual",
    room: "Room 2-3",
    students: 1,
  },
  {
    id: 3,
    lesson_time: "09:00 - 10:00",
    name: "Group 52",
    teacher: "Mr. Johnson",
    subject: {
      name: "General English",
      level: "Intermediate level",
    },
    lesson_type: "Group",
    room: "Room 2-3",
    students: 18,
  },
];
