import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'UNIX',
    description: 'dgscvyggcskuyheuhcjhskdcujhsd',
  },
  {
    id: 2,
    title: 'analyse de donner',
    description: 'Master the ezoijdiuecdjckjshf .',
  },
  // Add more courses here
];

const Course = () => {
  return (
    <div className="courses">
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <div className="course" key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/course/${course.id}`} className="btn-primary">View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;

