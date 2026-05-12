"use client";

const CoursesDetails = [
  {
    courseName: "first Aid",
    totalStudents:50,
    completed: 30,
    pending: 20,
  },
  {
    courseName: "OSHA 30 HR",
    totalStudents: 40,
    completed: 25,
    pending: 15,
  },
  {
    courseName: "ISO 14001",
    totalStudents: 30,
    completed: 20,
    pending: 10,
  },
  {
    courseName: "Quality Control",
    totalStudents: 35,
    completed: 25,
    pending: 10,
  },
   {
    courseName: "Quality Control",
    totalStudents: 35,
    completed: 25,
    pending: 10,
  },
   {
    courseName: "Quality Control",
    totalStudents: 35,
    completed: 25,
    pending: 10,
  },

];

export default function DashboardPage() {
  return (
    <div className="text-white p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CoursesDetails.map((course, index) => (
          <div className="bg-[#293038] h-55 p-4 rounded-xl items-center text-center flex flex-col justify-center" key={index}>
            <h3 className="text-[18px] md:text-[22px] font-semibold uppercase">{course.courseName}</h3>
            <p className="text-gray-400 md:text-lg">Total Students: {course.totalStudents}</p>
            <p className="text-green-400 md:text-lg">Completed: {course.completed}</p>
            <p className="text-yellow-400 md:text-lg">Pending: {course.pending}</p>
          </div>
        ))}
    </div>
  );
}
 