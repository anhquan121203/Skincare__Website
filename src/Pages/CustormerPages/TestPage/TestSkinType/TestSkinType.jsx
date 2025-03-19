import { useState } from "react";
import "./TestSkinType.css"; // Import file CSS
import useSkinQuestion from "../../../../Hooks/useSkinQuestion";
import useSkinAnswer from "../../../../Hooks/useSkinAnswer";

function TestSkinType() {
  const { skinQuestion, loading, error } = useSkinQuestion();
  const { skinAnswer } = useSkinAnswer();

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [resultSkin, setResultSkin] = useState(null);

  const activeSkinQuestions = skinQuestion.filter(
    (item) => item.skinQuestionStatus === "Active"
  );

  const getAnswerForQuestion = (questionId) => {
    return skinAnswer.filter((answer) => answer.questionId === questionId);
  };

  const handleAnswerSelect = (questionId, skinTypeId) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionId]: skinTypeId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAnswer || Object.keys(selectedAnswer).length === 0) {
      setResultSkin("Vui lòng chọn ít nhất một đáp án!");
      return;
    }

    // Tìm xem answer xuất hiện bn lần - use forEach(vòng lặp)
    const skinTypeCount = {};
    Object.values(selectedAnswer).forEach((skinTypeId) => {
      skinTypeCount[skinTypeId] = (skinTypeCount[skinTypeId] || 0) + 1;
    });

    // so sánh giá trị và đưa ra skintype Name
    const mostCommonSkinType = Object.keys(skinTypeCount).reduce((a, b) =>
      skinTypeCount[a] > skinTypeCount[b] ? a : b
    );

    // Lấy tên loại da tương ứng
    const skinTypeName = skinAnswer.find(
      (answer) => answer.skinTypeId == mostCommonSkinType
    )?.skinTypeName;

    setResultSkin(skinTypeName || "Không xác định");
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Bài kiểm tra loại da</h1>
      <form onSubmit={handleSubmit}>
        {/* Câu hỏi 1 */}
        {activeSkinQuestions.map((question) => (
          <div className="quiz-question" key={question.id}>
            <p style={{fontWeight: "bold"}}>{question.id}. {question.questionText}</p>
            {getAnswerForQuestion(question.id).map((answer) => (
              <div className="quiz-options" key={answer.id}>
                <label className="test-answer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={answer.skinTypeId}
                    checked={selectedAnswer[question.id] === answer.skinTypeId}
                    onChange={() =>
                      handleAnswerSelect(question.id, answer.skinTypeId)
                    }
                  />
                  <p>{answer.answerText}</p>
                </label>
              </div>
            ))}
          </div>
        ))}

        <button type="submit" className="submit-button">
          Gửi câu trả lời
        </button>
      </form>

      {resultSkin && (
        <div className="quiz-result">
          <h2>Kết quả loại da: {resultSkin}</h2>
        </div>
      )}
    </div>
  );
}

export default TestSkinType;
