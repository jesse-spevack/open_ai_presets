# OpenAI Chat Presets

This project provides a way to prepend text to an OpenAI Chat Completion. It is built in TypeScript and can be used to create chat completion tasks with the model.

## Requirements

- Node.js and npm installed on your machine
- An OpenAI API Key and Organization ID

## Setup

First, clone the repository to your local machine:

```bash
git clone https://github.com/jesse-spevack/open_ai_presets.git
cd open_ai_presets
```

Next, install the project dependencies
```bash
npm install
```

## Configuration
Create a .env file in the root directory of your project. Add your OpenAI API Key and Organization ID like so:

```bash
OPENAI_API_KEY=your_api_key
OPENAI_ORGANIZATION=your_organization_id
```

Replace your_api_key and your_organization_id with your actual OpenAI API Key and Organization ID.

## Sample Usage
In the project root, run `npx ts-node openai_chat.ts` and then some text for ChatGPT to revise.

```bash
npx ts-node openai_chat.ts 'Even though the sun was setting quite rapidly, and the sky, like, turned all shades of red and pink and orange, the birds, which were flying high above us, were chirping loudly, and the soft rustling sound of the leaves of the trees was soothing my tired and frazzled mind in a rather significant way.Even though the sun was setting quite rapidly, and the sky, like, turned all shades of red and pink and orange, the birds, which were flying high above us, were chirping loudly, and the soft rustling sound of the leaves of the trees was soothing my tired and frazzled mind in a rather significant way.'
```

**Sample Response**
```json
{
  fullRevision: 'Even though the sun was setting rapidly, the sky turned shades of red, pink, and orange. Birds flew high above us, chirping loudly, and the leaves of the trees rustled softly, soothing my tired mind.',
  spelling: [],
  revisions: [
    {
      originalSentence: 'Even though the sun was setting quite rapidly, and the sky, like, turned all shades of red and pink and orange, the birds, which were flying high above us, were chirping loudly, and the soft rustling sound of the leaves of the trees was soothing my tired and frazzled mind in a rather significant way.',
      revisedSentence: 'Even though the sun was setting rapidly, the sky turned shades of red, pink, and orange. Birds flew high above us, chirping loudly, and the leaves of the trees rustled softly, soothing my tired mind.',
      reason: 'The revisions simplify and declutter the sentence, removing unnecessary words and phrases. The revised sentence also improves clarity and flow.'
    }
  ]
}
```

## License
This project is licensed under the terms of the MIT license.
