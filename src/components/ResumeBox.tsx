
import { motion } from 'framer-motion';
import { MapPin, Users, GitFork, Star, Link as LinkIcon, Calendar } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './ResumeBox.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SkillBadgeProps {
  language: string;
  count: number;
}

interface RepoCardProps {
  repo: {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    html_url: string;
    created_at: string;
    updated_at: string;
  };
}

interface ActivityChartProps {
  data: Record<string, number>; // The data for daily contributions
}
interface ContributionTypeChartProps {
  data: Record<string, number>;
}


interface UserData {
  name: string | null;
  login: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  avatar_url: string;
  public_repos: number;
  created_at: string;
}

interface ResumeBoxProps {
  userData: UserData;
  repositories: any[];
  contributions: {
    daily: Record<string, number>;
    types: Record<string, number>;
  } | null;
}

const SkillBadge = ({ language, count }: SkillBadgeProps) => (
  <motion.span 
    className="skill-badge"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.05 }}
  >
    {language} ({count})
  </motion.span>
);

const RepoCard = ({ repo }: RepoCardProps) => (
  <motion.div 
    className="repo-card"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3>{repo.name}</h3>
    <p>{repo.description || 'No description provided.'}</p>
    <div className="repo-stats">
      <span><Star size={16} /> {repo.stargazers_count}</span>
      <span><GitFork size={16} /> {repo.forks_count}</span>
      <span className="repo-language">{repo.language || 'N/A'}</span>
    </div>
    <div className="repo-dates">
      <span><Calendar size={16} /> Created: {new Date(repo.created_at).toLocaleDateString()}</span>
      <span><Calendar size={16} /> Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
    </div>
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
      <LinkIcon size={16} /> View Repository
    </a>
  </motion.div>
);

const ActivityChart = ({ data}: ActivityChartProps) => {
  const dates = Object.keys(data).sort();
  const values = dates.map(date => data[date]);

  const chartData = {
    labels: dates.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Contributions',
        data: values,
        fill: true,
        borderColor: '#1DB954',
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#c9d1d9',
        bodyColor: '#c9d1d9',
        borderColor: '#30363d',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#30363d',
        },
        ticks: {
          color: '#8b949e',
        },
      },
      x: {
        grid: {
          color: '#30363d',
        },
        ticks: {
          color: '#8b949e',
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const ContributionTypeChart = ({ data }: ContributionTypeChartProps) => {
  const chartData = {
    labels: ['Pushes', 'Pull Requests', 'Issues', 'Created'],
    datasets: [
      {
        data: [
          data.PushEvent,
          data.PullRequestEvent,
          data.IssuesEvent,
          data.CreateEvent,
        ],
        backgroundColor: [
          '#1DB954',
          '#FF6B6B',
          '#4A90E2',
          '#FFD93D',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#c9d1d9',
        },
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#c9d1d9',
        bodyColor: '#c9d1d9',
        borderColor: '#30363d',
        borderWidth: 1,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export function ResumeBox({ userData, repositories, contributions }: ResumeBoxProps) {
  const extractLanguages = (repos: any[]) => {
    const languageCounts: Record<string, number> = {};
    repos.forEach((repo) => {
      const lang = repo.language;
      if (lang) {
        languageCounts[lang] = (languageCounts[lang] || 0) + 1;
      }
    });
    return languageCounts;
  };

  const languages = extractLanguages(repositories);
  const accountAge = new Date().getFullYear() - new Date(userData.created_at).getFullYear();

  return (
    <div className="resume-box">
     
      <div className="profile-section">
        
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          src={userData.avatar_url}
          alt="Profile"
          className="profile-image"
        />
         <a 
        href={`https://github.com/${userData.login}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-profile-button"
      >
        Visit GitHub Profile
      </a>
        <div className="profile-info">
          <h2>{userData.name || userData.login}</h2>
          <p className="bio">{userData.bio}</p>
          <div className="profile-stats">
            <span><MapPin size={16} /> {userData.location || 'Not specified'}</span>
            <span><Users size={16} /> {userData.followers} followers · {userData.following} following</span>
            <span><GitFork size={16} /> {userData.public_repos} repositories</span>
            <span><Calendar size={16} /> {accountAge} years on GitHub</span>
          </div>
        </div>
      </div>

      {contributions && (
        <section className="activity-section">
          <h3>Recent Activity</h3>
          <div className="charts-container">
            <div className="activity-chart">
              <h4>Contribution Timeline</h4>
              <ActivityChart data={contributions.daily} />
            </div>
            <div className="contribution-type-chart">
              <h4>Contribution Types</h4>
               <ContributionTypeChart data={contributions.types} />
            </div>
          </div>
        </section>
      )}

      <section className="skills-section">
        <h3>Top Skills</h3>
        <div className="skills-container">
          {Object.entries(languages).map(([language, count]) => (
            <SkillBadge 
              key={language} 
              language={language} 
              count={count} 
            />
          ))}
        </div>
      </section>

      <section className="repositories-section">
        <h3>Top Repositories</h3>
        <div className="repo-grid">
          {repositories.map((repo) => (
            <RepoCard 
              key={repo.id} 
              repo={repo}
            />
          ))}
        </div>
      </section>
    </div>
  );
}