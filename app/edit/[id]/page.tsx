'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm';
import { Task, UpdateTaskInput } from '../../types';

export default function EditTask({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const task: Task = await response.json();
        setTask(task);
      } catch (err) {
        setError('Failed to load task');
      }
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (data: UpdateTaskInput) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      router.push('/');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  if (!task) {
    return <div className="p-8"></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <TaskForm
        initialData={{
          title: task.title,
          color: task.color,
        }}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/')}
      />
    </div>
  );
}
