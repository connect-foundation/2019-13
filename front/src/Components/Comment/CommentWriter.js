import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CREATE_COMMENT } from '../../Apollo/queries/Comment';

const CommentWriter = ({ projectId, updateComments }) => {
  const [text, setText] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted(res) {
      if (!res || !res.createComment) return;
      setText('');
      updateComments();
    },
  });
  const addCommentHandler = () => {
    if (text.length < 1) return;
    createComment({
      variables: { projectId, text },
    });
  };
  return (
    <>
      <div id="commentWriter">
        <div id="myImg" />
        <textarea value={text} onChange={(e) => { setText(e.target.value); }} maxLength="255" />
      </div>
      <button type="button" onClick={addCommentHandler}> 등록 </button>
    </>
  );
};
CommentWriter.propTypes = {
  projectId: PropTypes.string.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default CommentWriter;
