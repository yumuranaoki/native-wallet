export const onChangeAccountIdText = accountId => ({
  type: 'ON_CHANGE_ACCOUNT_ID_TEXT',
  accountId,
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

