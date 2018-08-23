export const onChangeAccountIdText = accountId => ({
  type: 'ON_CHANGE_ACCOUNT_ID_TEXT',
  accountId,
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

export const getFolloweds = userId => dispatch => {
  fetch(`http://localhost:3000/users/${userId}/followeds`)
  .then(res => res.json())
  .then(result => dispatch(finishedGetFolloweds(result)))
  .catch(err => console.log(err));
};

const finishedGetFolloweds = followeds => ({
  type: 'FINISHED_GET_FOLLOWEDS',
  followeds,
});

