import MatrixBackground from './components/MatrixBackground';
import Card from './components/Card';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center font-['Arial_Black',sans-serif] overflow-hidden relative selection:bg-[#00ff66] selection:text-black">
      <MatrixBackground />
      <Card />
      <Chatbot />
    </div>
  );
}

export default App;