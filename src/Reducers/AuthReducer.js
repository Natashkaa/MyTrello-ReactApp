import * as type from '../Actions/ActionType'

const reducer = (state = {}, action) => {
    switch(action.type){
        case type.CHANGE_INPUT:
            return { 
                ...state,
                [action.fieldName]: action.value
            }
        case type.LOG_IN_SUCCESS:
            window.localStorage.setItem('mytrellocredentials', action.token);
            window.localStorage.setItem('currentUserId', action.user.userId);
            return { 
                ...state,
                user: action.user,
                authCheck: true,
                errorMessage: null
            }
        case type.LOG_IN_ERROR:
            return { 
                ...state,
                authCheck: false,
                errorMessage: action.error
            }
        case type.Update_User_In_State:
            return { 
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

// async function log_in(email, password){
//     let url = "http://localhost:5000/api/authenticate/auth";
//     let credentials = {
//         'User_Email': email,
//         'User_Password': password
//     }

//     await fetch(url, { 
//         method: 'POST',
//         body: JSON.stringify(credentials),
//         headers: {
//             'Content-Type':'application/json'
//         }
//     }).then(response => {
//         if(!response.ok){
//             response.json().then(txt => {
//                 //error_block.innerText = txt.message;
//                 return txt;
//             });
//         }
//         else{
//             response
//             .json()
//                 .then(x => {
//                     window.localStorage.setItem('mytrellocredentials',x.data.token);
//                     return x;
//                     //error_block.innerHTML = `Welcome, ${x.data.user_FirstName} ${x.data.user_LastName}`;
//                     // setTimeout(function() {
//                     //     window.location.href = 'categories.html';
//                     // }, 3000);
//                 });
//         }
//     })
//     .catch(err => {
//         //error_block.innerHTML = 'Unknown error. Failed to connect to service';
//     })
// }

export default reducer;