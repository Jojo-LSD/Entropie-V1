"""
Chat API endpoints

Future implementation:
- Integration with LLM (OpenAI, Claude, or local model)
- RAG system for contextual responses based on business data
- Chat history persistence in PostgreSQL
- Real-time websocket connections

Current: Placeholder for API structure
"""

from fastapi import APIRouter

router = APIRouter()

# TODO: Implement chat endpoints
# @router.post("/send")
# async def send_message(message: str):
#     """Send message to AI assistant with RAG context"""
#     pass

# @router.get("/history")
# async def get_chat_history():
#     """Get user's chat history from database"""
#     pass