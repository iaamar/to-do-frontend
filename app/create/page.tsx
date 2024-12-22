'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '../components/TaskForm';
import { CreateTaskInput } from '../types';

export default function CreateTask() {
  const router = useRouter();

  const handleSubmit = async (data: CreateTaskInput) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      router.push('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => router.push('/')}
      />
    </div>
  );
}
