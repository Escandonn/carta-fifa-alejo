import MatrixBackground from './components/MatrixBackground';
import Card from './components/Card';
import Chatbot from './components/Chatbot';
import SystemMessage from './components/SystemMessage';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 font-['Arial_Black',sans-serif] overflow-y-auto overflow-x-hidden relative selection:bg-[#00ff66] selection:text-black py-10 px-4">
      <MatrixBackground />
      <div className="z-20 w-full flex justify-center">
        <Card />
      </div>
      <div className="z-20 w-full flex justify-center mt-4">
        <SystemMessage />
      </div>
      <Chatbot />
    </div>
  );
}

export default App;