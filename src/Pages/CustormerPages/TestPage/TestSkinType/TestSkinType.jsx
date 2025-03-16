import React, { useState } from "react";
import "./TestSkinType.css"; // Import file CSS

function TestSkinType() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    oiliness: "",
    dryness: "",
    tZone: "",
    sensitivity: "",
    weatherImpact: "",
  });

  const handleOptionChange = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Câu trả lời đã chọn:", selectedAnswers);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Bài kiểm tra loại da</h1>
      <form onSubmit={handleSubmit}>
        {/* Câu hỏi 1 */}
        <div className="quiz-question">
          <p>
            Câu hỏi 1: Loại da của bạn có xu hướng đổ dầu nhiều trong ngày
            không?
          </p>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                name="oiliness"
                value="Có"
                checked={selectedAnswers.oiliness === "Có"}
                onChange={handleOptionChange}
              />
              Có
            </label>
            <label>
              <input
                type="radio"
                name="oiliness"
                value="Không"
                checked={selectedAnswers.oiliness === "Không"}
                onChange={handleOptionChange}
              />
              Không
            </label>
          </div>
        </div>

        {/* Câu hỏi 2 */}
        <div className="quiz-question">
          <p>Câu hỏi 2: Da bạn thường xuyên bị khô hoặc bong tróc không?</p>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                name="dryness"
                value="Có"
                checked={selectedAnswers.dryness === "Có"}
                onChange={handleOptionChange}
              />
              Có
            </label>
            <label>
              <input
                type="radio"
                name="dryness"
                value="Không"
                checked={selectedAnswers.dryness === "Không"}
                onChange={handleOptionChange}
              />
              Không
            </label>
          </div>
        </div>

        {/* Câu hỏi 3 */}
        <div className="quiz-question">
          <p>
            Câu hỏi 3: Bạn có thường cảm thấy da nhờn ở vùng chữ T (trán, mũi,
            cằm) không?
          </p>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                name="tZone"
                value="Có"
                checked={selectedAnswers.tZone === "Có"}
                onChange={handleOptionChange}
              />
              Có
            </label>
            <label>
              <input
                type="radio"
                name="tZone"
                value="Không"
                checked={selectedAnswers.tZone === "Không"}
                onChange={handleOptionChange}
              />
              Không
            </label>
          </div>
        </div>

        {/* Câu hỏi 4 */}
        <div className="quiz-question">
          <p>
            Câu hỏi 4: Bạn có thường bị kích ứng hoặc đỏ da khi dùng mỹ phẩm
            hoặc tiếp xúc với môi trường?
          </p>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                name="sensitivity"
                value="Có"
                checked={selectedAnswers.sensitivity === "Có"}
                onChange={handleOptionChange}
              />
              Có
            </label>
            <label>
              <input
                type="radio"
                name="sensitivity"
                value="Không"
                checked={selectedAnswers.sensitivity === "Không"}
                onChange={handleOptionChange}
              />
              Không
            </label>
          </div>
        </div>

        {/* Câu hỏi 5 */}
        <div className="quiz-question">
          <p>
            Câu hỏi 5: Bạn có cảm thấy da mình thay đổi tùy theo thời tiết hoặc
            môi trường không?
          </p>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                name="weatherImpact"
                value="Có"
                checked={selectedAnswers.weatherImpact === "Có"}
                onChange={handleOptionChange}
              />
              Có
            </label>
            <label>
              <input
                type="radio"
                name="weatherImpact"
                value="Không"
                checked={selectedAnswers.weatherImpact === "Không"}
                onChange={handleOptionChange}
              />
              Không
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Gửi câu trả lời
        </button>
      </form>
    </div>
  );
}

export default TestSkinType;
