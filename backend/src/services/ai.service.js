 
//   const { GoogleGenAI } =require( "@google/genai")
// console.log("API KEY:", process.env.Googlekey);
// const ai = new GoogleGenAI({
//     apiKey:process.env.Googlekey
// });
// const {z, json}=require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema");

// const interviewreportschema=z.object({
//     matchscore:z.number().describe("A score between 0 to 100 indicating how well the candidate profile matches the job description"),
// technicalquestions:z.array(z.object({
//     question:z.string().describe("the technical questions can be asked in the interview"),
//     intention:z.string().describe("the intention of interviewer behind asking this questions"),
//     answer:z.string().describe("How to answer this question,what points to cover,What approach to take etc")
// })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
// behaviourialquestions:z.array(z.object({
//     question:z.string().describe("the behaviourial questions can be asked in the interview"),
//     intention:z.string().describe("the intention of interviewer behind asking this questions"),
//     answer:z.string().describe("How to answer this question,what points to cover,What approach to take etc")
// })).describe("behaviourial questions that can be asked in the interview along with their intention and how to answer them"),
// skillsgap:z.array(z.object({
//     skill:z.string().describe("The skill which candidate is lacking"),
//     severity:z.enum(["low","medium","high"]).describe("The severity of this skill gap like low ,medium or high")
// })).describe("List of all skill gaps of candidate profile along with their severity"),
// preparationplan:z.array(z.object({
//     day:z.number().describe("The day number in the description plan ,starting from 1"),
//     focus:z.string().describe("the main focus in this day in the preparation plan to follow in tht day for cracking the interview"),
//     tasks:z.string().describe("List of the tasks to be done in this particular day according to skills gap and interview"),

// })).describe("A day wise preparation plan for the candidate to follow in order to crack all the questions in the interview and cover up skills gap"),
// title:z.string().describe("The title of the job for which the interview report is generated")


// })
// async function generateinterviewreport({ resume, selfdescription, jobdescription }) {
//   try {
//     const prompt = `
// Generate a STRICT JSON interview report.

// Follow this EXACT structure:

// {
//   "title": string,
//   "matchscore": number (0-100),
//   "technicalquestions": [
//     {
//       "question": string,
//       "intention": string,
//       "answer": string
//     }
//   ],
//   "behaviourialquestions": [
//     {
//       "question": string,
//       "intention": string,
//       "answer": string
//     }
//   ],
//   "skillsgap": [
//     {
//       "skill": string,
//       "severity": "low" | "medium" | "high"
//     }
//   ],
//   "preparationplan": [
//     {
//       "day": number,
//       "focus": string,
//       "tasks": string
//     }
//   ]
// }

// IMPORTANT RULES:
// - ONLY return valid JSON
// - NO extra text
// - DO NOT change keys
// - DO NOT add new fields

// Candidate Resume:
// ${resume}

// Self Description:
// ${selfdescription}

// Job Description:
// ${jobdescription}
// `;

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema:zodToJsonSchema(interviewreportschema)
//       }
//     });

//     console.log("AI TEXT:", response.text); // 🔥 debug

//     return JSON.parse(response.text); // ✅ FIXED

//   } catch (err) {
//   console.log("🔥 AI ERROR:", err);

//   // ✅ NEVER throw — always return something
//   return {
//     title: "Fallback Report",
//     matchscore: 50,
//     technicalquestions: [],
//     behaviourialquestions: [],
//     skillsgap: [],
//     preparationplan: []
//   };
// }
// }
// module.exports=generateinterviewreport
// const { GoogleGenAI } = require("@google/genai");
// console.log("API KEY:", process.env.Googlekey);

// const ai = new GoogleGenAI({
//   apiKey: process.env.Googlekey
// });

// const { z } = require("zod");
// const { zodToJsonSchema } = require("zod-to-json-schema");

