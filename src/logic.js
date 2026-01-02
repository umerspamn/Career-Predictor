
// --- DATA CONSTANTS ---
const TRAITS = ['analytical', 'creativity', 'socialInfluence', 'conscientiousness', 'riskTolerance', 'stressTolerance', 'leadership', 'patience'];

const CAREER_DATABASE = [
    { id: 'med_mbbs', title: 'MBBS Doctor', stream: ['pre-medical'], demand: 85, traits: { empathy: 90, stressTolerance: 90, patience: 95, conscientiousness: 90 }, risk: 'Medium', salary: 'High (Late)' },
    { id: 'med_bds', title: 'Dentist (BDS)', stream: ['pre-medical'], demand: 80, traits: { creativity: 60, patience: 80, conscientiousness: 85 }, risk: 'Low', salary: 'High' },
    { id: 'med_pharm', title: 'Pharmacist', stream: ['pre-medical'], demand: 75, traits: { conscientiousness: 90, analytical: 70, patience: 70 }, risk: 'Low', salary: 'Medium' },
    { id: 'med_physio', title: 'Physiotherapist', stream: ['pre-medical'], demand: 70, traits: { empathy: 85, socialInfluence: 60, patience: 80 }, risk: 'Low', salary: 'Medium' },
    { id: 'med_psych', title: 'Clinical Psychologist', stream: ['pre-medical', 'arts'], demand: 65, traits: { empathy: 95, analytical: 60, patience: 90 }, risk: 'Medium', salary: 'Medium' },
    { id: 'eng_soft', title: 'Software Engineer', stream: ['pre-engineering', 'ics'], demand: 98, traits: { analytical: 90, creativity: 60, conscientiousness: 60, patience: 70 }, risk: 'Low', salary: 'High' },
    { id: 'eng_data', title: 'Data Scientist', stream: ['pre-engineering', 'ics'], demand: 95, traits: { analytical: 95, patience: 80, creativity: 50 }, risk: 'Low', salary: 'High' },
    { id: 'eng_civil', title: 'Civil Engineer', stream: ['pre-engineering'], demand: 75, traits: { stressTolerance: 80, leadership: 70, conscientiousness: 80 }, risk: 'Medium', salary: 'Medium' },
    { id: 'eng_mech', title: 'Mechanical Engineer', stream: ['pre-engineering'], demand: 70, traits: { analytical: 85, conscientiousness: 75, stressTolerance: 70 }, risk: 'Medium', salary: 'Medium' },
    { id: 'eng_cyber', title: 'Cyber Security Analyst', stream: ['pre-engineering', 'ics'], demand: 92, traits: { analytical: 90, riskTolerance: 40, conscientiousness: 85 }, risk: 'Low', salary: 'High' },
    { id: 'com_ca', title: 'Chartered Accountant (CA)', stream: ['commerce', 'pre-engineering', 'pre-medical'], demand: 90, traits: { conscientiousness: 98, analytical: 85, patience: 90, stressTolerance: 85 }, risk: 'High', salary: 'Elite' },
    { id: 'com_acca', title: 'ACCA Professional', stream: ['commerce', 'ics', 'pre-engineering'], demand: 85, traits: { conscientiousness: 90, analytical: 80, socialInfluence: 50 }, risk: 'Medium', salary: 'High' },
    { id: 'com_fin', title: 'Financial Analyst / CFA', stream: ['commerce', 'pre-engineering'], demand: 80, traits: { analytical: 90, riskTolerance: 60, stressTolerance: 70 }, risk: 'Medium', salary: 'High' },
    { id: 'com_mkt', title: 'Marketing Manager', stream: ['commerce', 'arts', 'ics'], demand: 85, traits: { creativity: 85, socialInfluence: 95, leadership: 70 }, risk: 'Medium', salary: 'Medium' },
    { id: 'com_hr', title: 'HR Manager', stream: ['commerce', 'arts'], demand: 75, traits: { socialInfluence: 90, empathy: 80, leadership: 70 }, risk: 'Low', salary: 'Medium' },
    { id: 'art_css', title: 'CSS Officer (Civil Service)', stream: ['any'], demand: 100, traits: { leadership: 90, stressTolerance: 85, socialInfluence: 80, analytical: 70 }, risk: 'High', salary: 'Stable' },
    { id: 'art_law', title: 'Lawyer / Advocate', stream: ['arts', 'commerce', 'pre-engineering'], demand: 75, traits: { analytical: 85, socialInfluence: 90, stressTolerance: 80 }, risk: 'Medium', salary: 'Volatile' },
    { id: 'art_journ', title: 'Journalist / Media', stream: ['arts', 'ics'], demand: 60, traits: { socialInfluence: 85, riskTolerance: 70, creativity: 70 }, risk: 'High', salary: 'Low Start' },
    { id: 'art_design', title: 'Graphic/UI UX Designer', stream: ['ics', 'arts', 'pre-engineering'], demand: 88, traits: { creativity: 95, patience: 70, analytical: 50 }, risk: 'Low', salary: 'High' },
    { id: 'voc_amazon', title: 'E-commerce Specialist (Amazon)', stream: ['any'], demand: 90, traits: { riskTolerance: 80, analytical: 70, conscientiousness: 75 }, risk: 'Medium', salary: 'Volatile' },
    { id: 'voc_freelance', title: 'Digital Freelancer', stream: ['any'], demand: 85, traits: { conscientiousness: 85, riskTolerance: 70, creativity: 60 }, risk: 'Medium', salary: 'Volatile' }
];

