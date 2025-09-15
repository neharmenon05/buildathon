import React, { useState, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, language }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // In a real implementation, this would send to Whisper API
        // For demo, we'll simulate transcription
        simulateTranscription();
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('माइक्रोफोन एक्सेस नहीं मिला। कृपया अनुमति दें।');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const simulateTranscription = () => {
    // Simulate Whisper API response based on language
    const mockTranscripts = {
      hi: 'मेरे पास 10 किलो टमाटर है, मैं कितने में बेचूं?',
      en: 'I have 10 kg tomatoes, what price should I sell?',
      mr: 'माझ्याकडे 10 किलो टोमॅटो आहेत, किती भावाने विकावे?',
      ta: 'என்னிடம் 10 கிலோ தக்காளி உள்ளது, எவ்வளவு விலைக்கு விற்க வேண்டும்?'
    };
    
    const text = mockTranscripts[language as keyof typeof mockTranscripts] || mockTranscripts.en;
    setTranscript(text);
    onTranscript(text);
  };

  const playResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language for TTS
      const langMap: Record<string, string> = {
        hi: 'hi-IN',
        en: 'en-IN',
        mr: 'mr-IN',
        ta: 'ta-IN'
      };
      
      utterance.lang = langMap[language] || 'hi-IN';
      utterance.rate = 0.8;
      
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopPlayback = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {language === 'hi' ? 'आवाज़ से पूछें' : 'Voice Input'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full ${isRecording 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          {transcript && (
            <button
              onClick={isPlaying ? stopPlayback : () => playResponse(transcript)}
              className={`p-3 rounded-full ${isPlaying 
                ? 'bg-orange-500 text-white animate-pulse' 
                : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
        </div>
      </div>
      
      {transcript && (
        <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
          <p className="text-gray-700 font-medium">{transcript}</p>
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-2">
        {language === 'hi' 
          ? 'माइक बटन दबाएं और बोलें। समाप्त होने पर फिर दबाएं।'
          : 'Press mic button and speak. Press again when finished.'
        }
      </p>
    </div>
  );
};

export default VoiceInput;