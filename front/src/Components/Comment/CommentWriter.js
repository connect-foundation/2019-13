import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CREATE_COMMENT } from '../../apollo/queries/Comment';
import checkError from '../../errorCheck';
import useSnackbar from '../../customHooks/useSnackbar';
import Snackbar from '../Snackbar';


const CommentWriter = ({ projectId, updateComments }) => {
  const [snackbar, setSnackbar] = useSnackbar();
  const [text, setText] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted(res) {
      if (!res || !res.createComment) return;
      setText('');
      updateComments();
    },
    onError(error) {
      const errorMessage = checkError(error.networkError);
      setSnackbar({
        ...snackbar,
        open: true,
        message: errorMessage,
        color: 'alertColor',
      });
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
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  );
};
CommentWriter.propTypes = {
  projectId: PropTypes.string.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default CommentWriter;
