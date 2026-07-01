import Resume from "../Model/Resume.js";
import ai from "../Config/AI.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Professional summary is required.",
      });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Improve the user's professional summary into an ATS-friendly summary in 1-2 sentences. Return only the improved text without markdown or extra explanation.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent =
      response.choices[0].message.content.trim();

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Job description is required.",
      });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Rewrite the job description using strong action verbs, ATS-friendly keywords, measurable achievements where possible, and professional language. Return only the rewritten description.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent =
      response.choices[0].message.content.trim();

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required.",
      });
    }

    const systemPrompt = `
You are an expert resume parser.

Extract all information from the resume.

Return ONLY valid JSON.

Rules:
- Do not include markdown.
- Do not include explanations.
- Missing values should be empty strings or empty arrays.
- Dates should be in YYYY-MM format whenever possible.
- Return only JSON.
`;

    const userPrompt = `
Extract information from the following resume.

Resume:

${resumeText}

Return JSON in this format:

{
  "professional_summary": "",
  "skills": [],

  "personal_info": {
    "image": "",
    "fullName": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },

  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],

  "projects": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],

  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const extractedData = response.choices[0].message.content.trim();

    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      ...parsedData,
    });

    return res.status(201).json({
      resumeId: newResume._id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};