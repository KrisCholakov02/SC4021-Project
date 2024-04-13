'use client';
import React, { useEffect } from 'react';

import { CommentCard } from '@/components/comment-card';
import { SubmissionCard } from '@/components/submission-card';

export default function RecordPage({ params }: { params: { id: string } }) {
  const [comment, setComment] = React.useState<any>(undefined);
  const [submission, setSubmission] = React.useState<any>(undefined);

  // fetch the record with the given id
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/comment/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status !== 200) {
          console.error(
            'An error occurred for fetching the comment:',
            response.statusText
          );
          return;
        }
        const data = await response.json();
        const result = data.response.docs[0];
        setComment(result);
        const s_response = await fetch(`/api/submission/${result.parent_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (s_response.status !== 200) {
          console.error(
            'An error occurred for fetching the submission:',
            response.statusText
          );
          return;
        }
        const s_data = await s_response.json();
        console.log('s', s_data);
        const s_result = s_data.response.docs[0];
        setSubmission(s_result);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [params.id]);

  return (
    <div className="bg-white w-1/2 h-fit p-10 rounded-lg flex flex-col mx-auto">
      <div className="flex w-full mb-4">
        {submission ? <SubmissionCard {...submission} /> : null}
      </div>
      <div className="flex w-4/5 ml-auto">
        {comment ? <CommentCard {...comment} /> : null}
      </div>
    </div>
  );
}
