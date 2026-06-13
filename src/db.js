import { openDB } from 'idb'

const DB_NAME = 'JobTrackerDB'
const JOBS_STORE = 'jobs'
const CONFIG_STORE = 'config'

let db = null

async function initDB() {
  if (db) return db
  
  db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      // Jobs store
      if (!db.objectStoreNames.contains(JOBS_STORE)) {
        const jobStore = db.createObjectStore(JOBS_STORE, { keyPath: 'id' })
        jobStore.createIndex('status', 'status')
        jobStore.createIndex('dateApplied', 'dateApplied')
      }
      
      // Config store for themes, resumes, etc.
      if (!db.objectStoreNames.contains(CONFIG_STORE)) {
        db.createObjectStore(CONFIG_STORE, { keyPath: 'key' })
      }
    }
  })
  
  return db
}

export async function getDB() {
  return initDB()
}

// Jobs operations
export async function addJob(job) {
  const database = await getDB()
  return database.add(JOBS_STORE, {
    ...job,
    id: Date.now().toString(),
    dateApplied: job.dateApplied || new Date().toISOString()
  })
}

export async function updateJob(id, updates) {
  const database = await getDB()
  const job = await database.get(JOBS_STORE, id)
  if (!job) throw new Error('Job not found')
  const updated = { ...job, ...updates }
  await database.put(JOBS_STORE, updated)
  return updated
}

export async function deleteJob(id) {
  const database = await getDB()
  return database.delete(JOBS_STORE, id)
}

export async function getJob(id) {
  const database = await getDB()
  return database.get(JOBS_STORE, id)
}

export async function getAllJobs() {
  const database = await getDB()
  return database.getAll(JOBS_STORE)
}

export async function getJobsByStatus(status) {
  const database = await getDB()
  return database.getAllFromIndex(JOBS_STORE, 'status', status)
}

export async function updateJobStatus(id, newStatus) {
  return updateJob(id, { status: newStatus })
}

// Config operations
export async function saveConfig(key, value) {
  const database = await getDB()
  await database.put(CONFIG_STORE, { key, value })
}

export async function getConfig(key) {
  const database = await getDB()
  const result = await database.get(CONFIG_STORE, key)
  return result?.value
}

export async function getResumes() {
  const resumes = await getConfig('resumes') || []
  return resumes
}

export async function addResume(resumeName) {
  const existing = await getResumes()
  if (!existing.includes(resumeName)) {
    await saveConfig('resumes', [...existing, resumeName])
  }
}

export async function getTheme() {
  return getConfig('theme') || 'light'
}

export async function setTheme(theme) {
  return saveConfig('theme', theme)
}

// Data import/export
export async function exportData() {
  const jobs = await getAllJobs()
  const resumes = await getResumes()
  return {
    jobs,
    resumes,
    exportDate: new Date().toISOString()
  }
}

export async function importData(data) {
  const database = await getDB()
  
  // Clear existing jobs
  const tx = database.transaction(JOBS_STORE, 'readwrite')
  const store = tx.objectStore(JOBS_STORE)
  store.clear()
  
  // Import jobs
  for (const job of data.jobs) {
    await store.put(job)
  }
  
  await tx.done
  
  // Import resumes
  if (data.resumes) {
    await saveConfig('resumes', data.resumes)
  }
}
