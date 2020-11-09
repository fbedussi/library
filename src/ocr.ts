import { Base64 } from './model/model'

export const extractTextFromImage = (base64: Base64) =>
	fetch(
		`https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({
				requests: [
					{
						image: {
							content: base64,
						},
						features: [
							{
								type: 'TEXT_DETECTION',
							},
						],
					},
				],
			}),
		},
	)
		.then(res => res.json())
		.then(
			(res: {
				responses: { textAnnotations: { description: string }[] }[];
			}) => {
				const words = res.responses
					.flatMap(({ textAnnotations }) =>
						textAnnotations.map(({ description }) => description),
					)
					// the first one is the full sentence
					.slice(1);
				return words;
			},
		);
