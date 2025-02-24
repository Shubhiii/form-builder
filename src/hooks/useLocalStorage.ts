import { useState } from "react";
import { toast } from "react-toastify";

function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error("Error reading from localStorage:", error);
			return initialValue;
		}
	});

	const setValue = (fn: ((val: T) => T)) => {
		try {
			setStoredValue(fn(storedValue));
			window.localStorage.setItem(key, JSON.stringify(fn(storedValue)));
		} catch (error) {
			toast.error(`Error writing to localStorage: ${error}`);
		}
	};

	return [storedValue, setValue] as const;
}

export default useLocalStorage;