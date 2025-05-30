import { useState, useCallback } from 'react';

export default function useModel3Controller(initial = false) {
  const [model3Status, setModel3Status] = useState(initial);

  const toggleModel3 = useCallback(() => setModel3Status(!model3Status), [model3Status]);

  return { model3Status, toggleModel3 };
}
