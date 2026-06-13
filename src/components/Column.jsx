import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { JobCardDraggable } from './JobCardDraggable'

const STATUS_CONFIG = {
  'Wishlist': { bg: 'bg-purple-50 dark:bg-purple-950', header: 'bg-purple-200 dark:bg-purple-800' },
  'Applied': { bg: 'bg-blue-50 dark:bg-blue-950', header: 'bg-blue-200 dark:bg-blue-800' },
  'Follow-up': { bg: 'bg-amber-50 dark:bg-amber-950', header: 'bg-amber-200 dark:bg-amber-800' },
  'Interview': { bg: 'bg-emerald-50 dark:bg-emerald-950', header: 'bg-emerald-200 dark:bg-emerald-800' },
  'Offer': { bg: 'bg-green-50 dark:bg-green-950', header: 'bg-green-200 dark:bg-green-800' },
  'Rejected': { bg: 'bg-red-50 dark:bg-red-950', header: 'bg-red-200 dark:bg-red-800' }
}

export function Column({ status, jobs, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({
    id: status
  })

  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Applied']

  return (
    <div className={`flex flex-col h-full min-w-80 rounded-lg overflow-hidden ${config.bg}`}>
      <div className={`px-4 py-3 font-semibold text-sm flex items-center justify-between sticky top-0 z-10 ${config.header}`}>
        <span>{status}</span>
        <span className="bg-black bg-opacity-20 px-2 py-0.5 rounded-full text-xs">{jobs.length}</span>
      </div>
      
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto p-3 space-y-2"
      >
        <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map(job => (
            <JobCardDraggable
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
        {jobs.length === 0 && (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
            No jobs yet
          </div>
        )}
      </div>
    </div>
  )
}
