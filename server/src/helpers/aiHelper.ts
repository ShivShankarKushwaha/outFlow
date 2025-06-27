import { GoogleGenerativeAI } from '@google/generative-ai';
import env from '../env';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY!);

const generateMessage = async (data: any) => {
	const { name, job_title, company, location, summary } = data;
	let ai_prompt =
		data.ai_prompt ||
		`Write a friendly, personalized outreach message introducing Outflo, mentioning how it can help automate outreach to increase meetings & sales. Address the user by their first name. use these details as sender, name: "Shiv Shankar Kushwaha", company: "Outflow.io", email: "campaign@outflow.ai", phone: "+1 (123) 456-7890".`;
	const prompt = `
        Given the following user details:
        Name: ${name}
        Job Title: ${job_title}
        Company: ${company}
        Location: ${location}
        Summary: ${summary}
        ${ai_prompt}
        `;

	const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const message = response.text().trim();

	return { message };
};

export const OpenAIHelper = {
	generateMessage
};
