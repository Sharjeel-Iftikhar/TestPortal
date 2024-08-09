import React, { useState, useEffect } from 'react';

const QuizRecordTable = () => {
  // Dummy data
  const dummyQuizRecords = [
    {
      _id: '66b635691c695ce4c2a06f4d',
      quizId: '66b0b243b295199693ace992',
      userId: '66b5341f655afdf22539c7b8',
      userAnswers: [
        { questionId: '66b0b243b295199693ace993', userAnswer: 'Green', correctAnswer: 'Green', timeTaken: 2, isCorrect: true },
        { questionId: '66b0b243b295199693ace994', userAnswer: 'Blue', correctAnswer: 'Blue', timeTaken: 3, isCorrect: true },
        // Add more answers if needed
      ],
      totalTimeTaken: 36,
      score: 8,
      startTime: '2024-08-09T15:08:49.232+00:00',
      endTime: '2024-08-09T15:09:05.753+00:00',
    },
    // Add more quiz records for testing
  ];

  const dummyUsers = [
    {
      _id: '66b5341f655afdf22539c7b8',
      firstName: 'John',
      lastName: 'Doe',
    },
    // Add more users for testing
  ];

  const [quizRecords, setQuizRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');

  useEffect(() => {
    setQuizRecords(dummyQuizRecords);
    setUsers(dummyUsers);
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = quizRecords.filter(record => {
        const user = users.find(user => user._id === record.userId);
        return (
          (!firstNameFilter || (user && user.firstName.toLowerCase().includes(firstNameFilter.toLowerCase()))) &&
          (!lastNameFilter || (user && user.lastName.toLowerCase().includes(lastNameFilter.toLowerCase())))
        );
      });
      setFilteredRecords(filtered);
    };

    applyFilters();
  }, [firstNameFilter, lastNameFilter, quizRecords, users]);

  const calculateScores = (record) => {
    const categories = ['Data-Analysis', 'Generic', 'Inductive reasoning'];
    const categoryScores = categories.reduce((acc, category) => {
      acc[category] = record.userAnswers
        .filter(answer => answer.category === category && answer.isCorrect)
        .length;
      return acc;
    }, {});
    const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0);
    const totalQuestions = record.userAnswers.length;
    const percentage = (totalScore / totalQuestions) * 100;

    return { totalScore, categoryScores, percentage };
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">Total Score</th>
            <th className="p-2 text-left">Score - Data Analysis</th>
            <th className="p-2 text-left">Score - Generic</th>
            <th className="p-2 text-left">Score - Inductive Reasoning</th>
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
                className="p-1 border-b border-gray-300 rounded-md text-sm"
              />
            </td>
            <td className="p-2">
              <input
                type="text"
                placeholder="Filter"
                value={lastNameFilter}
                onChange={(e) => setLastNameFilter(e.target.value)}
                className="p-1 border-b border-gray-300 rounded-md text-sm"
              />
            </td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => {
            const user = users.find(user => user._id === record.userId);
            const { totalScore, categoryScores, percentage } = calculateScores(record);

            return (
              <tr key={record._id} className="border-b border-gray-200">
                <td className="p-2 text-center">{user?.firstName}</td>
                <td className="p-2 text-center">{user?.lastName}</td>
                <td className="p-2 text-center">
                  <div
                    style={{
                      backgroundColor: percentage >= 50 ? 'green' : 'red',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '5px',
                      textAlign: 'center'
                    }}
                  >
                    {percentage.toFixed(2)}% {totalScore}/{record.userAnswers.length}
                  </div>
                </td>
                <td className="p-2 text-center">{categoryScores['Data-Analysis'] || 0}</td>
                <td className="p-2 text-center">{categoryScores['Generic'] || 0}</td>
                <td className="p-2 text-center">{categoryScores['Inductive reasoning'] || 0}</td>
                <td className="p-2 text-center">{record.totalTimeTaken} seconds</td>
                <td className="p-2 text-center">{new Date(record.startTime).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuizRecordTable;
