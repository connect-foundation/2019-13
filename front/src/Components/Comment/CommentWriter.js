import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREAT_COMMENT } from '../../Apollo/queries/Comment';

export default ({ projectId, updateComments }) => {
  const [text, setText] = useState();
  const [createComment] = useMutation(CREAT_COMMENT, {
    onCompleted(res) {
      if (res.createComment) {
        setText('');
        updateComments();
      }
    },
  });
  const addCommentHandler = () => {
    if (text.length > 0) {
      createComment({
        variables: { projectId, text },
      });
    }
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
