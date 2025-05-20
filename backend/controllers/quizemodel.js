const Quiz = require('./../models/quizemodel');

const createQuiz = async (req, res) => {

    try {
        const { courseId, course } = req.body;
        const quiz = await Quiz.create({ courseId, course });
        res.s(201).json(quiz)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }

}

const getQuiz = async (req, res) => {
    try {
        const { id } = req.params()
        const quiz = await Quiz.findOne({ id });
        if (!quiz) {
            return res.status(404).json({ message: "quiz not found" })
        }
        res.json(quiz)

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

const submitquiz = async (req, res) => {
    try {
        const { courseId, answers } = req.body;

        // Fetch the quiz by courseId
        const quiz = await Quiz.findOne({ courseId });

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let score = 0;

        // Iterate over quiz questions and compare submitted answers
        quiz.questions.forEach((question, index) => {
            // Compare the user's answer with the correct answer
            if (answers[index] === question.correctAnswer) {
                score += 1;
            }
        });

        // Respond with the score and success message
        res.status(200).json({
            message: "Quiz submitted successfully",
            score: score, // Return the score to the client
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};

const getQuizs = async (req, res) => {
    try {
        const { courseId } = req.params;
        const quizzes = await Quiz.find({ courseId });

        if (!quizzes.length) {
            return res.status(404).json({ message: 'No quizzes found for this course' });
        }
        console.log(quizzes)
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



module.exports = { createQuiz, getQuiz, submitquiz, getQuizs }