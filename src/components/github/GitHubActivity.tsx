"use client";

import { useState, useEffect } from 'react';

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
  };
};

type ActivityItem = {
  id: string;
  repo: string;
  repoUrl: string;
  message: string;
  date: string;
};

function formatEvent(event: GitHubEvent): ActivityItem | null {
  const repo = event.repo.name;
  const repoUrl = `https://github.com/${repo}`;
  const date = new Date(event.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  switch (event.type) {
    case 'PushEvent': {
      const commit = event.payload.commits?.[0];
      if (!commit) return null;
      const msg = commit.message.split('\n')[0];
      return { id: event.id, repo, repoUrl, message: msg, date };
    }
    case 'WatchEvent':
      return { id: event.id, repo, repoUrl, message: '★ starred', date };
    case 'CreateEvent':
      if (event.payload.ref_type === 'repository') {
        return { id: event.id, repo, repoUrl, message: 'created repo', date };
      }
      if (event.payload.ref_type === 'branch') {
        return { id: event.id, repo, repoUrl, message: `branch: ${event.payload.ref}`, date };
      }
      return null;
    case 'ForkEvent':
      return { id: event.id, repo, repoUrl, message: 'forked', date };
    default:
      return null;
  }
}

export function GitHubActivity() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('https://api.github.com/users/adequatej/events/public?per_page=30', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const events: GitHubEvent[] = await res.json();
        const items = events
          .map(formatEvent)
          .filter((item): item is ActivityItem => item !== null)
          .slice(0, 6);
        setActivity(items);
      } catch {
        setActivity([]);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">GitHub Activity</h2>
        <p className="text-xs text-muted-foreground/60">Loading...</p>
      </div>
    );
  }

  if (activity.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">GitHub Activity</h2>
      <ul className="space-y-0.5">
        {activity.map((item) => (
          <li key={item.id} className="flex items-baseline gap-2 py-1 text-xs">
            <span className="font-mono text-muted-foreground/50 shrink-0 tabular-nums w-12">
              {item.date}
            </span>
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-accent hover:underline shrink-0 truncate max-w-[160px]"
            >
              {item.repo.replace('adequatej/', '')}
            </a>
            <span className="text-muted-foreground/60 truncate">
              {item.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
