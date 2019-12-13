import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import Utils from '../../utils/utils';
import { UPDATE_COMMENT, REMOVE_COMMENT } from '../../Apollo/queries/Comment';

export default ({ comment, user, idx, localUpdate }) => {
  const textRefference = useRef();
  const [edit, setEdit] = useState(false);
  const [updateComment] = useMutation(UPDATE_COMMENT, {
    onCompleted(res) {
      if (res.updateComment) {
        localUpdate(idx, { ...comment,
          text: textRefference.current.value,
        });
        setEdit(false);
      }
    },
  });
  const [removeComment] = useMutation(REMOVE_COMMENT, {
    onCompleted(res) {
      if (res.removeComment) {
        localUpdate(idx);
      }
    },
  });

  const saveHandler = () => {
    updateComment({
      variables: { commentId: comment.id, text: textRefference.current.value },
    });
  };

  const removeHandler = () => {
    removeComment({
      variables: { commentId: comment.id },
    });
  };
  return (
    <Wrapper user={comment.user}>
      <div id="commentImg" />
      <div className="contents">
        <div className="commentTitle">
          <h2>
            {comment.user.email}
          </h2>
          <h4>
            {Utils.getSeoulTime(comment.createdAt)}
          </h4>
        </div>
        {edit
          ? (
            <div>
              <textarea defaultValue={comment.text} ref={textRefference} maxLength={255} />
              <button type="button" onClick={saveHandler}> 저장 </button>
            </div>
          )
          : (
            <>
              <h3>
                {comment.text}
              </h3>
              {(user && user.email === comment.user.email)
                ? (
                  <div className="button_box">
                    <button type="button" onClick={() => setEdit(true)}> 수정 </button>
                    <button type="button" onClick={removeHandler}> 삭제 </button>
                  </div>
                )
                : undefined
              }
            </>
          )}
      </div>
      <div />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    /* css코드는 삭제하였습니다. */
`;
