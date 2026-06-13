# Job Tracker AI

A local-first, single-page React application for managing your job applications with a Kanban board interface. All data persists in the browser using IndexedDB.

## Features

✨ **Core Features:**
- 📊 Drag-and-drop Kanban board with 6 status columns (Wishlist, Applied, Follow-up, Interview, Offer, Rejected)
- ➕ Add, edit, and delete job applications
- 🔍 Search and filter jobs by company name or role
- 💾 Automatic persistence to IndexedDB (no backend required)
- 🌙 Light/dark mode toggle
- 📱 Responsive design (works on laptop and tablet)

✨ **Job Card Details:**
- Company name (required)
- Job title / role (required)
- LinkedIn job URL (clickable link)
- Resume used (with dropdown of previously used resumes)
- Date applied (auto-set, editable)
- Salary range (optional)
- Notes (recruiter name, referral info, interview notes)
- Status color-coding with left-border accent

✨ **Data Management:**
- 📥 Export all data as JSON for backup
- 📤 Import JSON to restore data
- Sort cards by date (newest/oldest within columns)
- Column headers show job count

## Tech Stack

- **React 18+** - UI framework with functional components & hooks
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first styling
- **idb** - Async IndexedDB wrapper
- **@dnd-kit** - Headless drag-and-drop library
- **lucide-react** - Beautiful icon library

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Adding a Job
1. Click the **"+ Add Job"** button in the top-right
2. Fill in required fields: Company name and Job title
3. Optionally add LinkedIn URL, resume name, salary, and notes
4. Select the initial status (defaults to "Applied")
5. Click **"Add Job"**

### Managing Jobs
- **Edit**: Click the pencil icon on any card
- **Delete**: Click the trash icon (confirmation required)
- **Change Status**: Drag and drop cards between columns
- **View LinkedIn**: Click the LinkedIn icon on a card

### Search & Filter
- Use the search bar to find jobs by company name or role
- Results are filtered across all columns

### Dark Mode
- Click the sun/moon icon in the top-right to toggle themes

### Data Backup
- **Export**: Click the download icon to save a JSON backup
- **Import**: Click the upload icon to restore from a backup file

## Data Model

Each job card stores:
```javascript
{
  id: "timestamp-based unique ID",
  company: "Company Name",
  role: "Job Title",
  linkedinUrl: "https://linkedin.com/jobs/view/...",
  resume: "Resume_Name_v1",
  dateApplied: "2024-01-15",
  salaryRange: "₹25-30 LPA",
  notes: "Optional notes...",
  status: "Applied" // One of: Wishlist, Applied, Follow-up, Interview, Offer, Rejected
}
```

All data is stored in IndexedDB with the following object stores:
- `jobs` - Array of job applications
- `config` - Application settings (theme, resumes)

## Status Columns

1. **Wishlist** 🔮 - Saved jobs you haven't applied to yet
2. **Applied** 📤 - Application submitted
3. **Follow-up** 📞 - Followed up with recruiter or referral
4. **Interview** 🎤 - Currently in interview rounds
5. **Offer** 🎉 - Received an offer
6. **Rejected** ❌ - Got a rejection

## Keyboard Shortcuts

- **Search box**: Click or use Ctrl+F for quick search

## Browser Support

Works on all modern browsers with IndexedDB support:
- Chrome 24+
- Firefox 16+
- Safari 10+
- Edge 15+

## Local Development

### Project Structure
```
src/
├── components/
│   ├── Column.jsx          # Kanban column component
│   ├── JobCard.jsx         # Job card display
│   ├── JobCardDraggable.jsx # Drag-and-drop wrapper
│   └── JobForm.jsx         # Add/edit form modal
├── App.jsx                 # Main app component
├── db.js                   # IndexedDB service
├── index.css               # Tailwind + global styles
└── main.jsx                # Entry point
```

### Key Features Implementation

**Drag-and-Drop**: Uses `@dnd-kit/core` for accessible, headless drag functionality
**Persistence**: All CRUD operations sync to IndexedDB immediately
**Search**: Real-time client-side filtering
**Theming**: Dark mode state saved to IndexedDB

## Tips

- Create multiple resume versions for different roles (e.g., "SDE_Resume_v1", "QA_Resume_v1")
- Use notes for referral details, interview dates, or hiring manager info
- Set the date manually if applying retroactively
- Export data monthly for backup

## Future Enhancements

- Interview round tracking with dates
- Salary negotiation history
- Email templates for follow-ups
- Integration with LinkedIn API
- Cloud sync across devices

## License

MIT - Feel free to use this template for your own job tracking!

---

**Made with ❤️ for job seekers everywhere**
