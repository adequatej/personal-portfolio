"use client";

import { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { subscribeToWritingPosts, WritingPost } from '@/lib/firebase';
import { samplePosts } from '@/lib/sample-posts';
import Link from 'next/link';

type CategoryFilter = 'all' | 'cs' | 'life';

export default function WritingPage() {
  const [firebasePosts, setFirebasePosts] = useState<WritingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    const unsubscribe = subscribeToWritingPosts((fetchedPosts) => {
      setFirebasePosts(fetchedPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Use Firebase posts if available, otherwise sample posts
  const allPosts = firebasePosts.length > 0 ? firebasePosts : samplePosts;
  const posts = filter === 'all'
    ? allPosts
    : allPosts.filter((post) => post.category === filter);

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'CS', value: 'cs' },
    { label: 'Life', value: 'life' },
  ];

  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
        Writing
      </h1>
      <p className="text-muted-foreground mb-6">
        Thoughts on engineering, applied AI, and things I&apos;m building.
      </p>

      {/* Category filter */}
      <div className="flex items-center gap-1 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === f.value
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground font-mono">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts in this category yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border/30 last:border-0">
              <Link
                href={`/writing/${post.slug}`}
                className="group flex items-baseline gap-4 py-3"
              >
                <span className="text-xs font-mono text-muted-foreground/50 shrink-0 tabular-nums w-20">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </time>
                </span>
                <div className="min-w-0">
                  <span className="text-foreground group-hover:text-accent transition-colors block">
                    {post.title}
                  </span>
                  {post.excerpt && (
                    <span className="text-xs text-muted-foreground/60 block mt-0.5">
                      {post.excerpt}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