// // ✅ ZOD SCHEMA
// const interviewreportschema = z.object({
//   matchscore: z.number(),
//   technicalquestions: z.array(
//     z.object({
//       question: z.string(),
//       intention: z.string(),
//       answer: z.string()
//     })
//   ),
//   behaviourialquestions: z.array(
//     z.object({
//       question: z.string(),
//       intention: z.string(),
//       answer: z.string()
//     })
//   ),
//   skillsgap: z.array(
//     z.object({
//       skill: z.string(),
//       severity: z.enum(["low", "medium", "high"])
//     })
//   ),
//   preparationplan: z.array(
//     z.object({
//       day: z.number(),
//       focus: z.string(),
//       tasks: z.string()
//     })
//   ),
//   title: z.string()
// });


// // ✅ HELPER: FIX STRINGIFIED JSON
// function parseArray(arr) {
//   return (arr || []).map((item) => {
//     try {
//       return typeof item === "string" ? JSON.parse(item) : item;
//     } catch {
//       return item;
//     }
//   });
// }


// // ✅ MAIN FUNCTION
// async function generateinterviewreport({ resume, selfdescription, jobdescription }) {
//   try {
//     const prompt = `
// Generate a STRICT JSON interview report.

// Follow this EXACT structure:

// {
//   "title": string,
//   "matchscore": number,
//   "technicalquestions": [
//     { "question": string, "intention": string, "answer": string }
//   ],
//   "behaviourialquestions": [
//     { "question": string, "intention": string, "answer": string }
//   ],
//   "skillsgap": [
//     { "skill": string, "severity": "low" | "medium" | "high" }
//   ],
//   "preparationplan": [
//     { "day": number, "focus": string, "tasks": string }
//   ]
// }

// IMPORTANT:
// - ONLY JSON
// - NO extra text
// - DO NOT wrap JSON in quotes

// Candidate Resume:
// ${resume}

// Self Description:
// ${selfdescription}

// Job Description:
// ${jobdescription}
// `;

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: zodToJsonSchema(interviewreportschema)
//       }
//     });

//     console.log("AI TEXT:", response.text);

//     // ✅ Parse response safely
//     let parsed;
//     try {
//       parsed = JSON.parse(response.text);
//     } catch (err) {
//       console.log("❌ JSON PARSE ERROR:", response.text);
//       throw new Error("Invalid JSON from AI");
//     }

//     // ✅ FIX STRING ARRAYS
//     const fixed = {
//       title: parsed.title || "Interview Report",
//       matchscore: parsed.matchscore || 50,
//       technicalquestions: parseArray(parsed.technicalquestions),
//       behaviourialquestions: parseArray(parsed.behaviourialquestions),
//       skillsgap: parseArray(parsed.skillsgap),
//       preparationplan: parseArray(parsed.preparationplan)
//     };

//     return fixed;

//   } catch (err) {
//     console.log("🔥 AI ERROR:", err);

//     // ✅ SAFE FALLBACK (never crash)
//     return {
//       title: "Fallback Report",
//       matchscore: 50,
//       technicalquestions: [],
//       behaviourialquestions: [],
//       skillsgap: [],
//       preparationplan: []
//     };
//   }
// }

// module.exports = generateinterviewreport;
const { GoogleGenAI } = require("@google/genai");

console.log("API KEY:", process.env.Googlekey);

const ai = new GoogleGenAI({ apiKey: process.env.Googlekey });

// =====================
// HELPER: Validate and clean each array
// =====================
function cleanQuestions(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.filter(
    (q) =>
      q &&
      typeof q === "object" &&
      typeof q.question === "string" &&
      typeof q.intention === "string" &&
      typeof q.answer === "string"
  );
}

function cleanSkillsgap(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  const validSeverity = ["low", "medium", "high"];
  return arr.filter(
    (s) =>
      s &&
      typeof s === "object" &&
      typeof s.skill === "string" &&
      validSeverity.includes(s.severity)
  );
}

function cleanPreparationplan(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.filter(
    (p) =>
      p &&
      typeof p === "object" &&
      typeof p.day === "number" &&
      typeof p.focus === "string" &&
      typeof p.tasks === "string"
  );
}

