interface Question {
    category: string;
    species: string;
    englishTitle: string;
    googleTranslate: string;
    title: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: string;
}

export default Question
