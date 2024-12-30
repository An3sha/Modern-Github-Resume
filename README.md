# GitHub Resume Builder

A modern, interactive web application that generates beautiful resumes from GitHub profiles. Built with React, TypeScript, and Chart.js.

## Features

- 📊 **Interactive Charts**
  - Activity timeline visualization
  - Contribution type breakdown
  - Language distribution analysis

- 🎯 **Repository Insights**
  - Top repositories showcase
  - Star and fork statistics
  - Language usage breakdown

- 📈 **Activity Analysis**
  - Recent contribution history
  - Contribution type distribution
  - Account activity metrics

- 💫 **Modern UI/UX**
  - Smooth animations
  - Responsive design
  - Dark theme
  - Interactive components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-resume-builder.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Visit the application in your browser
2. Enter a GitHub username in the search field
3. Click "Generate Resume" or press Enter
4. View and interact with the generated resume

## Tech Stack

- ⚛️ React
- 📝 TypeScript
- 📊 Chart.js
- 🎨 Tailwind CSS
- ✨ Framer Motion
- 📡 Axios
- 📅 date-fns
- 🎯 Lucide Icons

## Project Structure

```
src/
├── components/
│   ├── Resume.tsx        # Main resume component
│   ├── ResumeBox.tsx    # Resume display component
│   ├── Resume.css       # Styles for resume
│   └── ResumeBox.css    # Styles for resume box
├── App.tsx              # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Features in Detail

### Activity Timeline
- Visualizes GitHub activity over the past month
- Interactive line chart with hover details
- Daily contribution counts

### Repository Cards
- Top repositories showcase
- Star and fork counts
- Language information
- Creation and update dates
- Direct links to repositories

### Skills Analysis
- Language usage breakdown
- Interactive skill badges
- Visual representation of technical expertise

### Profile Statistics
- Follower and following counts
- Total public repositories
- Account age
- Location information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GitHub API for providing the data
- React and TypeScript communities
- Chart.js for beautiful visualizations
- Framer Motion for smooth animations
