import { useState, useEffect, useRef } from 'react';
import Groq from 'groq-sdk';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'dummy_key',
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `Eres un bot de fútbol asesor sobre un club deportivo. Siempre responderás desde esta perspectiva, como un experto apasionado por el deporte y el club. Tus respuestas deben ser breves, claras y siempre manteniendo el rol de asesor deportivo del club.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Cargar historial del chat desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing chat history');
      }
    } else {
      setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asesor deportivo. ¿En qué te puedo ayudar sobre el club hoy?' }]);
    }
  }, []);

  // Guardar historial
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Autoscroll
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...newMessages.map(m => ({ role: m.role, content: m.content }))
        ],
        model: 'llama-3.3-70b-versatile',
      });

      const aiResponse = response.choices[0]?.message?.content || 'Hubo un error de comunicación con el club.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Intenta nuevamente más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00ff66] text-black rounded-full flex items-center justify-center shadow-[0_0_15px_#00ff66] hover:scale-110 transition-transform z-50"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 w-[350px] max-w-[calc(100vw-3rem)] bg-black/90 border border-[#00ff66] rounded-xl shadow-[0_0_20px_rgba(0,255,102,0.3)] z-50 flex flex-col transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[500px] max-h-[80vh]'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#00ff66]/30 bg-[#002200]/50 rounded-t-xl shrink-0">
        <div className="flex items-center gap-2 text-[#00ff66] font-bold">
          <MessageSquare size={18} />
          <span>Asesor Deportivo</span>
        </div>
        <div className="flex items-center gap-2 text-[#00ff66]">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-white transition-colors">
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-[#00ff66]/50 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
                  msg.role === 'user' 
                    ? 'bg-[#00ff66] text-black rounded-tr-none' 
                    : 'bg-[#113311] text-[#00ff66] border border-[#00ff66]/30 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg px-3 py-2 bg-[#113311] text-[#00ff66]/70 border border-[#00ff66]/30 rounded-tl-none animate-pulse">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#00ff66]/30 bg-black rounded-b-xl shrink-0 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-[#112211] text-white border border-[#00ff66]/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00ff66] placeholder-[#00ff66]/30 font-sans text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#00ff66] text-black w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
