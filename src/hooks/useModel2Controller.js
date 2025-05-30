import { useState, useCallback } from 'react';

export default function useModel2Controller(initial = false) {
  const [model2Status, setModel2Status] = useState(initial);

  const toggleModel2 = useCallback(() => setModel2Status(!model2Status), [model2Status]);

  return { model2Status, toggleModel2 };
}