// =====================
// MAIN FUNCTION
// =====================
async function generateinterviewreport({ resume, selfdescription, jobdescription }) {
  try {
    const prompt = `
You are a JSON API. You must return ONLY a valid JSON object. No explanation, no markdown, no code blocks.

Generate an interview report based on the candidate's resume, self description, and job description.

Return this EXACT JSON structure with REAL string values (not numbers, not null, not placeholders):

{
  "title": "Interview Report for [Candidate Name] - [Job Role]",
  "matchscore": 75,
  "technicalquestions": [
    {
      "question": "Write the actual interview question here as a full sentence",
      "intention": "Write what the interviewer wants to assess here",
      "answer": "Write a detailed answer guide here"
    },
    {
      "question": "Write another actual interview question here",
      "intention": "Write what the interviewer wants to assess here",
      "answer": "Write a detailed answer guide here"
    },
    {
      "question": "Write another actual interview question here",
      "intention": "Write what the interviewer wants to assess here",
      "answer": "Write a detailed answer guide here"
    }
  ],
  "behaviourialquestions": [
    {
      "question": "Write the actual behavioural question here",
      "intention": "Write what the interviewer wants to assess here",
      "answer": "Write a detailed answer guide here"
    },
    {
      "question": "Write another behavioural question here",
      "intention": "Write what the interviewer wants to assess here",
      "answer": "Write a detailed answer guide here"
    }
  ],
  "skillsgap": [
    { "skill": "Name of missing skill", "severity": "high" },
    { "skill": "Name of missing skill", "severity": "medium" },
    { "skill": "Name of missing skill", "severity": "low" }
  ],
  "preparationplan": [
    { "day": 1, "focus": "Topic to study on day 1", "tasks": "Detailed tasks to do on day 1" },
    { "day": 2, "focus": "Topic to study on day 2", "tasks": "Detailed tasks to do on day 2" },
    { "day": 3, "focus": "Topic to study on day 3", "tasks": "Detailed tasks to do on day 3" }
  ]
}

STRICT RULES:
- Every "question", "intention", "answer", "skill", "focus", "tasks", "title" MUST be a real English string
- severity MUST be exactly one of: "low", "medium", "high" — nothing else
- "day" MUST be a number like 1, 2, 3
- "matchscore" MUST be a number between 0 and 100
- Do NOT put null in any field
- Do NOT put numbers where strings are expected
- Do NOT wrap the JSON in markdown or code blocks
- Return ONLY the JSON object, nothing else

Candidate Resume:
${resume}

Self Description:
${selfdescription}

Job Description:
${jobdescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
        // ❌ NO responseSchema — it causes Gemini to return garbage
      }
    });

    console.log("AI TEXT:", response.text);

    let parsed;
    try {
      const cleaned = response.text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.log("❌ JSON PARSE ERROR:", response.text);
      throw new Error("Invalid JSON from AI");
    }

    // Validate and clean every field
    const fixed = {
      title: typeof parsed.title === "string" ? parsed.title : "Interview Report",
      matchscore: typeof parsed.matchscore === "number" ? Math.min(100, Math.max(0, parsed.matchscore)) : 50,
      technicalquestions: cleanQuestions(parsed.technicalquestions),
      behaviourialquestions: cleanQuestions(parsed.behaviourialquestions),
      skillsgap: cleanSkillsgap(parsed.skillsgap),
      preparationplan: cleanPreparationplan(parsed.preparationplan)
    };

    console.log("AI RESULT FULL:", JSON.stringify(fixed, null, 2));
    return fixed;

  } catch (err) {
    console.log("🔥 AI ERROR:", err);
    return {
      title: "Fallback Report",
      matchscore: 50,
      technicalquestions: [],
      behaviourialquestions: [],
      skillsgap: [],
      preparationplan: []
    };
  }
}

module.exports = generateinterviewreport;