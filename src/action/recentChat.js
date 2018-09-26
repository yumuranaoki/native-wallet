import { AsyncStorage } from 'react-native';
import firebase from '../util/firebase';

export const changeModalState = () => ({
  type: 'CHANGE_MODAL_STATE',
});

export const onSubmitAccountId = accountId => (
  function (dispatch) {
    fetch(`http://localhost:3000/users/${accountId}`, {
      mode: 'cors'
    })
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

export const changeFollowButtonAbility = () => ({
  type: 'CHANGE_FOLLOW_BUTTON_ABILITY'
});

export const getUsers = () => async (dispatch) => {
  const userId = await AsyncStorage.getItem('userId');
  firebase.database().ref(`room${userId}`)
  .on('value', snapshot => {
    const recentChat = snapshot.val();
    // recentChatDataにchat相手のaccountName、lastMessageを持つ
    // firebaseのデータ構造を変える（accountNameも持つようにする）
    // stateで管理して、renderでflatList表示
    const recentChatData = [];
    if (recentChat) {
      Object.keys(recentChat).forEach(key => {
        const oneOfRecentChat = recentChat[key];
        oneOfRecentChat.id = key;
        recentChatData.push(oneOfRecentChat);
        console.log(oneOfRecentChat);
      });
    }
    dispatch(finishedGetUsers(recentChatData));
  });
};

const finishedGetUsers = recentChatData => ({
  type: 'FINISHED_GET_USERS',
  recentChatData,
});

