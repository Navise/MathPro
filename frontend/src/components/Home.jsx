import React from 'react';
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate("/studentdashboard");
  };

  const handleTeacherClick = () => {
    navigate("/teacherdashboard");
  };

  return (
    <div className="h-screen flex flex-col">

      <nav className="bg-gray-800 text-white p-4 w-full">
        <h1 className="text-2xl font-bold text-center md:text-left">
          Department of Mathematics
        </h1>
      </nav>


      <div
        className="bg-cover bg-center flex-grow flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/mathbg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white p-8 md:p-20 rounded-xl shadow-lg w-11/12 sm:w-10/12 md:w-4/6 lg:w-2/5 max-w-2xl">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">

            <button
              onClick={handleStudentClick}
              className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-lg text-lg md:text-xl flex items-center w-full md:w-auto"
            >
              <PiStudentFill className="text-2xl md:text-3xl mr-2" />
              Student
            </button>


            <button
              onClick={handleTeacherClick}
              className="bg-green-500 hover:bg-green-900 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-lg text-lg md:text-xl flex items-center w-full md:w-auto"
            >
              <FaChalkboardTeacher className="text-2xl md:text-3xl mr-2" />
              Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
