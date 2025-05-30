import { useState, useCallback } from 'react';

export default function useModelController(initial = false) {
  const [modelStatus, setModelStatus] = useState(initial);

  const toggleModel = useCallback(() => setModelStatus(!modelStatus), [modelStatus]);

  return { modelStatus, toggleModel };
}
