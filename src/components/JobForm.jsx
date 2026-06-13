import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['Wishlist', 'Applied', 'Follow-up', 'Interview', 'Offer', 'Rejected']

export function JobForm({ isOpen, onClose, onSubmit, editingJob, resumes }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    linkedinUrl: '',
    resume: '',
    dateApplied: new Date().toISOString().split('T')[0],
    salaryRange: '',
    notes: '',
    status: 'Applied'
  })

  const [newResume, setNewResume] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingJob) {
      const dateStr = editingJob.dateApplied instanceof Date 
        ? editingJob.dateApplied.toISOString().split('T')[0]
        : editingJob.dateApplied.split('T')[0]
      
      setFormData({
        ...editingJob,
        dateApplied: dateStr
      })
    } else {
      setFormData({
        company: '',
        role: '',
        linkedinUrl: '',
        resume: '',
        dateApplied: new Date().toISOString().split('T')[0],
        salaryRange: '',
        notes: '',
        status: 'Applied'
      })
    }
    setErrors({})
    setNewResume('')
  }, [isOpen, editingJob])

  const validate = () => {
    const newErrors = {}
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.role.trim()) newErrors.role = 'Role is required'
    if (formData.linkedinUrl && !isValidUrl(formData.linkedinUrl)) newErrors.linkedinUrl = 'Invalid URL'
    return newErrors
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData, newResume)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b dark:border-slate-700 bg-white dark:bg-slate-800">
          <h2 className="text-xl font-semibold">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Google"
              className={`w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.company ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Title / Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              className={`w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.role ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Job URL</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/jobs/view/..."
              className={`w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.linkedinUrl ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.linkedinUrl && <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl}</p>}
          </div>

          {/* Resume */}
          <div>
            <label className="block text-sm font-medium mb-1">Resume Used</label>
            <div className="flex gap-2">
              <select
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select a resume...</option>
                {resumes.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            {resumes.length === 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Create one by entering a name below</p>
            )}
            <input
              type="text"
              value={newResume}
              onChange={(e) => setNewResume(e.target.value)}
              placeholder="Or create new: SDE_Resume_v1"
              className="w-full px-3 py-2 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-2"
            />
          </div>

          {/* Date Applied */}
          <div>
            <label className="block text-sm font-medium mb-1">Date Applied</label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Salary Range (Optional)</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g., ₹25-30 LPA or $150-180K"
              className="w-full px-3 py-2 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Recruiter name, referral info, interview notes, etc."
              rows="3"
              className="w-full px-3 py-2 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {editingJob ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
