import { Suspense } from 'react';
import SearchFilter from '@/components/SearchFilter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Internship Tracker</h1>
        
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchFilter />
        </Suspense>
      </div>
    </main>
  );
}

