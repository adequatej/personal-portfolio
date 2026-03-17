"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { getWritingPost, WritingPost } from '@/lib/firebase';
import { samplePosts } from '@/lib/sample-posts';
import Link from 'next/link';

export default function WritingPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<WritingPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      // Try Firebase first, fall back to sample posts
      const fetched = await getWritingPost(slug);
      if (fetched) {
        setPost(fetched);
      } else {
        const sample = samplePosts.find(p => p.slug === slug) || null;
        setPost(sample);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-16 md:py-24 max-w-2xl">
        <p className="text-sm text-muted-foreground font-mono">Loading...</p>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-16 md:py-24 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/writing" className="text-sm text-muted-foreground hover:text-accent transition-colors">
          ← Back to writing
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-16 md:py-24 max-w-2xl">
      <Link href="/writing" className="text-sm text-muted-foreground hover:text-accent transition-colors mb-8 inline-block">
        ← Back to writing
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {post.title}
          </h1>
          <time className="text-sm font-mono text-muted-foreground/60">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </header>

        <div className="max-w-none">
          {post.content.split('\n').map((paragraph, i) =>
            paragraph.trim() === '' ? null : (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            )
          )}
        </div>
      </article>
    </Container>
  );
}
