import React, { useState, useEffect } from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { Plus, Moon, Sun, Download, Upload, Search, X } from 'lucide-react'
import { Column } from './components/Column'
import { JobForm } from './components/JobForm'
import {
  addJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getResumes,
  addResume,
  getTheme,
  setTheme,
  exportData,
  importData,
  updateJobStatus
} from './db'

const STATUSES = ['Wishlist', 'Applied', 'Follow-up', 'Interview', 'Offer', 'Rejected']

function App() {
  const [jobs, setJobs] = useState([])
  const [resumes, setResumes] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Initialize app
  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      const theme = await getTheme()
      setIsDarkMode(theme === 'dark')
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      }

      const allJobs = await getAllJobs()
      setJobs(allJobs)

      const userResumes = await getResumes()
      setResumes(userResumes)
    } catch (error) {
      console.error('Failed to initialize app:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle dark mode
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    await setTheme(newMode ? 'dark' : 'light')

    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Handle form submission
  const handleFormSubmit = async (formData, newResumeName) => {
    try {
      if (newResumeName.trim()) {
        await addResume(newResumeName)
        const updated = await getResumes()
        setResumes(updated)
        formData.resume = newResumeName
      }

      if (editingJob) {
        await updateJob(editingJob.id, formData)
      } else {
        await addJob(formData)
      }

      const allJobs = await getAllJobs()
      setJobs(allJobs)

      setIsFormOpen(false)
      setEditingJob(null)
    } catch (error) {
      console.error('Failed to save job:', error)
      alert('Failed to save job')
    }
  }

  // Handle drag end
  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (!over) return

    const jobId = active.id
    const newStatus = over.id

    // Find the job and check if status actually changed
    const job = jobs.find(j => j.id === jobId)
    if (!job || job.status === newStatus) return

    try {
      await updateJobStatus(jobId, newStatus)
      const allJobs = await getAllJobs()
      setJobs(allJobs)
    } catch (error) {
      console.error('Failed to update job status:', error)
      alert('Failed to update job status')
    }
  }

  // Handle delete
  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      await deleteJob(jobId)
      const allJobs = await getAllJobs()
      setJobs(allJobs)
    } catch (error) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job')
    }
  }

  // Handle edit
  const handleEdit = (job) => {
    setEditingJob(job)
    setIsFormOpen(true)
  }

  // Export data
  const handleExport = async () => {
    try {
      const data = await exportData()
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export data:', error)
      alert('Failed to export data')
    }
  }

  // Import data
  const handleImport = async (event) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      const text = await file.text()
      const data = JSON.parse(text)

      if (!data.jobs || !Array.isArray(data.jobs)) {
        alert('Invalid backup file format')
        return
      }

      if (!confirm('This will replace all your current jobs. Continue?')) {
        return
      }

      await importData(data)
      const allJobs = await getAllJobs()
      setJobs(allJobs)

      if (data.resumes) {
        setResumes(data.resumes)
      }

      alert('Data imported successfully!')
    } catch (error) {
      console.error('Failed to import data:', error)
      alert('Failed to import data')
    } finally {
      event.target.value = ''
    }
  }

  // Filter jobs based on search
  const getFilteredJobs = (status) => {
    if (!searchQuery.trim()) {
      return jobs.filter(j => j.status === status)
    }

    const query = searchQuery.toLowerCase()
    return jobs.filter(
      j =>
        j.status === status &&
        (j.company.toLowerCase().includes(query) ||
          j.role.toLowerCase().includes(query))
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading Job Tracker...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-700 shadow-sm">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                JT
              </div>
              <h1 className="text-2xl font-bold text-white">Tanveer-Job Tracker</h1>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-64 max-w-2xl">
              <Search size={20} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchQuery('')
                }}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-slate-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white flex-shrink-0"
                  title="Clear search"
                >
                  <X size={18} />
                </button>
              )}
              {searchQuery && (
                <span className="text-xs text-slate-400 flex-shrink-0 px-2 py-1 bg-slate-700 rounded">
                  {jobs.filter(j => 
                    j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    j.role.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length} results
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  setEditingJob(null)
                  setIsFormOpen(true)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add Job</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <label htmlFor="import-file" className="cursor-pointer p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Import backup">
                  <Upload size={18} className="text-slate-600 dark:text-slate-400" />
                </label>
                <input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <button
                  onClick={handleExport}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
                  title="Export backup"
                >
                  <Download size={18} className="text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={18} className="text-yellow-500" />
                ) : (
                  <Moon size={18} className="text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STATUSES.map(status => (
              <Column
                key={status}
                status={status}
                jobs={getFilteredJobs(status)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DndContext>
      </main>

      {/* Form Modal */}
      <JobForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingJob(null)
        }}
        onSubmit={handleFormSubmit}
        editingJob={editingJob}
        resumes={resumes}
      />
    </div>
  )
}

export default App
