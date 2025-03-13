import { Suspense } from 'react';
import InternshipList from '@/components/InternshipList';

// Create a client component that uses useSearchParams
function InternshipListWithSearch() {
  return <InternshipList />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Internship Tracker</h1>
        
        {/* Wrap the component using useSearchParams in Suspense */}
        <Suspense fallback={<div>Loading internships...</div>}>
          <InternshipListWithSearch />
        </Suspense>
      </div>
    </main>
  );
}

