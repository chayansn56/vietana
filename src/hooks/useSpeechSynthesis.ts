import { useState, useEffect, useCallback } from 'react';

/**
 * A reusable hook for the browser Speech Synthesis (TTS) API.
 * Handles cleaning HTML tags, tracking playback by entity ID, and automatic unmount cleanup.
 */
export const useSpeechSynthesis = (defaultLang = 'en-US') => {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const isSpeaking = speakingId !== null;

  const cancel = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
  }, []);

  const speak = useCallback((id: string, text: string, lang = defaultLang) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      cancel();
      return;
    }

    // Cancel any active speech before starting a new utterance
    window.speechSynthesis.cancel();
    
    // Basic HTML tag stripping
    const cleanText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;

    utterance.onstart = () => setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  }, [speakingId, defaultLang, cancel]);

  // Clean up speech synthesis when component using the hook unmounts
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { speak, cancel, speakingId, isSpeaking };
};
