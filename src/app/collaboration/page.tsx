'use client';

import {useState} from 'react';
import {AppHeader} from '@/components/layout/header';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {ScrollArea} from '@/components/ui/scroll-area';
import type {Comment} from '@/lib/types';
import {Send} from 'lucide-react';

const initialComments: Comment[] = [
  {id: 'C001', author: {name: 'Alice Johnson', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'woman portrait'}, timestamp: '2 hours ago', text: 'Just received the updated NOR for V002. ETA has been pushed back by 6 hours.'},
  {id: 'C002', author: {name: 'Bob Williams', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'man portrait'}, timestamp: '1 hour ago', text: '@Alice Thanks for the update. I will inform the port agent.'},
  {id: 'C003', author: {name: 'NavisAI Bot', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'robot head'}, timestamp: '30 mins ago', text: 'Suggested Action: Notify charterer about ETA change for V002.'},
];

export default function CollaborationPage() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    const comment: Comment = {
      id: `C${(comments.length + 1).toString().padStart(3, '0')}`,
      author: {name: 'Alex Robu', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'man portrait'},
      timestamp: 'Just now',
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Voyage V002 - Collaboration" />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Comments, tasks, and AI suggestions for this voyage.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[50vh] pr-4">
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar data-ai-hint={comment.author.avatarHint}>
                      <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{comment.author.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm mt-1 text-foreground/90">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handlePostComment} className="flex w-full items-center space-x-2">
              <Avatar data-ai-hint="man portrait">
                <AvatarImage src="https://placehold.co/40x40.png" alt="Alex Robu" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <Input type="text" placeholder="Add a comment or task..." value={newComment} onChange={e => setNewComment(e.target.value)} />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
