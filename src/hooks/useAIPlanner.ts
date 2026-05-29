import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { PlannerStateMachine, Preferences, PlannerMode } from '../logic/plannerStateMachine';

export interface Message {
  text: string;
  type: 'bot' | 'user' | 'blueprint';
}

export const useAIPlanner = (initialDestination?: string) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [plannerMode, setPlannerMode] = useState<PlannerMode>('GATHERING_PREFS');
  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [preferences, setPreferences] = useState<Preferences>({
    focus: initialDestination || undefined
  });

  const enqueueBotMessages = (msgs: { text: string; options?: string[]; type?: 'bot' | 'blueprint'; delay?: number }[]) => {
    let delayAccumulator = 0;
    msgs.forEach((msg, index) => {
      const delay = msg.delay ?? 500;
      delayAccumulator += delay;
      
      if (delay > 0) {
        setTimeout(() => setIsTyping(true), delayAccumulator - delay);
      }
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { text: msg.text, type: msg.type || 'bot' }]);
        if (index === msgs.length - 1) {
          setOptions(msg.options || []);
        }
      }, delayAccumulator);
    });
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (messages.length > 0) return;
    initialized.current = true;
    
    const initialState = PlannerStateMachine.getInitialState(t.planner.greeting, initialDestination);
    setPreferences(initialState.updatedPreferences);
    setPlannerMode(initialState.mode);
    setQuestionIndex(initialState.questionIndex);
    enqueueBotMessages(initialState.nextBotMessages);
  }, [initialDestination]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || plannerMode === 'FINISHED') return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setOptions([]);

    const result = PlannerStateMachine.processInput(preferences, plannerMode, questionIndex, text);
    
    setPreferences(result.updatedPreferences);
    setPlannerMode(result.mode);
    setQuestionIndex(result.questionIndex);
    
    enqueueBotMessages(result.nextBotMessages);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    options,
    isFinished: plannerMode === 'FINISHED',
    preferences,
    handleSend
  };
};
