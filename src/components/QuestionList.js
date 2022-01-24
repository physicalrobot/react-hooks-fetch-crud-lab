


import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  //load question list using questions in data base 

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  console.log(questions)

  //create a 'delete' button function

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }


  //Patches the databse with a change in answer to represent user input. 

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }




  //send props from 'questions' data to QuestionItem component. Also send over the delete function. 
  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));





  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;



// import React, { useEffect, useState } from "react";
// import QuestionItem from "./QuestionItem";

// function QuestionList() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/questions")
//       .then((r) => r.json())
//       .then((questions) => {
//         setQuestions(questions);
//       });
//   }, []);


//   function handleDeleteClick(id) {
//     fetch(`http://localhost:4000/questions/${id}`, {
//       method: "DELETE",
//     })
//       .then((r) => r.json())
//       .then(() => {
//         const updatedQuestions = questions.filter((q) => q.id !== id);
//         setQuestions(updatedQuestions);
//       });
//   }

//   const questionItems = questions.map((q) => (
//     <QuestionItem
//       key={q.id}
//       question={q}
//       onDeleteClick={handleDeleteClick}
//     />
//   ));


//   return (
//     <section>
//       <h1>Quiz Questions</h1>
//       <ul><QuestionItem onDeleteClick={handleDeleteClick} /></ul>
//     </section>
//   );
// }

// export default QuestionList;




