import { Dispatch } from 'react';

export function Input({
  placeholder,
  change,
}: {
  placeholder: string;
  change: Dispatch<string>;
}) {
  return (
    <input
      className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
         file:text-violet-700
        hover:file:bg-violet-100 border h-[40px] rounded-md pl-4"
      type="text"
      placeholder={placeholder}
      onChange={(e) => change(e.target.value)}
    />
  );
}
