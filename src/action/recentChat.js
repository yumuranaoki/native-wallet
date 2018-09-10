export const changeModalState = () => ({
  type: 'CHANGE_MODAL_STATE',
});

export const onSubmitAccountId = accountId => (
  function (dispatch) {
    fetch(`http://localhost:3000/users/${accountId}`)
    .then(res => res.json())
    .then(result => dispatch(finishedSubmitAccountId(result)))
    .catch(err => console.log(err));
  }
);

const finishedSubmitAccountId = result => ({
  type: 'FINISHED_SUBMIT_ACCOUNT_ID',
  result
});

export const changeRelation = () => ({
  type: 'CHANGE_RELATION'
});