const QUESTION_BANK = [
    { id: 1, text: "A project deadline is changed to tomorrow morning. You have a lot left to do. You:", options: [{ text: "Make a strict hourly plan and execute it without sleep.", scores: { conscientiousness: 10, stressTolerance: 8 } }, { text: "Call teammates to divide the work immediately.", scores: { leadership: 10, socialInfluence: 8 } }, { text: "Panic slightly, then try to finish the critical parts only.", scores: { stressTolerance: 3, analytical: 5 } }, { text: "Look for a shortcut or extension request.", scores: { riskTolerance: 8, conscientiousness: 2 } }] },
    { id: 2, text: "You are learning a new difficult skill (e.g., coding or a new language). It's frustrating.", options: [{ text: "I push through for hours until I solve it.", scores: { patience: 10, conscientiousness: 8 } }, { text: "I look for a creative workaround or different method.", scores: { creativity: 10, analytical: 5 } }, { text: "I ask a mentor or friend to explain it to me.", scores: { socialInfluence: 8, patience: 4 } }, { text: "I switch to something else and come back later.", scores: { patience: 2, riskTolerance: 5 } }] },
    { id: 3, text: "Career Choice Risk: You are offered two jobs.", options: [{ text: "Job A: Stable government job, average salary, zero risk.", scores: { riskTolerance: 0, patience: 8 } }, { text: "Job B: Commission-based sales, potential for 5x salary but no guarantee.", scores: { riskTolerance: 10, socialInfluence: 8 } }, { text: "Job C: Startup role, high chaos, high learning.", scores: { riskTolerance: 7, stressTolerance: 8 } }, { text: "Job D: Research role, solitary, intellectual challenge.", scores: { analytical: 10, socialInfluence: 0 } }] },
    { id: 4, text: "In a group discussion, people are arguing.", options: [{ text: "I take the lead and mediate the conflict.", scores: { leadership: 10, socialInfluence: 8 } }, { text: "I stay quiet and analyze who is logically right.", scores: { analytical: 10, socialInfluence: 2 } }, { text: "I make a joke to lighten the mood.", scores: { socialInfluence: 7, creativity: 8 } }, { text: "I leave the room; I hate conflict.", scores: { stressTolerance: 0, leadership: 0 } }] },
    { id: 5, text: "You have free time. You prefer to:", options: [{ text: "Solve puzzles, play strategy games, or read non-fiction.", scores: { analytical: 10, patience: 6 } }, { text: "Paint, design, write, or create content.", scores: { creativity: 10, analytical: 2 } }, { text: "Go out with a large group of friends.", scores: { socialInfluence: 10, conscientiousness: 3 } }, { text: "Organize my room or plan my week.", scores: { conscientiousness: 10, creativity: 0 } }] },
    { id: 6, text: "How do you handle your daily routine?", options: [{ text: "I plan every hour in my calendar.", scores: { conscientiousness: 10, riskTolerance: 2 } }, { text: "I have a rough to-do list but go with the flow.", scores: { conscientiousness: 6, riskTolerance: 5 } }, { text: "I hate routines, I do what I feel like.", scores: { conscientiousness: 1, creativity: 8 } }, { text: "I usually forget what I need to do until the last minute.", scores: { conscientiousness: 0, stressTolerance: 6 } }] },
    { id: 7, text: "A complex problem appears with no clear instructions.", options: [{ text: "I break it down into data points and logic flows.", scores: { analytical: 10, creativity: 3 } }, { text: "I brainstorm wild, out-of-the-box solutions.", scores: { creativity: 10, analytical: 4 } }, { text: "I ask the team for their input before deciding.", scores: { leadership: 7, socialInfluence: 8 } }, { text: "I wait for someone to give me better instructions.", scores: { leadership: 0, riskTolerance: 2 } }] },
    { id: 8, text: "Public Speaking: You have to give a presentation to 50 people.", options: [{ text: "I love it! I can charm the crowd.", scores: { socialInfluence: 10, stressTolerance: 8 } }, { text: "I will do it if I have prepared thoroughly.", scores: { conscientiousness: 8, stressTolerance: 5 } }, { text: "I dread it. I prefer working behind the scenes.", scores: { socialInfluence: 1, analytical: 6 } }, { text: "I'll wing it and hope for the best.", scores: { riskTolerance: 9, conscientiousness: 1 } }] },
    { id: 9, text: "Financial Patience: You start a business.", options: [{ text: "I need profit in month 1, or I quit.", scores: { patience: 0, riskTolerance: 4 } }, { text: "I can work for 2 years without profit if the vision is big.", scores: { patience: 10, riskTolerance: 8 } }, { text: "I prefer a guaranteed salary, no business for me.", scores: { riskTolerance: 0, patience: 6 } }, { text: "I'll sell whatever is trending right now.", scores: { creativity: 5, patience: 2 } }] },
    { id: 10, text: "Would you move to a new city for a job without knowing anyone?", options: [{ text: "Yes, I love the adventure and uncertainty.", scores: { riskTolerance: 10, socialInfluence: 6 } }, { text: "Only if the pay is double my current one.", scores: { riskTolerance: 6, analytical: 6 } }, { text: "Maybe, if I can plan everything in advance.", scores: { riskTolerance: 4, conscientiousness: 8 } }, { text: "No, I need my stability and family nearby.", scores: { riskTolerance: 0, patience: 5 } }] },
    { id: 11, text: "When you make a mistake, you:", options: [{ text: "Analyze exactly why it happened to prevent recurrence.", scores: { analytical: 10, conscientiousness: 8 } }, { text: "Admit it instantly and take responsibility.", scores: { leadership: 10, socialInfluence: 5 } }, { text: "Feel terrible and stress about it for days.", scores: { stressTolerance: 0, empathy: 8 } }, { text: "Try to fix it quietly before anyone notices.", scores: { riskTolerance: 6, leadership: 2 } }] },
    { id: 12, text: "Your friend is sad about a failure. You:", options: [{ text: "Listen to them cry and support them emotionally.", scores: { empathy: 10, socialInfluence: 6 } }, { text: "Give them a logical plan to fix the problem.", scores: { analytical: 10, empathy: 2 } }, { text: "Take them out to distract them.", scores: { socialInfluence: 8, creativity: 5 } }, { text: "Tell them to toughen up.", scores: { empathy: 0, leadership: 3 } }] },
    { id: 13, text: "Consistency Check: Do you enjoy networking events?", options: [{ text: "Yes, I talk to everyone.", scores: { socialInfluence: 10 } }, { text: "I prefer 1-on-1 conversations.", scores: { socialInfluence: 5 } }, { text: "No, I hide in the corner.", scores: { socialInfluence: 0 } }, { text: "I only go if mandatory.", scores: { socialInfluence: 2 } }], isExtended: true },
    { id: 14, text: "Consistency Check: A task takes 3 months of boring repetitive work.", options: [{ text: "I can do it if the goal is clear.", scores: { patience: 10 } }, { text: "I automate it or delegate it.", scores: { creativity: 8, patience: 4 } }, { text: "I quit after 1 week.", scores: { patience: 0 } }, { text: "I complain but do it.", scores: { patience: 5 } }], isExtended: true },
    { id: 15, text: "Consistency Check: You are forced to lead a team.", options: [{ text: "I naturally take charge.", scores: { leadership: 10 } }, { text: "I do it, but I find it stressful.", scores: { leadership: 5, stressTolerance: 4 } }, { text: "I refuse and pass it to someone else.", scores: { leadership: 0 } }, { text: "I try to make decisions by voting.", scores: { leadership: 4, socialInfluence: 6 } }], isExtended: true }
];

