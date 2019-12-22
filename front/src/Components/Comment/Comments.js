import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { LOAD_COMMENT } from '../../apollo/queries/Comment';
import CommentWriter from './CommentWriter';

const Comments = ({ project, user }) => {
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState();
  const [readComment] = useLazyQuery(LOAD_COMMENT, {
    onCompleted(res) {
      if (!res || !res.findProjectById) return;
      setCommentCount(res.findProjectById.commentCount);
      setComments(res.findProjectById.comments);
    },
  });

  useEffect(() => {
    readComment({ variables: { projectId: project.id } });
  }, [project.id, readComment]);

  const localUpdate = (idx, data) => {
    if (data) comments.splice(idx, 1, data);
    else {
      comments.splice(idx, 1);
      setCommentCount(commentCount - 1);
    }
    setComments([...comments]);
  };
  if (!comments) return <></>;

  const updateComments = () => {
    readComment({ variables: { projectId: project.id } });
  };

  return (
    <CommentWrapper user={user}>
      <div>{`댓글 ${commentCount} 개`}</div>
      {(user) && (<CommentWriter projectId={project.id} updateComments={updateComments} />) }
      {comments.map((comment, i) => (
        <Comment
          comment={comment}
          user={user}
          key={comment.id}
          idx={i}
          localUpdate={localUpdate}
        />
      ))}
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  margin: 50px 0px;
  word-wrap: break-word;
  #commentWriter {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  textarea {
    resize: none;
    width: 90%;
    height: 100px;
    font-size: 16px;
    padding: 10px;
  }
  button {
    margin-top: 10px;
    margin-left: 90%;
    width:10%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    background: #5fa0ff;
    color: white;
    cursor: pointer;
  }
  #myImg {
    margin: 0px 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => (props.user ? props.user.picture : undefined)});
    background-size: cover;
  }
`;
Comments.propTypes = {
  project: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Comments;
