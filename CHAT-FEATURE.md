# Vibe Coding Chat Feature

## Overview
The chat interface allows users to have conversational interactions with AI to refine and improve their website projects. This is the "vibe coding" experience where users can naturally describe changes they want.

## Features

### Backend (NestJS)
- **Chat Module** with controller and service
- **OpenAI Integration** for conversational AI
- **Context-Aware Responses** - AI knows about the project and business goals
- **Chat History** - Maintains conversation history per project
- **Error Handling** - Graceful fallbacks if AI fails

### Frontend (Next.js)
- **Beautiful Chat UI** with message bubbles
- **Real-time Messaging** - Send and receive messages
- **Auto-scroll** - Automatically scrolls to latest message
- **Loading States** - Shows "Thinking..." while AI responds
- **Empty State** - Helpful suggestions when starting
- **Keyboard Shortcuts** - Enter to send, Shift+Enter for new line

## API Endpoints

### POST /api/chat/message
Send a message to the AI assistant.

**Request:**
```json
{
  "projectId": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "message": "AI response",
  "timestamp": "2025-11-27T..."
}
```

### GET /api/chat/history/:projectId
Get chat history for a project.

**Response:**
```json
[
  {
    "role": "user" | "assistant",
    "content": "message content",
    "timestamp": "2025-11-27T..."
  }
]
```

### DELETE /api/chat/history/:projectId
Clear chat history for a project.

## How to Use

1. **Create a Project** - Start from the dashboard
2. **Open Chat** - Click "Open Vibe Coding Chat" button
3. **Start Chatting** - Ask the AI to help refine your website

### Example Conversations

**User:** "Make the homepage more engaging"
**AI:** "I can help with that! Here are some suggestions for making your homepage more engaging:
1. Add a compelling hero section with a clear value proposition
2. Include social proof like testimonials or client logos
3. Add a video or animation to capture attention
4. Use contrasting colors for your call-to-action buttons
Which of these would you like to implement first?"

**User:** "Add a testimonials section"
**AI:** "Great choice! I'll help you add a testimonials section. Here's what I recommend:
- Place it after your features section
- Include 3-4 testimonials with photos
- Add customer names and companies
- Use a carousel or grid layout
Would you like me to generate some sample testimonial copy?"

## Technical Details

### Chat History Storage
Currently stored in-memory (Map). For production:
- Move to database (add ChatMessage model)
- Add pagination for long conversations
- Implement message search

### AI Context
The AI assistant has context about:
- Project name
- Business goals
- Current conversation history

### Future Enhancements
- [ ] Voice input for messages
- [ ] Code generation from chat
- [ ] Direct website updates from chat
- [ ] Multi-modal input (images, sketches)
- [ ] Collaborative chat (multiple users)
- [ ] Chat export/sharing

## Integration with Project

The chat is accessible from:
- Project detail page (button in AI Generation card)
- Direct URL: `/chat?projectId=<id>`

## Styling
- Yellow/orange gradient background (matches El Dorado theme)
- User messages: Yellow background
- AI messages: Gray background
- Responsive design
- Smooth scrolling

## Testing

1. Create a project
2. Click "Open Vibe Coding Chat"
3. Try these prompts:
   - "Make the homepage more engaging"
   - "Add a testimonials section"
   - "Improve the call-to-action copy"
   - "What colors should I use for my brand?"

## Notes

- Requires OPENAI_API_KEY in backend .env
- Falls back to helpful error message if API fails
- Chat history persists during session
- Each project has separate chat history