function calculateResults(profile, interests, mcqAnswers) {
    let rawScores = {};
    let maxScores = {};
    TRAITS.forEach(t => { rawScores[t] = 0; maxScores[t] = 0; });

    Object.keys(mcqAnswers).forEach(qId => {
        const q = QUESTION_BANK.find(que => que.id === parseInt(qId));
        if (!q) return;
        const ansIdx = mcqAnswers[qId];
        const selectedOpt = q.options[ansIdx];
        Object.entries(selectedOpt.scores).forEach(([trait, val]) => rawScores[trait] += val);
        Object.keys(selectedOpt.scores).forEach(trait => maxScores[trait] += 10);
    });

    const userTraits = {};
    TRAITS.forEach(t => {
        userTraits[t] = maxScores[t] > 0 ? Math.round((rawScores[t] / maxScores[t]) * 100) : 50;
    });

    let consistencyErrors = 0;
    let extremeResponses = 0;
    if (mcqAnswers[1] === 0 && mcqAnswers[6] === 2) consistencyErrors++;
    if (mcqAnswers[1] === 2 && mcqAnswers[6] === 0) consistencyErrors++;
    if (mcqAnswers[3] === 0 && mcqAnswers[10] === 2) consistencyErrors++;

    Object.values(mcqAnswers).forEach(idx => { if (idx === 0) extremeResponses++; });

    let confidenceScore = 100;
    let confidenceReason = "High consistency detected.";
    if (consistencyErrors > 0) { confidenceScore -= (consistencyErrors * 20); confidenceReason = "Contradictory answers detected."; }
    if (extremeResponses > 8) { confidenceScore -= 15; confidenceReason = "Pattern of extreme answers detected."; }

    const scoredCareers = CAREER_DATABASE.map(career => {
        let score = 0;
        let reasons = [];
        let elimination = null;
        const wP = confidenceScore < 70 ? 0.20 : 0.40;
        const wI = confidenceScore < 70 ? 0.30 : 0.25;
        const wC = confidenceScore < 70 ? 0.35 : 0.20;
        const wD = 0.15;

        let traitScore = 0;
        let relevantTraits = 0;
        Object.entries(career.traits).forEach(([t, reqVal]) => {
            const userVal = userTraits[t] || 50;
            traitScore += (100 - Math.abs(userVal - reqVal));
            relevantTraits++;
        });
        score += (relevantTraits > 0 ? traitScore / relevantTraits : 50) * wP;

        const hasInterest = interests.some(i => career.title.toLowerCase().includes(i.toLowerCase()) ||
            (career.id.includes('med') && i === 'Health') ||
            (career.id.includes('eng') && i === 'Tech') ||
            (career.id.includes('com') && (i === 'Business' || i === 'Finance')));
        score += (hasInterest ? 100 : 40) * wI;

        let constraintVal = 100;
        if (!career.stream.includes('any') && !career.stream.includes(profile.stream)) {
            if (profile.stream === 'pre-medical' && (career.id.includes('eng') || career.stream.includes('pre-engineering'))) { constraintVal = 0; elimination = "Requires Pre-Engineering background."; }
            else if (profile.stream === 'pre-engineering' && (career.id.includes('med') || career.stream.includes('pre-medical'))) { constraintVal = 0; elimination = "Requires Pre-Medical background."; }
            else if (profile.stream === 'arts' && (career.id.includes('med') || career.id.includes('eng') || career.stream.includes('pre-medical') || career.stream.includes('pre-engineering'))) { constraintVal = 0; elimination = "Requires Science background."; }
            else { constraintVal = 40; reasons.push("Requires stream conversion/extra study."); }
        }
        if (profile.financialPressure === 'yes') {
            if (career.salary === 'Low Start' || career.salary === 'Volatile') { constraintVal -= 30; reasons.push("Risky due to immediate financial needs."); }
            else if (career.risk === 'High') { constraintVal -= 20; }
        }
        score += constraintVal * wC;
        score += career.demand * wD;

        return { ...career, finalScore: Math.round(score), reasons, elimination };
    }).sort((a, b) => b.finalScore - a.finalScore);

    return { careers: scoredCareers, userTraits, confidenceScore, confidenceReason };
}

// Helper function to safely parse Gemini response, handling potential Markdown code blocks
function parseGeminiResponse(responseText) {
    try {
        // Try strict JSON parse first
        return JSON.parse(responseText);
    } catch (e) {
        // If that fails, try to extract JSON from Markdown code blocks
        // e.g., ```json { ... } ```
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                return JSON.parse(jsonMatch[1]);
            } catch (e2) {
                console.error("Failed to parse extracted JSON:", e2);
            }
        }
        console.error("Failed to parse Gemini response:", e);
        // Throw or return null? Throwing allows the caller to handle default values.
        throw new Error("Invalid JSON response from Gemini");
    }
}


module.exports = {
    TRAITS,
    CAREER_DATABASE,
    QUESTION_BANK,
    calculateResults,
    parseGeminiResponse
};
