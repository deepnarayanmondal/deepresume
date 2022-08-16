import * as authActions from './actions'

const registerReq=()=>{
    return{
        type:authActions.SIGN_UP_REQUEST
    }
}

const registerFail=(err)=>{
    return{
        type:authActions.SIGN_UP_FAILED,
        payload:err.message
    }
}

const registerSuc=()=>{
    return{
        type:authActions.SIGN_UP_SUCCESS
    }
}

const removeError=()=>{
    return{
        type:authActions.REMOVE_ERROR
    }
}

export const register=(userData)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(registerReq())
        const firebase=getFirebase();
        const firestore=getFirestore();
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password).then((user)=>{
            const res=firestore.collection('users').doc(userData.uid).set({
                email:userData.email,
                resume:[]
            })
           dispatch(registerSuc()) 
        }).catch((err)=>{
            dispatch(registerFail())
            setTimeout(()=>{
                dispatch(removeError())
            },2000)
        })

    }
}


const signinReq=()=>{
    return{
        type:authActions.SIGN_IN_REQUEST
    }
}

const signinFail=(err)=>{
    return{
        type:authActions.SIGN_IN_FAILED,
        payload:err.message
    }
}

const signinSuc=()=>{
    return{
        type:authActions.SIGN_IN_SUCCESS
    }
}

export const signin=(userData)=>{
    return async(dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(signinReq())
        const firebase=getFirebase();
       try{
            const res=await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password)
            dispatch(signinSuc())
       }
       catch(err){
        dispatch(signinFail(err))
        setTimeout(()=>{
            dispatch(removeError())
        },2000)
       }
    }
}

export const signout=()=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        firebase.auth().signOut().then(()=>{
            dispatch({
                type:authActions.SIGN_OUT_SUCCESS
            }).catch((err)=>{
                dispatch({type:authActions.SIGN_IN_FAILED,payload:err})
                setTimeout(()=>{
                    dispatch(removeError())
                },2000)
            })
        })
    }
}


