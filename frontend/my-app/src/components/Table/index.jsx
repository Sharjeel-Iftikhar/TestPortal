import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const QuizRecordTable = () => {
  const [quizRecords, setQuizRecords] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch quiz records from the API
  const fetchQuizRecords = async () => {
    try {
      const response = await fetch("http://localhost:3000/exam/quizRecord", {
        
        headers: {
          "Content-Type": "application/json",
          
          'Authorization': `Bearer ${token}` // Add the Bearer token here
        },
      });
      const data = await response.json();
      setQuizRecords(data);
      console.log(data);
    } catch (err) {
      setError('Failed to fetch quiz records.');
    } finally {
      setLoading(false);
    }
  };


  const fetchQuiz = async () => {
    try {
      const response = await fetch("http://localhost:3000/exam/quiz", {
        
        headers: {
          "Content-Type": "application/json",
          
          'Authorization': `Bearer ${token}` // Add the Bearer token here
        },
      });
      const data = await response.json();
      setQuiz(data);
      console.log("quiz data has been fetched");
      console.log(data);
    } catch (err) {
      setError('Failed to fetch quiz records.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/get", {
        
        headers: {
          "Content-Type": "application/json",
          
          'Authorization': `Bearer ${token}` // Add the Bearer token here
        },
      }); // Replace with your API endpoint
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchQuizRecords(), fetchQuiz(), fetchUsers()]);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = quizRecords.filter(record => {
        const user = users.find(user => user._id === record.userId);
        console.log(user);
        return (
          (!firstNameFilter || (user && user.Firstname.toLowerCase().includes(firstNameFilter.toLowerCase()))) &&
          (!lastNameFilter || (user && user.Lastname.toLowerCase().includes(lastNameFilter.toLowerCase())))
        );
      });
      setFilteredRecords(filtered);
    };

    applyFilters();
  }, [firstNameFilter, lastNameFilter, quizRecords, users]);

  const calculateScores = (record, quizData) => {
    if (!quizData || !quizData.questions) {
      return { categoryScores: {}, percentage: 0 };
    }
    const categories = ['Data-Analysis', 'Generic', 'Inductive Reasoning'];
  
    // Map the categories to the userAnswers
    const categoryScores = categories.reduce((acc, category) => {
      const correctAnswers = record.userAnswers.filter(answer => {
        const question = quizData.questions.find(q => q._id === answer.questionId);
        return question && question.category === category && answer.isCorrect;
      }).length;

      const totalQuestions = quizData.questions.filter(q => q.category === category).length;
      
      acc[category] = {
        correctAnswers,
        totalQuestions,
        percentage: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
      };

      return acc;
    }, {});
  
    const totalQuestions = record.userAnswers.length;
    const percentage = (record.score / totalQuestions) * 100;
  
    return { categoryScores, percentage };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!quiz.length || !quizRecords.length || !users.length) {
    return <p>Data is incomplete. Please wait...</p>;
  }

  return (
    <>
    
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">Total Score</th>
            <th className="p-2 text-left">Score - Data <br/>  Analysis</th>
            <th className="p-2 text-left">Score - Generic</th>
            <th className="p-2 text-left">Score - <br/> Inductive Reasoning</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Start Date</th>
          </tr>
          <tr className="bg-gray-200 border-b border-gray-300">
            <td className="p-2">
              <input
                type="text"
                placeholder="Filter"
                value={firstNameFilter}
                onChange={(e) => setFirstNameFilter(e.target.value)}
                className="p-1 border-b border-gray-300 rounded-md text-sm w-[80%]"
              />
            </td>
            <td className="p-2">
              <input
                type="text"
                placeholder="Filter"
                value={lastNameFilter}
                onChange={(e) => setLastNameFilter(e.target.value)}
                className="p-1 border-b border-gray-300 rounded-md text-sm w-[80%]"
              />
            </td>
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3"></td>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => {
            const quizData = quiz.find(q => q._id === record.quizId);
            const user = users.find(user => user._id === record.userId);
            const { categoryScores, percentage } = calculateScores(record, quizData);

            return (
              <tr key={record._id} className="border-b border-gray-200">
                <td className="p-2 text-start w-[12%]">{user?.Firstname}</td>
                <td className="p-2 text-start w-[12%]">{user?.Lastname}</td>
                <td className="p-2 text-start w-[12%]">
                  <div
                    style={{
                      backgroundColor: percentage >= 50 ? 'green' : 'red',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '5px',
                      textAlign: 'center'
                    }}
                  >
                    {percentage.toFixed(2)}% {record.score}/{record.userAnswers.length}
                  </div>
                </td>
                {['Data-Analysis', 'Generic', 'Inductive Reasoning'].map((category) => (
                  <td key={category} className="p-2 text-center">
                    <div
                      style={{
                        backgroundColor: 'lightgray',
                        color: categoryScores[category].percentage >= 50 ? 'green' : 'red',
                        padding: '5px',
                        borderRadius: '5px',
                        textAlign: 'center',
                        width: category === 'Inductive Reasoning' ? '65%' : category === 'Generic' ? '80%' : '100%',
                        margin: '0 auto'
                      }}
                    >
                      {categoryScores[category].percentage.toFixed(0)}% 
                      {` ${categoryScores[category].correctAnswers}/${categoryScores[category].totalQuestions}`}
                    </div>
                  </td>
                ))}
                <td className="p-2 text-center">
                  {`${String(Math.floor(record.totalTimeTaken / 60)).padStart(2, '0')}:${String(record.totalTimeTaken % 60).padStart(2, '0')}`}
                </td>
                <td className="p-2 text-center">{new Date(record.startTime).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default QuizRecordTable;
