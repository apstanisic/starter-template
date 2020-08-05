/** Generate numbers between */
export function between({
  start,
  finish,
  order = 'asc',
  inc = 1,
}: {
  start: number;
  finish: number;
  order?: 'asc' | 'desc';
  inc?: number;
}): number[] {
  const numbers: number[] = [];
  if (order === 'asc') {
    for (let i = start; i <= finish; i = i + inc) {
      numbers.push(i);
    }
  } else {
    for (let i = finish; i >= start; i = i - inc) {
      numbers.push(i);
    }
  }

  return numbers;
}

/**  Generate years betwen startYear and current year */
export function generateYears(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  return between({ start: startYear, finish: currentYear, order: 'desc' });
}

/** Remove items from object that are empty strings, nulls or undefined */
export function removeEmptyItems<T extends Record<string, any>>(obj: T): Partial<T> {
  const validItems: any = {};

  Object.entries(obj).forEach(([key, val]) => {
    const item = obj[key];
    if (item === '' || item === null || item === undefined) return;
    if (typeof item === 'object' && Object.keys(item).length === 0) return;
    validItems[key] = obj[key];
  });

  return validItems;
}

/** Pause execution for provided time in miliseconds */
export function wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/** Get first key from object */
export function firstVal<T extends any>(obj: Record<string, T>): T | undefined {
  return Object.values(obj)?.[0];
}
