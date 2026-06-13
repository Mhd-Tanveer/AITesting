import React from 'react'
import { Trash2, Linkedin, Edit2 } from 'lucide-react'

const STATUS_COLORS = {
  'Wishlist': 'bg-purple-100 dark:bg-purple-900 border-l-4 border-purple-500',
  'Applied': 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500',
  'Follow-up': 'bg-amber-100 dark:bg-amber-900 border-l-4 border-amber-500',
  'Interview': 'bg-emerald-100 dark:bg-emerald-900 border-l-4 border-emerald-500',
  'Offer': 'bg-green-100 dark:bg-green-900 border-l-4 border-green-500',
  'Rejected': 'bg-red-100 dark:bg-red-900 border-l-4 border-red-500'
}

function getDaysSinceApplied(dateApplied) {
  const applied = new Date(dateApplied)
  const today = new Date()
  const diffTime = Math.abs(today - applied)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function JobCard({ job, onEdit, onDelete, onStatusChange }) {
  const days = getDaysSinceApplied(job.dateApplied)
  const daysText = days === 0 ? 'today' : `${days}d ago`

  return (
    <div className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${STATUS_COLORS[job.status]} cursor-grab active:cursor-grabbing`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{job.company}</h3>
            {job.linkedinUrl && (
              <a
                href={job.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex-shrink-0"
                title="View on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 truncate">{job.role}</p>
          
          {job.resume && (
            <div className="inline-block bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-xs mb-2 mr-2">
              {job.resume}
            </div>
          )}
          
          <p className="text-xs text-slate-500 dark:text-slate-500">{daysText}</p>
          
          {job.salaryRange && (
            <p className="text-xs text-green-700 dark:text-green-400 mt-1 font-medium">{job.salaryRange}</p>
          )}
          
          {job.notes && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{job.notes}</p>
          )}
        </div>
        
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(job)}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            title="Edit job"
          >
            <Edit2 size={16} className="text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-1.5 hover:bg-red-200 dark:hover:bg-red-900 rounded transition-colors"
            title="Delete job"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
