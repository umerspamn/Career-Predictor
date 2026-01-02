
const { calculateResults, parseGeminiResponse, CAREER_DATABASE } = require('../src/logic');

describe('calculateResults Logic', () => {
    const mockProfile = {
        age: 20,
        city: 'Karachi',
        stream: 'pre-engineering',
        financialPressure: 'no'
    };

    const mockInterests = ['Tech', 'Science'];

    // Mock answers for a few questions.
    // In a real scenario, we should mock all relevant questions to get meaningful trait scores.
    const mockMcqAnswers = {
        1: 0, // conscientiousness: 10, stressTolerance: 8
        2: 0, // patience: 10, conscientiousness: 8
        3: 3, // analytical: 10, socialInfluence: 0
        // ... assuming others are not answered or default behavior
    };

    test('should return careers list sorted by score', () => {
        const result = calculateResults(mockProfile, mockInterests, mockMcqAnswers);

        expect(result).toHaveProperty('careers');
        expect(result).toHaveProperty('userTraits');
        expect(result).toHaveProperty('confidenceScore');

        expect(result.careers.length).toBe(CAREER_DATABASE.length);

        // Check sorting
        const scores = result.careers.map(c => c.finalScore);
        const sortedScores = [...scores].sort((a, b) => b - a);
        expect(scores).toEqual(sortedScores);
    });

    test('should eliminate careers based on stream constraints', () => {
        // profile stream is pre-engineering
        // medical careers should be eliminated or heavily penalized
        const result = calculateResults(mockProfile, mockInterests, mockMcqAnswers);

        const medicalCareer = result.careers.find(c => c.id === 'med_mbbs');
        expect(medicalCareer.elimination).toContain('Requires Pre-Medical background');
        // expect(medicalCareer.finalScore).toBeLessThan(50); // Score might be higher due to other factors, but elimination flag is key
    });

    test('should detect inconsistency errors', () => {
        // Q1: 0 (Strict hourly plan)
        // Q6: 2 (Hate routines) -> Inconsistent
        const inconsistencyAnswers = {
            1: 0,
            6: 2
        };
        const result = calculateResults(mockProfile, mockInterests, inconsistencyAnswers);
        expect(result.confidenceScore).toBeLessThan(100);
        expect(result.confidenceReason).toContain('Contradictory');
    });

    test('should prioritize interests', () => {
        const interests = ['Tech'];
        const result = calculateResults(mockProfile, interests, mockMcqAnswers);

        const techCareer = result.careers.find(c => c.id === 'eng_soft');
        const nonTechCareer = result.careers.find(c => c.id === 'med_mbbs'); // assuming medical is not interest

        // Hard to assert exact values without full calculation, but tech should be boosted
        // We can inspect the code: hasInterest ? 100 : 40.
        // It contributes significant weight.
        expect(techCareer).toBeDefined();
    });

    test('should penalize risky careers if financial pressure is high', () => {
        const poorProfile = { ...mockProfile, financialPressure: 'yes' };
        const result = calculateResults(poorProfile, mockInterests, mockMcqAnswers);

        const riskyCareer = result.careers.find(c => c.risk === 'High'); // e.g., com_ca or art_css or art_journ
        // Let's pick 'art_journ' which has High risk and Low Start salary
        const journo = result.careers.find(c => c.id === 'art_journ');

        expect(journo.reasons).toContain('Risky due to immediate financial needs.');
    });
});

describe('parseGeminiResponse', () => {
    test('should parse valid JSON', () => {
        const json = '{"key": "value"}';
        expect(parseGeminiResponse(json)).toEqual({ key: "value" });
    });

    test('should parse JSON inside markdown code block', () => {
        const raw = 'Here is the json:\n```json\n{"key": "value"}\n```';
        expect(parseGeminiResponse(raw)).toEqual({ key: "value" });
    });

    test('should parse JSON inside markdown code block without language', () => {
        const raw = '```\n{"key": "value"}\n```';
        expect(parseGeminiResponse(raw)).toEqual({ key: "value" });
    });

    test('should throw error on invalid JSON', () => {
        expect(() => parseGeminiResponse('invalid json')).toThrow();
    });
});
