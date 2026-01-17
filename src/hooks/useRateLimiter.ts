import { useState, useCallback } from "react";

interface UseRateLimiterOptions {
  maxAttempts: number;
  windowMs: number;
  cooldownMs: number;
}

interface UseRateLimiterReturn {
  canSubmit: boolean;
  remainingAttempts: number;
  cooldownRemaining: number;
  recordAttempt: () => boolean;
  reset: () => void;
}

const STORAGE_KEY = "contact_form_rate_limit";

interface RateLimitData {
  attempts: number[];
  cooldownUntil: number | null;
}

const getStoredData = (): RateLimitData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return { attempts: [], cooldownUntil: null };
};

const setStoredData = (data: RateLimitData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
};

export const useRateLimiter = ({
  maxAttempts = 3,
  windowMs = 60 * 60 * 1000, // 1 hour
  cooldownMs = 5 * 60 * 1000, // 5 minutes cooldown after max attempts
}: Partial<UseRateLimiterOptions> = {}): UseRateLimiterReturn => {
  const [, setTick] = useState(0);

  const getState = useCallback(() => {
    const now = Date.now();
    const data = getStoredData();

    // Filter out old attempts outside the window
    const validAttempts = data.attempts.filter(
      (timestamp) => now - timestamp < windowMs
    );

    // Check if in cooldown
    const inCooldown = data.cooldownUntil && now < data.cooldownUntil;
    const cooldownRemaining = inCooldown
      ? Math.ceil((data.cooldownUntil! - now) / 1000)
      : 0;

    const canSubmit = !inCooldown && validAttempts.length < maxAttempts;
    const remainingAttempts = Math.max(0, maxAttempts - validAttempts.length);

    return {
      canSubmit,
      remainingAttempts,
      cooldownRemaining,
      validAttempts,
    };
  }, [maxAttempts, windowMs]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    const data = getStoredData();

    // Filter out old attempts
    const validAttempts = data.attempts.filter(
      (timestamp) => now - timestamp < windowMs
    );

    // Check if already at max attempts
    if (validAttempts.length >= maxAttempts) {
      // Set cooldown
      setStoredData({
        attempts: validAttempts,
        cooldownUntil: now + cooldownMs,
      });
      setTick((t) => t + 1);
      return false;
    }

    // Record new attempt
    validAttempts.push(now);
    setStoredData({
      attempts: validAttempts,
      cooldownUntil: data.cooldownUntil,
    });

    // If this was the last allowed attempt, set cooldown
    if (validAttempts.length >= maxAttempts) {
      setStoredData({
        attempts: validAttempts,
        cooldownUntil: now + cooldownMs,
      });
    }

    setTick((t) => t + 1);
    return true;
  }, [maxAttempts, windowMs, cooldownMs]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTick((t) => t + 1);
  }, []);

  const state = getState();

  return {
    canSubmit: state.canSubmit,
    remainingAttempts: state.remainingAttempts,
    cooldownRemaining: state.cooldownRemaining,
    recordAttempt,
    reset,
  };
};
