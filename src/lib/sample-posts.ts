import { WritingPost } from '@/lib/firebase';

// Sample writing posts that render locally.
// Replace with Firebase data once you start publishing.
export const samplePosts: WritingPost[] = [
  {
    slug: 'grad-acceptances-2025',
    title: 'Grad School Acceptances',
    date: '2025-03-10',
    excerpt: 'Accepted to MSCS programs at Columbia (ML track), NYU, and Georgia Tech.',
    category: 'life',
    content: `Excited to share that I've been accepted to several MSCS programs for Fall 2025.\n\nColumbia University — MS in Computer Science (Machine Learning track)\nNew York University — MS in Computer Science\nGeorgia Institute of Technology — MS in Computer Science\n\nStill deciding, but leaning toward the ML-focused tracks. More updates to come as I make my decision.`,
  },
  {
    slug: 'agentic-ai-thoughts',
    title: 'Why I Think Agentic AI Changes Everything',
    date: '2025-03-05',
    excerpt: 'Thoughts on Claude, Cursor, and the shift from tools to autonomous systems.',
    category: 'cs',
    content: `The thing that excites me most right now in AI isn't model architecture — it's agency.\n\nTools like Claude and Cursor are crossing a threshold where AI systems don't just respond to prompts, they execute multi-step workflows autonomously. Claude Code can navigate codebases, run tests, debug failures, and iterate — all without hand-holding.\n\nThis isn't just autocomplete. This is a fundamentally different interaction pattern: you describe intent, and the system figures out the execution path.\n\nI've been building with these tools daily and the productivity gains are real. But what's more interesting is the design space they open up — automated code review, self-healing CI pipelines, AI pair programming that actually understands context.\n\nThe next wave isn't better models. It's better agents.`,
  },
  {
    slug: 'automated-workflows',
    title: 'Building Automated Workflows with AI Agents',
    date: '2025-02-20',
    excerpt: 'How I use AI-powered automation in my development process.',
    category: 'cs',
    content: `I've been experimenting with automated workflows that combine AI agents with traditional CI/CD tooling.\n\nThe basic idea: instead of writing scripts for every edge case, you let an AI agent handle the ambiguous parts. Code review, test generation, dependency updates, documentation — these are all tasks where AI agents can operate semi-autonomously with human oversight.\n\nSome patterns I've found useful:\n\n1. Pre-commit hooks that run AI-powered code review\n2. Automated PR descriptions generated from diffs\n3. Test case suggestions based on code changes\n4. Documentation that updates itself when APIs change\n\nThe key insight is that agents work best when you give them clear boundaries and verification steps. Autonomous doesn't mean unsupervised.`,
  },
  {
    slug: 'building-huddle-chat',
    title: 'Lessons from Building Huddle Chat',
    date: '2025-01-15',
    excerpt: 'Technical decisions, mistakes, and what I learned building a real-time chat app.',
    category: 'cs',
    content: `Huddle Chat was my first full-stack project that I actually deployed and maintained. Here's what I learned.\n\nThe biggest lesson was about real-time architecture. I started with polling (bad idea), moved to WebSockets, and eventually settled on a hybrid approach that uses Server-Sent Events for presence and WebSockets for messages.\n\nMongoDB was the right choice for the data model — chat messages are naturally document-shaped. But I underestimated the importance of indexing. Queries that were fast with 100 messages became painfully slow at 10,000.\n\nThe UI taught me that perceived performance matters more than actual performance. Optimistic updates, skeleton loaders, and message grouping made the app feel instant even when the network wasn't.\n\nBiggest mistake: not setting up error monitoring from day one. I found out about production bugs from users, not from my own tooling.`,
  },
];
