import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Comment from './Comment';
import { LOAD_COMMENT } from '../../Apollo/queries/Comment';
import CommentWriter from './CommentWriter';

export default ({ project, user }) => {
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState();
  const [readComment] = useLazyQuery(LOAD_COMMENT, {
    onCompleted(res) {
      setCommentCount(res.findProjectById.commentCount);
      setComments(res.findProjectById.comments);
    },
  });

  useEffect(() => {
    readComment({ variables: { projectId: project.id } });
  }, []);

  const localUpdate = (idx, data) => {
    if (data) comments.splice(idx, 1, data);
    else {
      comments.splice(idx, 1);
      setCommentCount(commentCount - 1);
    }
    setComments([...comments]);
  };
  if (!comments) return <></>;

  const updateComments = (text) => {
    readComment({ variables: { projectId: project.id } });
  };

  return (
    <CommentWrapper user={user}>
      <div>{`댓글 ${commentCount} 개`}</div>
      {(user) ? (<CommentWriter projectId={project.id} updateComments={updateComments} />) : (<></>) }
      {comments.map((comment, i) => (<Comment comment={comment} user={user} key={comment.id} idx={i} localUpdate={localUpdate} />))}
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  /* css코드는 삭제하였습니다. */
`;
